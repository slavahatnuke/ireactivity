# ireactivity
Simple React binding

## Example
```javascript
// AppView.js
import React from 'react';
// import './App.css';

let uid = () => Math.random().toString(35).slice(2, 30);

export default ({user, clickSync, clickAsync}) =>
    <div className="App">
        <div className="header">
            <h2>{user.name} {user.id}</h2>
        </div>
        <p className="actions">
            <button onClick={clickSync}>Sync</button>
            <button onClick={() => clickAsync(uid()) }>Async</button>
        </p>
    </div>
```

```javascript
// index.js

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider, connect, update} from 'ireactivity';

// import './index.css';
import AppView from './AppView';

//helpers
let uid = () => Math.random().toString(35).slice(2, 10);
let wait = (timeout) => new Promise((resolve) => setTimeout(resolve, timeout));

//User model
class User {
    constructor(name) {
        this.uid = null;
        this.name = name;
    }
}

//User state
class UserState {
    constructor() {
        this.user = new User('slava');
    }

    setId(id) {
        this.user.id = id;
    }

    generateId() {
        this.setId(uid())
    }

    asyncSetId(id) {
        //sync update
        this.setId(null);

        //async update
        return Promise.resolve()
            .then(() => wait(2000)) // just for example
            .then(() => this.setId(id))
    }
}

const store = {
    user: new UserState()
};

const App = connect(AppView, {
    user: (store) => store.user.user,
    clickSync: (store) => () => store.user.generateId(),
    clickAsync: (store) => (id) => store.user.asyncSetId(id)
});

ReactDOM.render(
        <Provider store={store}>
            <App/>
        </Provider>,
    document.getElementById('root')
);


// if you need to update store outside of components for ex. socket.io
// just update store like this

// setInterval(() => {
//     update(store, (store) => {
//         store.user.generateId();
//     });
// }, 500);

```