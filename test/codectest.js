/* jshint node: true, esversion: 6 */
/* globals
describe: false,
expect: false,
it: false
*/

const Codec = require("../src/codec");
const Util = require("../src/util");
const Data = require("./testdata");
const assert = require('assert');



describe("Codec", () => {

	it("should initialize properly", () => {
		let codec;
		assert.doesNotThrow(() => {
			codec = new Codec();
		});
		assert(codec);
	});

	it("should generate scrambling bits correctly", () => {
		let codec = new Codec();
		let scrambleBits = Data.scrambleBits;
		codec.generateScrambler(0xff);
		assert.equal(codec.scrambleBits.length, scrambleBits.length);
		assert.deepEqual(codec.scrambleBits, scrambleBits);
	});

	it("should scramble correctly", () => {
		let codec = new Codec();
		codec.generateScrambler(0x5d);
		let res = codec.scrambleBytes(Data.servicePrepended1);
		assert.deepEqual(res, Data.scrambled1);
	});

	xit("should encode correctly", () => {
		let codec = new Codec();
		let bits = codec.encode(Data.shortened1, "3/4", "1944");
		let bytes = Util.bitsToBytesBE(bits);
		assert.deepEqual(bytes, Data.encoded1);
	});

	it("should convert inputMessage1 to inputBytes1", () => {
		let codec = new Codec();
		let mbytes = Util.stringToBytes(Data.inputMessage1);
		let inbytes = Data.inputMac1.slice(0);
		inbytes = inbytes.concat(mbytes);
		let res = codec.wrapBytes(inbytes);
		assert.deepEqual(res, Data.inputBytes1);
		let res2 = [0, 0].concat(res);
		assert.deepEqual(res2, Data.servicePrepended1);
		codec.generateScrambler(0x5d);
		let res3 = codec.scrambleBytes(res2);
		assert.equal(res3.length, Data.scrambled1.length);
		assert.deepEqual(res3, Data.scrambled1);
	});

	it("should encode a string without exceptions", () => {
		let codec = new Codec();
		let plain = "the quick brown fox";

		function callMe() {
			codec.encodeString(plain, "1/2", "648");
		}
		assert.doesNotThrow(callMe);
	});



});