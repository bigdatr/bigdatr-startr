import React from 'react';
import {connect} from 'react-redux';

import image from '<%= name %>/assets/15.png';

class MainPage extends React.Component {
    render() {
        return <div>
        <img src={image}/>
    </div>
    }
}


export default connect((state) => ({}))(MainPage);