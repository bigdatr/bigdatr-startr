import React from 'react';
import {Link} from 'react-router-dom';
import {List, ListItem} from 'obtuse';
import {routesList} from '../routes';

export default () => {
    const links = routesList
        .props
        .children
        .map(route => {
            const {path} = route.props;
            if(!path) {
                return null;
            }
            return <ListItem key={path}>
                <Link className="Link" to={path}>{path}</Link>
            </ListItem>;
        })
        .filter(ii => ii);

    return <List modifier="unordered">{links}</List>;
}
