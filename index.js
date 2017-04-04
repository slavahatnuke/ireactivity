const React = require('react');
const iobserver = require('iobserver');

const {Children, Component, PropTypes} = React;
const {observable, update, subscribe, unsubscribe} = iobserver;

module.exports = {...iobserver};
const exports = module.exports;

const Store = observable;
exports.Store = Store;

const PropsReader = (creators) => {
    if (!(creators instanceof Object)) {
        throw new Error('Do not support this type: ' + typeof creators);
    }

    let names = Object.getOwnPropertyNames(creators);

    const props = names
            .map((name) => {
            if (!(creators[name] instanceof Function)) {
        throw new Error(`${name} is not a function`)
    } else {
        return {
            name,
            creator: creators[name]
        };
    }
});

    const actions = {};

    return (store) => {
        const instance = {};

        props.forEach(({name, creator}) => {
            let value = null;

        if (actions[name]) {
            value = actions[name];
        } else {
            value = creator(store);

            if (value instanceof Function) {
                const originValue = value;
                value = (...args) => update(store, () => originValue.apply(creators, args));
                actions[name] = value;
            }
        }

        instance[name] = value;
    });
        return instance;
    };
};
exports.PropsReader = PropsReader;

const connectStoreKey = '__symbol_ireactivity_store';
exports.connectStoreKey = connectStoreKey;

const connect = (component, propsCreators = {}) => {
    const propsReader = PropsReader(propsCreators);

    class Connected extends React.Component {
        constructor(props, context) {
            super(props, context);

            this.store = props['store'] || Provider.getStoreByContext(context);
            this.state = this.getObservableState();
            this.updateByObservableState = this.updateByObservableState.bind(this);
        }

        getObservableState() {
            return Object.assign({}, this.state, propsReader(this.store), this.props);
        }

        updateByObservableState() {
            this.setState(this.getObservableState());
        }

        componentDidMount() {
            subscribe(this.store, this.updateByObservableState);
        }

        componentWillUnmount() {
            unsubscribe(this.store, this.updateByObservableState);
        }

        render() {
            return React.createElement(component, this.state);
        }
    }

    Connected.contextTypes = {
        [connectStoreKey]: React.PropTypes.object
    };

    return Connected;
};
exports.connect = connect;

class Provider extends Component {
    constructor(props, context) {
        super(props, context);
        Store(props.store);
    }

    getChildContext() {
        return {[connectStoreKey]: this.props.store};
    }

    render() {
        return Children.only(this.props.children);
    }
}

Provider.getStoreByContext = (context) => context[connectStoreKey] || null;

Provider.propTypes = {
    store: PropTypes.object
};

Provider.childContextTypes = {
    [connectStoreKey]: PropTypes.object
};

exports.Provider = Provider;