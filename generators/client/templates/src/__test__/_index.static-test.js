import React from 'react';
import test from 'ava';
import {shallow} from 'enzyme';

import Index from '../index.static';

const scripts = ['/src/file.js'];
const css = ['/src/file.css'];
const content = '<div>Hello World</div>';

const page = shallow(<Index scripts={scripts} css={css} content={content}/>);

test('Static index page has a html element at top level', tt => {
    tt.is(
        page.at(0).type(),
        'html'
    );
});

test('Static index page Sets language on html element', tt => {
    tt.is(
        typeof page.at(0).prop('lang'),
        'string'
    );
});