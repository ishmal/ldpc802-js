
const LdpcDecoder = require("../src/ldpcDecoder");
const assert = require("assert");

/*
0 1 0 1 1 0 0 1
1 1 1 0 0 1 0 0
0 0 1 0 0 1 1 1
1 0 0 1 1 0 1 0
*/

const code = {
	M: 4,
	N: 8,
	H: [
		[1,3,4,7],
		[0,1,2,5],
		[2,5,6,7],
		[0,3,4,6]
	]
};

describe("LDPC Decoder", () => {
	it("should construct without exception", () => {
		expect(() => new LdpcDecoder(code)).not.toThrow();
	});

	it("should create tanner tables", () => {
		const dec = new LdpcDecoder(code);
		expect(dec.M).toEqual(code.M);
	});
});