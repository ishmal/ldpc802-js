/* jshint node: true, esversion: 6 */
/* globals
describe: false,
expect: false,
it: false
*/

const Ldpc = require("../src/ldpc");
const Util = require("../src/util");
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


  xit("should encode correctly", () => {
    let ldpc = new Ldpc();
    let bits = ldpc.encode(Data.shortened1, "3/4", "1944");
    let bytes = Util.bitsToBytes(bits);
    assert.deepEqual(bytes, Data.encoded1);
  });

  
});