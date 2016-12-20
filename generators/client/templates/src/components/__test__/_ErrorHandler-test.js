import React from 'react';
import test from 'ava';
import {shallow} from 'enzyme';

import ErrorHandler from '../ErrorHandler';



test('Error Handler Renders without throwing error', tt => {
    tt.notThrows(
        () => shallow(<ErrorHandler/>)
    );
});
