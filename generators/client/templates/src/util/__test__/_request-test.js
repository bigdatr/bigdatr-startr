import test from 'ava';
import sinon from 'sinon';
import fetchMock from 'fetch-mock';
const proxyquire = require('proxyquire').noCallThru();

let JWT = null;
<% if(cognito) { %>
const request = proxyquire('../request', {
    'react-cognito-forms': {
        getJwtToken: function() {return JWT;}
    }
}).default;
<% } else {%>
    const request = proxyquire('../request', {
        '<%= name %>/util/getJwtToken.js': function() {return JWT;}
    }).default;
<% } %>



test.before(() => {
    fetchMock
        .get('/200', {
            body: {},
            status: 200
        })
        .get('/400', {
            body: {},
            status: 400
        })
        .get('/400-with-error-message', {
            body: {
                errorMessage: 'CustomErrorMessage'
            },
            status: 400
        })
        .get('/401-with-body', {
            body: {
                foo: 'bar'
            },
            status: 401
        });
});


test.after(() => {
    fetchMock.restore();
});


test('request fails when token is not available', tt => {
    return request('/200', {})
        .then(() => tt.fail())
        .catch(() => tt.pass());
});


test('request works when token is not available but is ignored', tt => {
    return request('/200', {}, true)
        .then(() => tt.pass())
        .catch((err) => tt.fail());
});


test('request works when JWT is available', tt => {
    JWT = 'opensesame';
    return request('/200')
        .then(() => tt.pass())
        .catch((err) => tt.fail());
});


test('request handles non 200 responses', tt => {
    return request('/400')
        .then(() => tt.fail())
        .catch((err) => {
            if(err.status && err.status === 400) {
                tt.pass();
            } else {
                tt.fail();
            }
        });
});

test('request handles body.errorMessage', tt => {
    return request('/400-with-error-message')
        .then(() => tt.fail())
        .catch((err) => {
            if(
                err.status &&
                err.status === 400 &&
                err.message === 'CustomErrorMessage'
            ) {
                tt.pass();
            } else {
                tt.fail();
            }
        });
});


test('request passes body with error', tt => {
    return request('/401-with-body')
        .then(() => tt.fail())
        .catch((err) => {
            if(
                err.status &&
                err.status === 401 &&
                err.body.foo === 'bar'
            ) {
                tt.pass();
            } else {
                tt.fail();
            }
        });
});

