/* @flow */
import React from 'react';
import ReactDOMServer from 'react-dom/server';
<% if(prerender) { %>
import {match, createMemoryHistory, RouterContext} from 'react-router';
import {Provider} from 'react-redux';
import store from '<%= name %>/store';
import routes from '<%= name %>/routes';
<% } %>
import Index from '<%= name %>/index.static';


module.exports = (locals: Object, callback: Function) => {
    <% if(prerender) { %>const history = createMemoryHistory();
    const location = history.createLocation(locals.path);<% } %>

    // weird way to get css path but webpack doesn't expose
    // extract-text-plugin's output in any other way
    const css = Object.keys(locals.webpackStats.compilation.assets)
        .filter(filename => filename.match(/\.css$/))
        .map(filename => '/' + filename);

    const scripts = Object.keys(locals.assets)
        .filter(key => locals.assets[key].match(/\.js$/) && !key.match(/^__/))
        .map(key => locals.assets[key]);

    <% if(prerender) { %>
    match({routes, location}, (error: Error, redirectLocation: Object, renderProps: ?Object) => {
        if(!error) {
            const pageContent = process.env.NODE_ENV === 'production' ? ReactDOMServer.renderToString(
                <Provider store={store}>
                    <RouterContext {...renderProps} />
                </Provider>
            ) : '';

            callback(
                null,
                '<!DOCTYPE html>' +
                ReactDOMServer.renderToString(<Index
                    content={pageContent}
                    scripts={scripts}
                    css={css}
                />)
            );

        }
    });
    <% } else { %>
    callback(
        null,
        '<!DOCTYPE html>' +
        ReactDOMServer.renderToString(<Index
            scripts={scripts}
            css={css}
        />)
    );
    <% } %>
};

