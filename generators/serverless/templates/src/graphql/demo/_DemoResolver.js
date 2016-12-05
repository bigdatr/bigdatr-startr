import DataLoader from 'dataloader';
import {Map} from 'immutable';

const batchDemo = (keys) => {
    const items = Map({
        1 : {
            id: 1,
            field: 'A string field',
            int: 100
        },
        2 : {
            id: 2,
            field: 'A string field 2',
            int: 165
        },
        3 : {
            id: 3,
            field: 'A string field 3',
            int: 354
        }
    });
    return new Promise((resolve, reject) => {
        resolve(keys.map(key => items.get(key)));
    });
};

export const demoLoader = new DataLoader(keys => batchDemo(keys));

export default (args, context) => {
    return demoLoader.load(args.id);
}

