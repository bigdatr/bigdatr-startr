// @flow

// Individual schemas
export {default as User} from './types/User/UserSchema.graphql';

// Root query schema
export default `
    type Query {
        viewer: User
    }
`;
