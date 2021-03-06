// @flow

/**
 * `<%= varname %>` is a function that returns 123
 *
 * @example
 * <%= varname %>(123); // returns 246
 *
 * @param {number} [add = 0] The number to add to 123.
 * @return {number} The final number.
 */

const <%= varname %> = (add: number = 0): number => {
    return 123 + add;
};

export default <%= varname %>;
