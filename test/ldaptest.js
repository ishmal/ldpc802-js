/* jshint node: true, esnext: true */
/* globals
describe: false,
expect: false,
it: false
*/

const Ldpc = require("../src/ldpc");
const assert = require('assert');

describe("LDPC tests", function () {

  it("should initialize properly", function () {
    let ldpc;
    assert.doesNotThrow(() => {
      ldpc = new Ldpc();
    });
    assert(ldpc);
  });

  it("should encode a string without exceptions", function () {
    let ldpc = new Ldpc();
    let plain = "the quick brown fox";
    let res = ldpc.encode(plain, "648", "1/2");
    assert(res);
  });

});