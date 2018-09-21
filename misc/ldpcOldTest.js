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
	let ldpc;

	beforeEach(() => {
		ldpc = new Ldpc();
	});

	it("should rotate an array to the right", () => {
		let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
		let exp = [7, 8, 9, 0, 1, 2, 3, 4, 5, 6];
		let res = ldpc.arrayRotate(arr, 3);
		assert.deepEqual(res, exp);
	});

	it("should rotate an array of arrays to the right", () => {
		let arr = [
			[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
			[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
			[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
		];
		let exp = [
			[7, 8, 9, 0, 1, 2, 3, 4, 5, 6],
			[7, 8, 9, 0, 1, 2, 3, 4, 5, 6],
			[7, 8, 9, 0, 1, 2, 3, 4, 5, 6]
		];
		let rot = [3, 3, 3];
		let res = ldpc.arrayRotateDeep(rot, arr);
		assert.deepEqual(res, exp);
	});

	it("should group an array into z-size chunks", () => {
		let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
		let exp = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8]
		];
		let res = ldpc.bitsToZ(arr, 3);
		assert.deepEqual(res, exp);
	});

	it("should flatten an array of arrays", () => {
		let arr = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8, 9]
		];
		let exp = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
		let res = ldpc.flatten(arr);
		assert.deepEqual(res, exp);
	});

	it("should add two arrays", () => {
		let arr1 = [1, 2, 3, 4, 5];
		let arr2 = [6, 7, 8, 9, 10];
		let exp = [7, 9, 11, 13, 15];
		let res = ldpc.arrayAdd(arr1, arr2);
		assert.deepEqual(res, exp);
	});

	it("should xor two arrays", () => {
		let arr1 = [0, 1, 1, 0, 0, 1];
		let arr2 = [1, 1, 1, 1, 1, 1];
		let exp = [1, 0, 0, 1, 1, 0];
		let res = ldpc.arrayXor(arr1, arr2);
		assert.deepEqual(res, exp);
	});

	it("should xor two arrays of arrays", () => {
		let arr1 = [
			[0, 1, 1],
			[0, 0, 1]
		];
		let arr2 = [
			[1, 1, 1],
			[1, 1, 1]
		];
		let exp = [
			[1, 0, 0],
			[1, 1, 0]
		];
		let res = ldpc.arrayXorDeep(arr1, arr2);
		assert.deepEqual(res, exp);
	});

	it("should QC-multiply a row of rotations with an array of z-blocks", () => {
		let arr = [
			// z = 3
			[0, 1, 1], // 1, 0, 1
			[1, 1, 0], // 1, 1, 0
			[1, 1, 0], // 1, 0, 1
			[1, 1, 1] // 0, 0, 0
		];
		let exp = [1, 1, 0];
		let rot = [1, 0, 2, -1];
		let res = ldpc.multiplyQC(rot, arr, 3, 4);
		assert.deepEqual(res, exp);
	});

	it("should get the first parity bits correctly", () => {
		/* beautify preserve:start */
		let exp = [
			1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0,
			0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1,
			0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1,
			1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0 ];
		/* beautify preserve:end */
	});

	xit("should encode correctly", () => {
		let bits = ldpc.encode(Data.shortened1, "3/4", "1944");
		assert.equal(bits.length, 1944);
		let bytes = Util.bitsToBytesLE(bits);
		//assert.deepEqual(bytes, Data.encoded1);
		for (let i = 0, len = bytes.length; i < len; i++) {
			//console.log(i);
			assert.equal(bytes[i], Data.encoded1[i], "## index ## " + i);
		}
	});

	it("should perform lambdaI correctly", () => {
		let zbits = [
			[1, 0, 1, 0], // 0,0,0,0
			[1, 0, 1, 0], // 1,0,1,0
			[1, 0, 1, 0], // 1,1,1,1
			[1, 0, 1, 0], // 0,1,0,1
			[1, 0, 1, 0] // 0,0,0,0
		];
		let row = [-1, 0, 1, 2, 3];
		let exp = [0, 0, 0, 0];
		let res = ldpc.lambdaI(row, zbits, 4, 5);
		assert.deepEqual(res, exp);
	});

});