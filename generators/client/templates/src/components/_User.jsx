/* @flow */

import React from 'react';
import EntityQuery from '<%= name %>/entity/EntityQuery';

class User extends React.Component {
    props: {
        user: Map<string, any>
    };
    render(): React.Element<any> {
        if(!this.props.user) {
            return <div>Loading user...</div>;
        } else {
            return <div>
                Hello {this.props.user.get('username')}, your user ID is {this.props.user.get('id')}
            </div>;
        }
    }
}

const withEntityQuery = EntityQuery((): Object => {
    return {
        query : `
            query {
              user {
                id
                username
              }
            }
        `,
        variables : {}
    };
}, []);

export default withEntityQuery(User);