import React from 'react';
import test from 'ava';
import {shallow} from 'enzyme';

import Index from '../index.static';

const scripts = ['/src/file.js'];
const css = ['/src/file.css'];
const content = '<div>Hello World</div>';


test('Static index page', tt => {
    const page = shallow(<Index scripts={scripts} css={css} content={content}/>);
        
    tt.is(
        page.at(0).type(),
        'html',
        'Has a html element at top level'
    );

    tt.is(
        typeof page.at(0).prop('lang'),
        'string',
        'Sets language on html element'
    );
});
