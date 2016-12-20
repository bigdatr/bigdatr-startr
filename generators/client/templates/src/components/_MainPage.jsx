/* @flow */

import React from 'react';
import User from '<%= name %>/components/User';

import file from '<%= name %>/assets/15.png';

class MainPage extends React.Component {
    render(): React.Element<any> {
        return <div>
            <User/>

            <img src={file} alt=""/>
        </div>;
    }
}


export default MainPage;