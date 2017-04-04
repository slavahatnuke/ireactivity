# iReactivity
Simple React binding

## Example
GitHub: [https://github.com/slavahatnuke/ireactivity-example](https://github.com/slavahatnuke/ireactivity-example)

```javascript
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider, connect, iconnect, update} from 'ireactivity';

import AppView from './AppView';
let uid = () => Math.random().toString(35).slice(2, 10);
let wait = (timeout) => new Promise((resolve) => setTimeout(resolve, timeout));

class User {
    constructor(name) {
        this.id = null;
        this.name = name;
    }
}

class UserState {
    constructor(user) {
        this.user = user;
    }

    setId(id) {
        // this.user.id = id;
        this.user = {...this.user, ...{id}};
    }

    generateId() {
        this.setId(uid())
    }

    asyncSetId(id) {
        this.setId(null);

        return Promise.resolve()
            .then(() => wait(500)) // just for example
            .then(() => this.setId(id));
    }
}


const store = {
    user: new UserState(new User('slava'))
};

const App = connect(AppView, {
    user: (store) => store.user.user,
    onClickSync: (store) => () => store.user.generateId(),
    onClickAsync: (store) => (id) => store.user.asyncSetId(id)
});

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);


// if you need to update store outside of components for ex. socket.io
// just update store like this
update(store, (store) => {
    store.user.generateId();
});

```

```javascript
// AppView.js

import React from 'react';

let uid = () => Math.random().toString(35).slice(2, 30);

export default ({user, onClickSync, onClickAsync}) =>
    <div className="App">
        <div className="header">
            <h2>{user.name} {user.id}</h2>
        </div>
        <p className="actions">
            <button onClick={onClickSync}>Sync</button>
            <button onClick={() => onClickAsync(uid()) }>Async</button>
        </p>
    </div>
```

Just have a dream!