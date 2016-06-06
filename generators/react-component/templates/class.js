import React, {Component, PropTypes} from 'react';

class <%= name %> extends Component {
    constructor(props) {
        super(props);
        <%_ if (lifecycle.indexOf('getInitialState') !== -1) { -%>
        this.state = {
        }
        <%_ } -%>
    }
    <%_ if (lifecycle.indexOf('componentWillMount') !== -1) { -%>
    componentWillMount() {

    }
    <%_ } -%>
    <%_ if (lifecycle.indexOf('componentDidMount') !== -1) { -%>
    componentDidMount() {

    }
    <%_ } -%>
    <%_ if (lifecycle.indexOf('componentWillReceiveProps') !== -1) { -%>
    componentWillReceiveProps(nextProps) {

    }
    <%_ } -%>
    <%_ if (lifecycle.indexOf('shouldComponentUpdate') !== -1) { -%>
    shouldComponentUpdate(nextProps, nextState) {

    }
    <%_ } -%>
    <%_ if (lifecycle.indexOf('componentWillUpdate') !== -1) { -%>
    componentWillUpdate(nextProps, nextState) {

    }
    <%_ } -%>
    <%_ if (lifecycle.indexOf('componentDidUpdate') !== -1) { -%>
    componentDidUpdate(prevProps, prevState) {

    }
    <%_ } -%>
    <%_ if (lifecycle.indexOf('componentWillUnmount') !== -1) { -%>
    componentWillUnmount() {

    }
    <%_ } -%>
    render() {
        return <div><%= name %></div>;
    }
}

<%= name %>.propTypes = {
};

<%_ if (lifecycle.indexOf('getDefaultProps') !== -1) { -%>
<%= name %>.defaultProps = {
};
<%_ } -%>

export default <%= name %>;
