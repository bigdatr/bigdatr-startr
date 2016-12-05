// Individual schemas
export {default as demo} from './demo/DemoSchema.graphql';


// Root query schema
export default `
    type Query {
        demo(id: ID!): Demo,
    }
`;