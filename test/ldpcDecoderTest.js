
const LdpcDecoder = require("../src/ldpcDecoder");
const LdpcEncoder = require("../src/ldpcEncoder");
const CodeTable = require("../src/codetable");

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

	xit("should decode what the encoder encodes", () => {
		debugger;
		const table = new CodeTable();
		const code = table.codes["1/2"]["648"];
		let mbits = code.messageBits;
		const msg = [];
		for (let i = 0 ; i < mbits ; i++) {
			const toss = Math.random();
			msg[i] = toss > 0.5 ? 1 : 0;
		}
		const enc = new LdpcEncoder(code);
		const codeword = enc.encodeBits(msg);
		expect(codeword.length).toEqual(code.N);
		const dec = new LdpcDecoder(code);
		const res = dec.decode(codeword);
		expect(res).toEqual(msg);
	});
});