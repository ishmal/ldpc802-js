const Codes = require("./codes");

/**
 * Decoder for LDBC codewords
 */
class LdpcDecoder {

	/**
	 * Constructor
	 * @param {object} code the current LDPC code for rate and length
	 */
	constructor(code) {
		this.code = code;
	}

	/**
	 * Decode codeword bits to message bits
	 * @param {array} bits message array of 1's and 0's
	 * @return decoded array of 1's and zeroes
	 */
	decode(bits) {
		return bits;
	}

	/**
	 * Decode codeword bits to message bits
	 * @param {array} bits message array of 1's and 0's
	 * @return decoded array of bytes
	 */
	decodeToBytes(bits) {
		return bits;
	}
}