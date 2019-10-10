import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from '../common/store/configureStore';
import App from '../common/containers/App';

const preloadedState = window.__INITIAL_STATE__;
const store = configureStore(preloadedState);

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('app')
)
