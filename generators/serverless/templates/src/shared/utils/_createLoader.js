// @flow

import DataLoader from 'dataloader';
import chalk from 'chalk';

export default function createLoader(loaderFn: Function): DataLoader {
    return new DataLoader((ids: Array<any>): Promise<Array<any>> => {
        const startTime = new Date();

        const resp = loaderFn(ids);
        const loaderFnName = loaderFn.name;

        resp
            .then((): void => log(loaderFnName, ids, startTime))
            .catch((): void => log(loaderFnName, ids, startTime));

        return resp;
    });
}

function log(name: string, ids: Array<string>, startTime: Date) {
    let idsStr = ids
                    .map((id: string): string => id.length === 24 ? id.substr(19) : id)
                    .join(', ');

    // Apply log colors
    const msg = chalk.gray('DATALOADER');
    const ms = _formatResponseTime(new Date() - startTime);
    const loaderName = chalk.gray(name);
    idsStr = chalk.gray(idsStr);

    console.log(`${msg} ${ms} ${loaderName}`, idsStr);
}

function _formatResponseTime(ms: number): string {
    let color = 'gray';

    if (ms >= 500) {
        color = 'red';
    }
    else if (ms >= 300) {
        color = 'magenta';
    }
    else if (ms >= 100) {
        color = 'yellow';
    }

    return chalk[color](ms + 'ms');
}
