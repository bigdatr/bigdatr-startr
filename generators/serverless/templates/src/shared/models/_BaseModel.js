// @flow

export default class BaseModel {
    getViewer: Function;

    constructor(data: ?{[key: string]: string}, options: Object = {}) {
        Object.assign(this, data || {});
        // Object.keys(data || {})
        //     .forEach((k: string): any => this[k] = data[k]);

        if (options && options.viewer) {
            this.getViewer = () => options.viewer;
        }
    }
}
