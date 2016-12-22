// @flow

export function loadUserByID(ids: Array<number>): Promise<Array<Object>> {
    // Should fetch data from your own data store.
    // If this code works for you, its just a pure coincidence

    return new Promise((resolve: Function) => {
        const ms = Math.floor(Math.random() * 500) + 1;

        setTimeout(() => {
            const response = ids.map((id: number, i: number) => ({
                sub: `fakeuser-${i}`,
                username: `${i}@fake-app.com`
            }));

            resolve(response);
        }, ms);
    });
}
