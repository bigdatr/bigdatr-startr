export default class BaseModel {
    getViewer: Function;

    constructor(data: Object, options: ?Object = {}) {
        Object.keys(data || {})
            .forEach((k: string): any => this[k] = data[k]);

        if (options.viewer) {
            this.getViewer = () => options.viewer;
        }
    }
}
