# iReactivity
Simple/lightweight (~3k) React binding

## Example
GitHub:
- counter app [https://github.com/slavahatnuke/ireactivity-counter-example](https://github.com/slavahatnuke/ireactivity-counter-example)
- just concept [https://github.com/slavahatnuke/ireactivity-example](https://github.com/slavahatnuke/ireactivity-example)
- simple web todo list [https://github.com/slavahatnuke/ireactivity-web-simple-list-example](https://github.com/slavahatnuke/ireactivity-web-simple-list-example)
- simple native todo list [https://github.com/slavahatnuke/ireactivity-native-simple-list-example](https://github.com/slavahatnuke/ireactivity-native-simple-list-example)

```javascript
// index.js

import React from 'react';
import ReactDOM from 'react-dom';

// main functions of iReactivity
import {Provider, connect, update} from 'ireactivity';

// just an object
const store = {name: 'Hello'};

// just a view of App,
// onClick it should change something.
const AppView = ({name, onClick}) =>
    <div onClick={onClick} style={ {cursor: 'pointer'} }>
        {name}
    </div>;

// connected AppView to the store
const App = connect(AppView, {
    name: (store) => store.name,
    onClick: (store) => () => store.name += ' World!!'
});

// rendering
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);

// if you need to update store
// outside of components
// for ex. socket.io
let timeout30s = 30 * 1000; // just for example

setTimeout(() => {
    update(store, (store) => {
        store.name = 'Something NEW!!!';
    });
}, timeout30s);

```

Just have a dream!