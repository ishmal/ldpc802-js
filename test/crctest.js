/* jshint node: true, esversion: 6 */
/* globals
describe: false,
expect: false,
it: false
*/

const Crc32 = require("../src/crc32");
const assert = require('assert');

describe("CRC32 tests", function () {

	it("should produce a correct value for a string", () => {
		let str = "the quick brown fox";
		let res = Crc32.ofString(str)
		assert.equal(res, 0x91C102CA);
	});

	it("should produce a correct value for an array of bytes", () => {
		let arr = [0x01, 0x02, 0x03, 0x04, 0x05];
		let res = Crc32.ofBytes(arr)
		assert.equal(res, 0x470B99F4);
	});

	it("should convert int to bytes properly", () => {
		let val = 0x12345678;
		let bytes = Crc32.intToBytes(val);
		let exp = [0x12, 0x34, 0x56, 0x78];
		assert.deepEqual(bytes, exp);
	});

});