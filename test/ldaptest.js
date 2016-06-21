/* jshint node: true, esnext: true */
/* globals
describe: false,
expect: false,
it: false
*/
"use strict";

const Ldap = require('../src/ldap');

describe("LDAP", () => {
  it("contains spec with an expectation", () => {
    console.log("hello");
    expect(true).toBe(true);
  });
});
