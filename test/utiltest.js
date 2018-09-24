const Util = require("../src/util");
const Data = require("./testdata");


describe("Util", () => {

	it("should convert bytes to big endian bits and back correctly", () => {
		for (let i = 0; i < 256; i++) {
			const bits = Util.byteToBitsBE(i);
			const b = Util.bitsToByteBE(bits);
			expect(b).toEqual(i);
		}
	});

	it("should convert bytes to little endian bits and back correctly", () => {
		for (let i = 0; i < 256; i++) {
			const bits = Util.byteToBitsLE(i);
			const b = Util.bitsToByteLE(bits);
			expect(b).toEqual(i);
		}
	});

	it("should convert an array of bytes to big endian bits and back", () => {
		let arr = [0, 1, 2, 3, 4, 5, 6];
		const bits = Util.bytesToBitsBE(arr);
		const res = Util.bitsToBytesBE(bits);
		expect(res).toEqual(arr);
	});

	it("should convert an array of bytes to little endian bits and back", () => {
		let arr = [0, 1, 2, 3, 4, 5, 6];
		const bits = Util.bytesToBitsLE(arr);
		const res = Util.bitsToBytesLE(bits);
		expect(res).toEqual(arr);
	});
	
	it("should pad bytes correctly", () => {
		let bytes = [1, 2, 3, 4, 5, 6];
		const exp = [1, 2, 3, 4, 5, 6, 0, 0, 0];
		const res = Util.zeroPadArray(bytes, 9);
		expect(res).toEqual(exp);
	});

	it("should pad bits correctly", () => {
		let bits = Util.bytesToBitsBE(Data.scrambled1);
		const obits = Util.zeroPadArray(bits, 1458);
		const res = Util.bitsToBytesBE(obits);
		expect(res).toEqual(Data.shortened1);
	});



});