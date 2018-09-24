/* jshint esversion: 6 */

const LdpcEncoder = require("./ldpcEncoder");
const LdpcDecoder = require("./ldpcDecoder");
const CodeTable = require("./codetable");
const Util = require("./util");
const Crc32 = require("./crc32");

/**
 * Methods supporting the 802.11 data packet
 */
class Codec {

	constructor() {
		this.codes = new CodeTable().codes;
		this.code = null;
		this.ldpcEncoder = null;
		this.ldpcDecoder = null;
		this.scrambleBits = [];
        this.scrambleIdx = 0;
		this.generateScrambler(0xff);
		this.selectCode("1/2", "648");
	}

	/**
	 * Select rate and length of code
     * @param {string} rateStr the rate from the tables
     * @param {string} lenStr the length from the tables
	 */
	selectCode(rateStr, lengthStr) {
		const rate = this.codes[rateStr];
		const code = rate ? rate[lengthStr] : undefined;
		if (!code) {
			throw new Error(`encoder: code ${rateStr}/${lengthStr} not found`);
		}
		this.code = code;
		this.ldpcEncoder = new LdpcEncoder(code);
		this.ldpcDecoder = new LdpcDecoder(code);
	}

	generateScrambler(initial) {
		const x = Util.byteToBitsBE(initial).slice(1).reverse();
		const arr = [];
		for (let i = 0; i < 127; i++) {
			const x7 = x[0];
			const x4 = x[3];
			const out = x7 ^ x4;
			x.shift();
			x.push(out);
			arr.push(out);
		}
		this.scrambleBits = arr;
		this.scrambleIdx = 0;
		return arr;
	}

	nextScrambleBit() {
		let idx = this.scrambleIdx;
		const b = this.scrambleBits[idx++];
		this.scrambleIdx = idx % 127;
		return b;
	}

	/**
	 * Take an array of integers calculate their CRC32 checksum, and append
	 * the result to the end.
	 * @param {array} bytes the array of bytes to seal with a checksum
	 * @return {array} array 'wrapped' with a crc on the end as 4 bytes
	 */
	wrapBytes(bytes) {
		const checksum = Crc32.ofBytes(bytes);
		const checksumBytes = Crc32.intToBytesLE(checksum);
		const obytes = bytes.concat(checksumBytes);
		return obytes;
	}

	/**
	 * Scramble the bits of a byte
	 * @param {number} byte byte to be scrambled
	 * @return {number} the scrambled byte
	 */
	scrambleByte(byte) {
		const bits = Util.byteToBitsBE(byte);
		const b = [];
		const b0 = this.nextScrambleBit();
		const b1 = this.nextScrambleBit();
		const b2 = this.nextScrambleBit();
		const b3 = this.nextScrambleBit();
		const b4 = this.nextScrambleBit();
		const b5 = this.nextScrambleBit();
		const b6 = this.nextScrambleBit();
		const b7 = this.nextScrambleBit();
		b[0] = bits[7] ^ b0;
		b[1] = bits[6] ^ b1;
		b[2] = bits[5] ^ b2;
		b[3] = bits[4] ^ b3;
		b[4] = bits[3] ^ b4;
		b[5] = bits[2] ^ b5;
		b[6] = bits[1] ^ b6;
		b[7] = bits[0] ^ b7;
		const obyte = Util.bitsToByteBE(b);
		return obyte;
	}

	/**
	 * Scramble the bits in an array of bytes
	 * @param {array} bytes array of bytes
	 * @return {array} a scrambled copy of the array
	 */
	scrambleBytes(bytes) {
		const arr = [];
		for (let i = 0, len = bytes.length; i < len; i++) {
			const inb = bytes[i];
			const b = this.scrambleByte(inb);
			arr[i] = b;
		}
		return arr;
	}

    /**
     * Encode an array of bytes with the current LDPC code
     * TODO: select a length according to the length of the byte array
     * @param {array} bytes the bytes to encode
     * @return {array} the encoded bits
     */
    encode(bytes) {
		if (!this.ldpcEncoder) {
			throw new Error(`ldpcEncoder code has not been selected`);
		}
		return this.ldpcEncoder.encode(bytes);
    }

    /**
     * Encode a string with the given LDPC code
     * @param {string} str the string to encode
     * @return {array} the encoded bits
     */
    encodeString(str) {
        const bytes = Util.stringToBytes(str);
        return this.encode(bytes);
    }

    /**
     * Decode an array of LDPC-encoded bits with the given LDPC code
     * @param {array} inbits array of bits
     * @return {array} the output bytes
     */
    decode(inbits) {
		if (!this.ldpcDecoder) {
			throw new Error(`ldpcDecoder code has not been selected`);
		}
        return this.ldpcDecoder.decode(inbits);
	}
	
    /** 
     * Decode an array of LDPC-encoded bits with the given LDPC code
     * @param {array} inbits array of bits
     * @param {string} the output string
     */
    decodeString(inbits) {
        const outbytes = this.decode(inbits);
        const str = Util.bytesToString(outbytes);
        return str;
    }

}


module.exports = Codec;