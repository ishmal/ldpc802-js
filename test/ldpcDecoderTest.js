
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

	function makeMessage(size) {
		const msg = [];
		for (let i = 0 ; i < size ; i++) {
			const toss = Math.random();
			msg[i] = toss > 0.5 ? 1 : 0;
		}
		return msg;
	}

	it("should construct without exception", () => {
		expect(() => new LdpcDecoder(code)).not.toThrow();
	});

	it("should create tanner tables", () => {
		const dec = new LdpcDecoder(code);
		expect(dec.M).toEqual(code.M);
	});

	it("should decode what the encoder encodes", () => {
		const table = new CodeTable();
		const code = table.codes["1/2"]["648"];
		const msg = makeMessage(code.messageBits);
		const enc = new LdpcEncoder(code);
		const codeword = enc.encodeBits(msg);
		expect(codeword.length).toEqual(code.N);
		const dec = new LdpcDecoder(code);
		const res = dec.decode(codeword);
		expect(res).toEqual(msg);
	});
});