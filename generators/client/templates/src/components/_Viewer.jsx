/* @flow */

import React from 'react';
import EntityQuery from '<%= name %>/entity/EntityQuery';
import UserRecord from '<%= name %>/entity/user/UserRecord';

class Viewer extends React.Component {
    props: {
        viewer: UserRecord
    };
    render(): React.Element<any> {
        if(!this.props.viewer) {
            return <div>Loading viewer...</div>;
        } else {
            return <div>
                Hello {this.props.viewer.username}
            </div>;
        }
    }
}

const withEntityQuery = EntityQuery((): Object => {
    return {
        query : `
            query {
                viewer {
                    username
                }
            }
        `,
        variables : {}
    };
}, []);

export default withEntityQuery(Viewer);