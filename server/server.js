import express from 'express';
import qs from 'qs';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';

import configureStore from '../common/store/configureStore';
import App from '../common/containers/App';
import { fetchCounter } from '../common/api/counter';

const app = express();

const renderFullPage = (html,preloadedState) =>{
    return `
        <!doctype html>
        <html>
            <head>
                <title>Redux Universal Example</title>
            </head>
            <body>
                <div id="app">${html}</div>
                <script >
                    window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g,'\\x3c')}
                </script>
                <script src="/static/bundle.js"></script>
            </body>
        </html>
    `
}

const handleRender = (req,res) => {
    fetchCounter(apiResult =>{
        const params = qs.parse(req.query);
        const counter = parseInt(params.counter,10) || apiResult || 0;
        const preloadedState = { counter };
        const store = configureStore(preloadedState);

        const html = renderToString(
            <Provider store={store}>
                <App />
            </Provider>
        )

        const finalState = store.getState();

        res.send(renderFullPage(html,finalState))
    })
};
app.use(handleRender);

if (module.hot) {
    app.hot = module.hot;
    module.hot.accept();
}
export default app;


