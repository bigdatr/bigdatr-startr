import React from 'react';

type IndexProps = {
    css: String[],
    scripts: String[],
    content: String
}

export default function index(props: IndexProps): React.Element<any> {
    return <html lang="">
        <head>
            <meta charSet="utf-8"/>
            <meta httpEquiv="x-ua-compatible" content="ie=edge"/>
            <title><%= name %></title>
            <meta name="description" content=""/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            {props.css && props.css.map(file => <link rel="stylesheet" href={file}/>)}
        </head>
        <body>
            <div id="<%= name %>" dangerouslySetInnerHTML={{__html: props.content}}></div>

            {/* 
                for prerendering to work webpack needs to build with libraryTarget set to commonjs2.
                So the below line is required to avoid errors when the bundle sets module.exports
            */}
            <script dangerouslySetInnerHTML={{__html: 'window.module = {};'}}/>
            {props.scripts && props.scripts.map(file => <script src={file}/>)}
            
        </body>
    </html>;
}
