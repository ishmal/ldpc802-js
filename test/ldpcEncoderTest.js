
const Data = require("./testdata");
const CodeTable = require("../src/codetable");
const LdpcEncoder = require("../src/ldpcEncoder");
const Util = require("../src/util");

describe("LDPC Encoder", () => {
	it("should construct without throwing", () => {
		expect(() => new CodeTable()).not.toThrow();
	})

	it("should encode properly", () => {
		const table = new CodeTable();
		const codes = table.codes;
		const code = codes["3/4"]["1944"];
		const enc = new LdpcEncoder(code);
		const outBits = enc.encode(Data.shortened1);
		const res = Util.bitsToBytesBE(outBits);
		const exp = Data.encoded1;
		expect(res).toEqual(exp);
	});
});