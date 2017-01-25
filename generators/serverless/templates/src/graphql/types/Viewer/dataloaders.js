// @flow

import createLoader from '<%= name %>/shared/utils/createLoader';
import * as loaders from '<%= name %>/graphql/loaders';

// Convert each function into a DataLoader
export default function dataLoaders(): Object {
    return Object.keys(loaders)
        .map((moduleName: string): Object => ({
            [moduleName]: initLoaders(loaders[moduleName])
        }))
        .reduce((state: Object, val: Object): Object => Object.assign({}, state, val), {});
}


function initLoaders(loaderModule: Object): Object {
    return Object.keys(loaderModule)
        .map((loaderName: string): Object => ({
            [loaderName]: createLoader(loaderModule[loaderName])
        }))
        .reduce((state: Object, val: Object): Object => Object.assign({}, state, val), {});
}
