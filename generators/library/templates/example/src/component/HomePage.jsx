import React from 'react';
import {Box, Text} from 'obtuse';
import Contents from './Contents';

// example library usage
import <%= varname %> from '<%= name %>';
<%= varname %>();

export default (props) => {
    return <Box modifier="padded">
        <Text element="h1" modifier="alpha"><%= name %></Text>
        <Contents />
    </Box>
}
