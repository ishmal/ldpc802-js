
const LdpcDecoder = require("../src/ldpcDecoder");
const LdpcEncoder = require("../src/ldpcEncoder");
const CodeTable = require("../src/codetable");
const math = require("mathjs")

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

	function makeSignal(array) {
		return array.map(x => x < 0.5 ? 1 : -1);
	}

	function addErrors(message, nrBits) {
		const len = message.length;
		for (let i = 0; i < nrBits; i++) {
			let index = (Math.random() * len) | 0; //make sure it is an int
			message[index] = message[index] ^ 1;
		}
	}

	function addNoise(message, level) {
		const out = [];
		const len = message.length;
		for (let i = 0; i < len; i++) {
			const noise = (Math.random() - 0.5) * level;
			out[i] = message[i] + noise;
		}
		return out;
	}

	it("should construct without exception", () => {
		expect(() => new LdpcDecoder(code)).not.toThrow();
	});

	it("should calculate variance properly", () => {
		const rawmsg = makeMessage(1000);
		const msg = addNoise(rawmsg, 0.1);
		const variance = LdpcDecoder.calcVariance(msg);
		const exp = math.var(msg);
		expect(variance).toBeCloseTo(exp, 7);
	});

	it("should create tanner tables", () => {
		const dec = new LdpcDecoder(code);
		expect(dec.code).toEqual(code);
		expect(dec.checkNodes).toBeDefined();
		expect(dec.variableNodes).toBeDefined();
	});

	it("should have all unique check table references", () => {
		//checks that we have no duplicate references
		const table = new CodeTable();
		const code = table.codes["1/2"]["648"];
		const dec = new LdpcDecoder(code);
		const checkNodeSet = new Set(dec.checkNodes);
		expect(checkNodeSet.size).toEqual(code.M);
		const variableNodeSet = new Set(dec.variableNodes);
		expect(variableNodeSet.size).toEqual(code.N);
	});

	it("should decode what the encoder encodes", () => {
		const table = new CodeTable();
		const code = table.codes["1/2"]["648"];
		const msg = makeMessage(code.messageBits);
		const enc = new LdpcEncoder(code);
		const codeword = enc.encode(msg);
		expect(codeword.length).toEqual(code.N);
		const dec = new LdpcDecoder(code);
		const signal = makeSignal(codeword);
		const res = dec.decode(signal);
		expect(res).toEqual(msg);
	});

	it("should decode with noise added", () => {
		const table = new CodeTable();
		const code = table.codes["1/2"]["648"];
		const msg = makeMessage(code.messageBits);
		const enc = new LdpcEncoder(code);
		const codeword = enc.encode(msg);
		expect(codeword.length).toEqual(code.N);
		const signal = makeSignal(codeword);
		const received = addNoise(signal, 0.1); //here we go
		const dec = new LdpcDecoder(code);
		const res = dec.decode(received);
		expect(res).toEqual(msg);
	});
});