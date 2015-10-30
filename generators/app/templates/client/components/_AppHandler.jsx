import React from 'react';
export default (props) => {
    return <div>
        <h1><%= name %></h1>
        <a href="/">Main Page</a>
        <a href="/other">Other Page</a>
        {props.children}
    </div>
}
