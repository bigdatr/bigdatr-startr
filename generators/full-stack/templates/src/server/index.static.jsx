import React from 'react';

function renderStyles () {
    if(process.env.NODE_ENV === 'production') {
        return <link rel="stylesheet" href="/<%= name %>.css"/>;
    }
}

function renderScripts() {
    var appCode = <script type="text/javascript" src="/<%= name %>.js"></script>;

    if(process.env.NODE_ENV === 'production') {
        return <div>
            <script type="text/javascript" src="/core.js"></script>
            {appCode}
        </div>;
    } else {
        return appCode;
    }
}

export default (props) => {
    return (
        <html lang="">
            <head>
                <meta charSet="utf-8"/>
                <meta httpEquiv="x-ua-compatible" content="ie=edge"/>
                <title><%= name %></title>
                <meta name="description" content=""/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                {renderStyles()}
            </head>
            <body>
                <div id="<%= name %>"></div>
                {renderScripts()}
            </body>
        </html>
    );
}
