// @flow

// Individual schemas
// $FlowFixMe: Supress errors imports .graphql files
import User from './types/User/UserSchema.graphql';
export {User as User};

// Root query schema
export default `
    type Query {
        viewer: User
    }
`;
