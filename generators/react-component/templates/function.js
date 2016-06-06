import React from 'react';

export default function <%= name %>(props) {
    return <div><%= name %></div>;
}

<%= name %>.propTypes = {
};

<%_ if (lifecycle.indexOf('getDefaultProps') !== -1) { -%>
<%= name %>.defaultProps = {
};
<%_ } -%>
