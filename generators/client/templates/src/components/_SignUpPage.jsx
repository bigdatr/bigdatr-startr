/* @flow */

import React from 'react';
import {SignUpForm} from 'react-cognito-forms';

const signupFields = [
    {
        name: 'name',
        title: 'Full Name',
        required: true
    },
    {
        name: 'email',
        title: 'Email',
        type: 'email',
        required: true
    },
    {
        name: 'phone_number',
        title: 'Mobile Phone Number',
        type: 'tel',
        required: true
    },
    {
        name: 'password',
        title: 'Password',
        type: 'password',
        required: true
    },
    {
        name: 'passwordConfirm',
        title: 'Confirm Password',
        type: 'password',
        required: true
    }
];


export default function SignUpPage(): React.Element<any> {
    return <SignUpForm fields={signupFields} />;
}