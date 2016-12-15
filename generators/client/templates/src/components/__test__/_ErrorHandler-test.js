import React from 'react';
import test from 'ava';
import {shallow} from 'enzyme';

import ErrorHandler from '../ErrorHandler';



test('Error Handler', tt => {
    tt.notThrows(
        () => shallow(<ErrorHandler/>),
        'Renders without throwing error'
    );
});
