const LdpcCodec = require("../src/ldpcCodec");



describe("Ldpc Codec", () => {

	const raven = `
		Once upon a midnight dreary, while I pondered, weak and weary,
		Over many a quaint and curious volume of forgotten lore-
			While I nodded, nearly napping, suddenly there came a tapping,
		As of some one gently rapping, rapping at my chamber door.
		"’Tis some visitor," I muttered, "tapping at my chamber door-
					Only this and nothing more.”
	`;

	function makeSignal(array) {
		return array.map(x => x < 0.5 ? 1 : -1);
	}

	function addErrors(message, nrBits) {
		const arr = message.slice();
		const len = arr.length;
		for (let i = 0; i < nrBits; i++) {
			let index = (Math.random() * len) | 0; //make sure it is an int
			arr[i] = arr[index] ^ 1;
		}
		return arr;
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

	it("constructs properly", () => {
		expect(() => new LdpcCodec()).not.toThrow();
	});

	it("should be able to encode and decode a block of text", () => {
		const codec = new LdpcCodec();
		//codec.withCrc = false;
		codec.setCode("1/2", "648");
		const messages = codec.encodeText(raven);
		const analogs = messages.map(m => makeSignal(m));
		const texts = analogs.map(m => codec.decodeText(m));
		const wholeText = texts.join("");
		expect(wholeText).toEqual(raven);
	});


});