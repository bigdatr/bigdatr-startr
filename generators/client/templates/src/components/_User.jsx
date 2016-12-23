/* @flow */

import React from 'react';
import EntityQuery from '<%= name %>/entity/EntityQuery';
import UserRecord from '<%= name %>/entity/user/UserRecord';

class User extends React.Component {
    props: {
        user: UserRecord
    };
    render(): React.Element<any> {
        if(!this.props.user) {
            return <div>Loading user...</div>;
        } else {
            return <div>
                Hello {this.props.user.username}, your user ID is {this.props.user.id}
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