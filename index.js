const React = require('react');
const observer = require('iobserver');
const copier = require('icopier');

const {copy, isSame} = copier;
const {Children, Component} = React;
const {observable, update, subscribe, unsubscribe, isFunction, isObject} = observer;

let PropTypes = null;
try {
  PropTypes = require('prop-types')
} catch (error) {
  // eslint-disable-next-line
  PropTypes = React.PropTypes;
}

const Store = observable;

const PropsReader = (creators) => {
  if (!isObject(creators)) {
    throw new Error('Do not support this: ' + creators);
  }

  let names = Object.getOwnPropertyNames(creators);

  const props = names
    .map((name) => {
      if (!isFunction(creators[name])) {
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

        if (isFunction(value)) {
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

const storeSymbol = '__symbol_ireactivity_store';
const connect = (component, propsCreators = {}, options = {}) => {

  if (isFunction(propsCreators)) {
    return widget(component, propsCreators, options);
  }

  const propsReader = PropsReader(propsCreators);
  let previousState = {};

  options = Object.assign({
    stateless: false,
    store: null,
    depth: 0
  }, options);

  if (options.store) {
    Store(options.store)
  }

  class ConnectedComponent extends Component {
    constructor(props, context) {
      super(props, context);

      this.store = options.store || Provider.getStoreByContext(context);
      this.state = this.getObservableState();

      if (!options.stateless) {
        previousState = copy(this.state, options.depth);
      }

      this.mounted = false;

      this.updateByObservableState = this.updateByObservableState.bind(this);
    }

    getObservableState() {
      return Object.assign({}, this.state, propsReader(this.store), this.props);
    }

    updateByObservableState() {
      if (!this.mounted) {
        return null;
      }

      const state = this.getObservableState();

      if (options.stateless) {
        this.setState(state);
      } else {
        if (!isSame(state, previousState, options.depth)) {
          this.setState(state);
          previousState = copy(state, options.depth);
        }
      }
    }

    componentDidMount() {
      this.mounted = true;
      subscribe(this.store, this.updateByObservableState);
    }

    componentWillUnmount() {
      this.mounted = false;
      unsubscribe(this.store, this.updateByObservableState);
    }

    render() {
      return React.createElement(component, this.state);
    }
  }

  ConnectedComponent.contextTypes = {
    [storeSymbol]: PropTypes.object
  };

  return ConnectedComponent;
};

const widget = (component, controllerCreator = () => null, options = {}) => {
  class ConnectedWidgetComponent extends Component {
    constructor(props, context) {
      super(props, context);
      this.store = options.store || Provider.getStoreByContext(context);

      if (!isFunction(controllerCreator)) {
        throw new Error('ControllerCreator must should be function');
      }

      const controller = controllerCreator(this.store);
      const propsCreators = {};

      if (isObject(controller)) {
        let names = [].concat(
          Object.getOwnPropertyNames(controller),
          Object.getOwnPropertyNames(Object.getPrototypeOf(controller)),
        );

        names.forEach((name) => {
          propsCreators[name] = (store) => {
            if (isFunction(controller[name])) {
              return controller[name].bind(controller);
            } else {
              return controller[name];
            }
          }
        });
      }

      this.component = connect(component, propsCreators, options);
    }

    render() {
      return React.createElement(this.component, this.props);
    }
  }

  ConnectedWidgetComponent.contextTypes = {
    [storeSymbol]: PropTypes.object
  };

  return ConnectedWidgetComponent;
};

const stateless = (component, propsCreators = {}, options = {}) => {
  options = Object.assign({
    stateless: true
  }, options);

  return connect(component, propsCreators, options);
};

class Provider extends Component {
  constructor(props, context) {
    Store(props.store);
    super(props, context);
  }

  getChildContext() {
    return {[storeSymbol]: this.props.store};
  }

  render() {
    return Children.only(this.props.children);
  }
}

Provider.getStoreByContext = (context) => context[storeSymbol] || null;

Provider.propTypes = {
  store: PropTypes.object
};

Provider.childContextTypes = {
  [storeSymbol]: PropTypes.object
};

const render = (state, component) => React.createElement(stateless(component, {}, {
  store: state
}));

module.exports = {
  Provider,
  Store,
  update,
  up: update,
  connect,
  stateless,
  render,
  observer,
  copier,
  propsReader: PropsReader,
  storeSymbol,
  widget
};