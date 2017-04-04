const React = require('react');
const iObserver = require('iobserver');

const {Children, Component, PropTypes} = React;
const {observable, update, subscribe, unsubscribe} = iObserver;

const Reactivity = iObserver;

const Store = observable;
Reactivity.Store = Store;

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
Reactivity.PropsReader = PropsReader;

const connectStoreKey = '__symbol_ireactivity_store';
Reactivity.connectStoreKey = connectStoreKey;

const hasChange = (state1, state2, options = {}, level = 0) => {
    let names = Object.getOwnPropertyNames(state1);
    names = [...names, ...Object.getOwnPropertyNames(state2)];

    for (let i = 0; i < names.length; i++) {
        let name = names[i];
        if (state1[name] !== state2[name]) {
            return true;
        }
    }

    return false;
}

Reactivity.hasChange = hasChange;
const connect = (component, propsCreators = {}, options = {}) => {

    const propsReader = PropsReader(propsCreators);
    let previousState = {};

    options = Object.assign({
        stateless: false
    }, options);

    class Connected extends React.Component {
        constructor(props, context) {
            super(props, context);

            this.store = Provider.getStoreByContext(context);
            this.state = previousState = this.getObservableState();
            this.updateByObservableState = this.updateByObservableState.bind(this);
        }

        getObservableState() {
            return Object.assign({}, this.state, propsReader(this.store), this.props);
        }

        updateByObservableState() {
            const state = this.getObservableState();

            if (options.stateless) {
                this.setState(state);
            } else {
                if (hasChange(state, previousState)) {
                    previousState = state;
                    this.setState(state);
                }
            }
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
Reactivity.connect = connect;

const iconnect = (component, propsCreators = {}, options = {}) => {
    options = Object.assign({
        stateless: true
    }, options);

    return connect(component, propsCreators, options);
};

Reactivity.iconnect = iconnect;

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

Reactivity.Provider = Provider;

module.exports = Reactivity;