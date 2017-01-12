/* @flow */

import React from 'react';
import Viewer from '<%= name %>/components/Viewer';

import file from '<%= name %>/assets/15.png';

class MainPage extends React.Component {
    render(): React.Element<any> {
        return <div>
            <Viewer/>

            <img src={file} alt=""/>
        </div>;
    }
}


export default MainPage;