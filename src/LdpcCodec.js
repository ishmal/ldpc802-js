
const LdpcDecoder = require("./ldpcDecoder");
const LdpcEncoder = require("./ldpcEncoder")
const CodeTable = require("./codetable");
const Util = require("./util");
const Crc32 = require("./crc32");


/**
 * Utility to make coding and decoding easy
 */
class LdpcCodec {
	constructor() {
		this.codes = new CodeTable().codes;
		this.setCode("1/2", "648");
		this.withLength = true;
		this.withCrc = true;
	}

	/**
	 * Set the rate of this codec: 1/2, 3/4, 5/6
	 * @param {string} rateStr 
	 */
	setRate(rateStr) {
		const rate = this.codes[rateStr];
		if (!rate) {
			throw new Error(`rate '${rateStr}' not found`);
		}
		this.rate = rate;
	}

	/**
	 * Set the length of this codec: 648, 1296, 1944
	 * @param {string} lengthStr the desired length
	 */
	setLength(lengthStr) {
		const code = this.rate[lengthStr];
		if (!code) {
			throw new Error(`length '${lengthStr}' not found`);
		}
		this.code = code;
		this.messageBytes = code.messageBits / 8;
		this.encoder = new LdpcEncoder(code);
		this.decoder = new LdpcDecoder(code);
	}

	/**
	 * Set the rate of this codec: 1/2, 3/4, 5/6
	 * 	and the length: 648, 1296, 1944
	 * @param {string} rateStr 
	 * @param {string} lengthStr 
	 */
	setCode(rateStr, lengthStr) {
		this.setRate(rateStr);
		this.setLength(lengthStr);
	}

	padForShortening(bits) {
		const len = bits.length;
		let padLength = this.code.messageBits - len;
		const pad = new Array(padLength).fill(0);
		const obits = bits.concat(pad);
		return obits;
	}

	shorten(bits, originalLength) {
		const front = bits.slice(0, originalLength);
		const back = bits.slice(this.code.messageBits);
		const ret = front.concat(back);
		return ret;
	}


	encode(bytes) {
		let chunkSize = Math.floor(this.code.messageBits / 8);
		if (this.withLength) {
			chunkSize--;
		}
		if (this.withCrc) {
			chunkSize -= 4;
		}
		const messages = [];
		for (let i = 0, len = bytes.length ; i < len ; i  += chunkSize) {
			let chunk = bytes.slice(i, chunkSize);
			if (this.withLength) {
				chunk.unshift(chunk.length)
			}
			if (this.withCrc) {
				const crc = Crc32.orBytes(chunk);
				const crcBytes = Crc32.intToBytes(crc);
				chunk = chunk.concat(crcBytes);
			}
			const bits = Util.bytesToBitsBE(chunk);
			const padded = this.padForShortening(bits);
			const encoded = this.encoder.encode(padded);
			const final = this.shorten(encoded, bits.length);
			messages.push(final);
		}
		return messages;
	}

	decode(messages) {
		
	}

}

module.exports = LdpcCodec;