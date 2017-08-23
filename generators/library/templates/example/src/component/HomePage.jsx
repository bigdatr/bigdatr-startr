import React from 'react';
import {Box, Text} from 'obtuse';
import Contents from './Contents';

// example library usage
import <%= name %> from '<%= name %>';
<%= name %>();

export default (props) => {
    return <Box modifier="padded">
        <Text element="h1" modifier="alpha"><%= name %></Text>
        <Contents />
    </Box>
}
