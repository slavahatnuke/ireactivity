# iReactivity
Simple / lightweight (~3kb) React binding.

## Counter example:
```javascript
// index.js

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider, connect} from 'ireactivity';

import AppView from './App';

const store = {
    counter: 0
};

const App = connect(AppView, {
    counter: (store) => store.counter,
    onUp: (store) => () => store.counter = store.counter + 1
});

ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    document.getElementById('root')
);

// App.js

import React  from 'react';

export default ({counter, onUp}) =>
    <div className="counter-box">
        <div className="counter">{counter}</div>
        <button className="button" onClick={onUp}>UP</button>
    </div>
```

## Documentation

#### In simple words
The main idea of this way:
- Every object can be `Store`. `Store` is state of your app or state of your component. 
- You can connect any component to this `Store`.

##### Store
Every object is state. Store is state of app.
```javascript
const store = { user: { name: 'slava'}, project: { name: 'iReactivity'} };
```

##### Provider
Provider provides `store` to the app and for the all components of app.
```javascript
// ....
ReactDOM.render(
    <Provider store={store}><App/></Provider>, document.getElementById('root'));
```

##### Connect
You can connect part of your state to the component. Like this.
```javascript
const ProjectView = ({name, onOk}) =>
    <div> {name} <button onClick={onOk}>OK</button> </div>;

const Project = connect(ProjectView, {
    name: (store) => store.project.name,
    onOk: (store) => () => store.project.name = 'iReactivity OK'
});
```
When you click on `OK` it updates store and UI react on this (`store.project.name = 'iReactivity OK'`).
For each action from user side it calls `update` method. 

##### Update
It's the event that notifies `store`. When you call `update(store)`, connected component will try to react if there is some changes.
This example updates store without action from user side.

```javascript
setTimeout(() => {
    // update(store, updaterFunction)
    update(store, (store) => {
        store.project.name = 'iReactivity UPDATED';
    });
}, 30 * 1000);
```
The UI will react after `30s`.
This method is helpful when you work with socket.io for example or some libs that is not connected to React at all.

##### Update + Connect + Promises
For example when you need to make API call or make something `async`: 

Just return promise and it will wait for your updates.
```javascript
update(store, (store) => {
    store.project.name = 'iReactivity Loading.. . .';
    return doSometingAsync().then(() => store.project.name = 'iReactivity UPDATED')
});
```

Connect works in the same way because uses `update` method on actions.
```javascript
const Project = connect(ProjectView, {
    name: (store) => store.project.name,
    onOk: (store) => () => doSometingAsync().then(() => store.project.name = 'iReactivity OK')
});
```

#### Hello world example:
```javascript
import React from 'react';
import ReactDOM from 'react-dom';

import {Provider, connect, update} from 'ireactivity';

const store = { name: 'Hello' };

const AppView = ({name, onHello}) =>
    <button onClick={onHello}> {name} </button>;

const App = connect(AppView, {
    name: (store) => store.name,
    onHello: (store) => () => store.name += ' World!'
});

ReactDOM.render(
    <Provider store={store}><App/></Provider>, document.getElementById('root'));

// if you need to update store outside of components
setTimeout(() => {
    update(store, (store) => {
        store.name = 'Something NEW!!!';
    });
}, 30 * 1000);
```

### Examples
- counter app [https://github.com/slavahatnuke/ireactivity-counter-example](https://github.com/slavahatnuke/ireactivity-counter-example)
- just concept [https://github.com/slavahatnuke/ireactivity-example](https://github.com/slavahatnuke/ireactivity-example)
- simple web todo list [https://github.com/slavahatnuke/ireactivity-web-simple-list-example](https://github.com/slavahatnuke/ireactivity-web-simple-list-example)
- simple native todo list [https://github.com/slavahatnuke/ireactivity-native-simple-list-example](https://github.com/slavahatnuke/ireactivity-native-simple-list-example)

Thanks [+1G](http://plus1generation.com/)