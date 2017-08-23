import React from 'react';
import test from 'ava';
import <%= name %> from './index';

test('<%= name %> does the right thing', tt => {
    tt.is(<%= name %>(123), 246, '<%= name %> should add 123');
    tt.is(<%= name %>(), 123, '<%= name %> should return 123 when given no arguments');
});
