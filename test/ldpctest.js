/* jshint node: true, esversion: 6 */
/* globals
describe: false,
expect: false,
it: false
*/

const Ldpc = require("../src/ldpc");
const Data = require("./testdata");
const assert = require('assert');



describe("LDPC", () => {

  it("should initialize properly", () => {
    let ldpc;
    assert.doesNotThrow(() => {
      ldpc = new Ldpc();
    });
    assert(ldpc);
  });


  it("should encode correctly", () => {
    let ldpc = new Ldpc();
    let bits = ldpc.encode(Data.shortened1, "3/4", "1944");
    let bytes = ldpc.bitsToBytes(bits);
    assert.deepEqual(bytes, Data.encoded1);
  });

  
});