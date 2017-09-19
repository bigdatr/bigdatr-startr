/* @flow */
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Index from '<%= name %>/index.static';

module.exports = (locals: Object, callback: Function) => {

    // weird way to get css path but webpack doesn't expose
    // extract-text-plugin's output in any other way
    const css = Object.keys(locals.webpackStats.compilation.assets)
        .filter(filename => filename.match(/\.css$/))
        .map(filename => '/' + filename);

    const scripts = Object.keys(locals.assets)
        .filter(key => locals.assets[key].match(/\.js$/) && !key.match(/^__/))
        .map(key => locals.assets[key]);

    callback(
        null,
        '<!DOCTYPE html>' +
        ReactDOMServer.renderToString(<Index
            scripts={scripts}
            css={css}
        />)
    );
};

