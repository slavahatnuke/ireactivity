# iReactivity
Simple / lightweight (~3k) React binding.

### In the simple words
- Every object can be `Store`. `Store` is state of your app. 
- You can organise this store in any comfortable way for you.
- You can connect any component to this `Store`.

##### Store
Store is everything you want. Store is state of app.
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
When you click on `OK` it `store.project.name = 'iReactivity OK'` updates store and UI react on this.
How does it work? For each action from your side it calls `update` Please read `update`. 

##### Update
It's the simple event that notifies `store`. When you call `update(store)`, connected component will try to react if there is some changes.
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

### Hello world example:
```javascript
// index.js

import React from 'react';
import ReactDOM from 'react-dom';

import {Provider, connect, update} from 'ireactivity';

const store = {name: 'Hello'};
const AppView = ({name, onClick}) =>
    <div onClick={onClick} style={ {cursor: 'pointer'} }>
        {name}
    </div>;

const App = connect(AppView, {
    name: (store) => store.name,
    onClick: (store) => () => store.name += ' World!!'
});

ReactDOM.render(
    <Provider store={store}><App/></Provider>, document.getElementById('root'));

// if you need to update store
// outside of components
let timeout30s = 30 * 1000; // ex.

setTimeout(() => {
    update(store, (store) => {
        store.name = 'Something NEW!!!';
    });
}, timeout30s);
```

### Examples
- counter app [https://github.com/slavahatnuke/ireactivity-counter-example](https://github.com/slavahatnuke/ireactivity-counter-example)
- just concept [https://github.com/slavahatnuke/ireactivity-example](https://github.com/slavahatnuke/ireactivity-example)
- simple web todo list [https://github.com/slavahatnuke/ireactivity-web-simple-list-example](https://github.com/slavahatnuke/ireactivity-web-simple-list-example)
- simple native todo list [https://github.com/slavahatnuke/ireactivity-native-simple-list-example](https://github.com/slavahatnuke/ireactivity-native-simple-list-example)

Thanks.