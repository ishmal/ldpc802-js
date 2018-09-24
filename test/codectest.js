/* jshint node: true, esversion: 6 */
/* globals
describe: false,
expect: false,
it: false
*/

const Codec = require("../src/codec");
const Util = require("../src/util");
const Data = require("./testdata");



describe("Codec", () => {

	it("should initialize properly", () => {
		let codec;
		expect(() => codec = new Codec()).not.toThrow();
		expect(codec).toBeDefined();
	});

	it("should wrap in a crc-32", () => {
		const codec = new Codec();
		const inBytes = [
			0x01, 0x02, 0x03, 0x04, 0x05
		];
		const exp = [
			0x01, 0x02, 0x03, 0x04, 0x05,
			0xF4, 0x99, 0x0B, 0x47 
		];
		const res = codec.wrapBytes(inBytes);
		expect(res).toEqual(exp);
	});

	it("should generate scrambling bits correctly", () => {
		const codec = new Codec();
		const scrambleBits = Data.scrambleBits;
		codec.generateScrambler(0xff);
		expect(codec.scrambleBits.length).toEqual(scrambleBits.length);
		expect(codec.scrambleBits).toEqual(scrambleBits);
	});

	it("should scramble correctly", () => {
		const codec = new Codec();
		codec.generateScrambler(0x5d);
		const res = codec.scrambleBytes(Data.servicePrepended1);
		expect(res).toEqual(Data.scrambled1);
	});

	it("should convert inputMessage1 to inputBytes1", () => {
		const codec = new Codec();
		const messageBytes = Util.stringToBytes(Data.inputMessage1);
		const inputMacBytes = Data.inputMac1.slice();
		const inbytes = inputMacBytes.concat(messageBytes);
		const inputBytes1Short = Data.inputBytes1.slice(0, 96);
		expect(inbytes).toEqual(inputBytes1Short);
		const res = codec.wrapBytes(inbytes);
		expect(res).toEqual(Data.inputBytes1);
		const res2 = [0, 0].concat(res);
		expect(res2).toEqual(Data.servicePrepended1);
		codec.generateScrambler(0x5d);
		const res3 = codec.scrambleBytes(res2);
		expect(res3.length).toEqual(Data.scrambled1.length);
		expect(res3).toEqual(Data.scrambled1);
	});

	xit("should encode correctly", () => {
		const codec = new Codec();
		codec.selectCode("3/4", "1944");
		const bits = codec.encode(Data.shortened1);
		const bytes = Util.bitsToBytesBE(bits);
		expect(bytes).toEqual(Data.encoded1);
	});

	it("should encode a string without exceptions", () => {
		const codec = new Codec();
		codec.selectCode("1/2", "648");
		const plain = "the quick brown fox";
		expect(() => codec.encodeString(plain)).not.toThrow();
	});

});