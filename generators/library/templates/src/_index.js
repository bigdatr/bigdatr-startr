// @flow

/**
 * `<%= name %>` is a function that returns 123
 *
 * @example
 * <%= name %>(123); // returns 246
 *
 * @param {number} [add = 0] The number to add to 123.
 * @return {number} The final number.
 */

const <%= name %> = (add: number = 0): number => {
    return 123 + add;
};

export default <%= name %>;
