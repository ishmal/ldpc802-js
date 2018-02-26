/* jshint node: true, esversion: 6 */
/* globals
describe: false,
expect: false,
it: false
*/

const Proto = require("../src/proto");
const Util = require("../src/util");
const Data = require("./testdata");
const assert = require('assert');



describe("Proto", () => {

  it("should initialize properly", () => {
    let proto;
    assert.doesNotThrow(() => {
      proto = new Proto();
    });
    assert(proto);
  });

  it("should generate scrambling bits correctly", () => {
    let proto = new Proto();
	let scrambleBits = Data.scrambleBits;
    proto.generateScrambler(0xff);
    assert.equal(proto.scrambleBits.length, scrambleBits.length);
    assert.deepEqual(proto.scrambleBits, scrambleBits);
  });

  it("should encode a string without exceptions", () => {
    let proto = new Proto();
    let plain = "the quick brown fox";
    function callMe() {
      debugger;
      proto.encodeString(plain, "1/2", "648");
    }
    assert.doesNotThrow(callMe);
  });

  it("should scramble correctly", () => {
    let proto = new Proto();
    proto.generateScrambler(0x5d);
    let res = proto.scrambleBytes(Data.servicePrepended1);
    assert.deepEqual(res, Data.scrambled1);
  });

  xit("should encode correctly", () => {
    let proto = new Proto();
    let bits = proto.encode(Data.shortened1, "3/4", "1944");
    let bytes = Util.bitsToBytesBE(bits);
    assert.deepEqual(bytes, Data.encoded1);
  });

  it("should convert imputMessage1 to inputBytes1", () => {
    let proto = new Proto();
    let mbytes = Util.stringToBytes(Data.inputMessage1);
    let inbytes = Data.inputMac1.slice(0);
    inbytes = inbytes.concat(mbytes);
    let res = proto.wrapBytes(inbytes);
    assert.deepEqual(res, Data.inputBytes1);
    let res2 = [0, 0].concat(res);
    assert.deepEqual(res2, Data.servicePrepended1);
    proto.generateScrambler(0x5d);
    let res3 = proto.scrambleBytes(res2);
    assert.equal(res3.length, Data.scrambled1.length);
    assert.deepEqual(res3, Data.scrambled1);
  });

});