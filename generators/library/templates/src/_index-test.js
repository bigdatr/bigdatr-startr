import React from 'react';
import test from 'ava';
import <%= varname %> from './index';

test('<%= varname %> does the right thing', tt => {
    tt.is(<%= varname %>(123), 246, '<%= varname %> should add 123');
    tt.is(<%= varname %>(), 123, '<%= varname %> should return 123 when given no arguments');
});
