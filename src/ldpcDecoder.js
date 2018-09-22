
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
		this.createCheckNodes();
	}

	/**
	 * Set up the variable and check nodes,
	 * make the links between them.
	 */
	createCheckNodes() {
		const code = this.code;
		const M = code.mb * code.z;
		const N = code.length;
		const variableNodes = [];
		for (let i = 0; i < N ; i++) {
			variableNodes[i] = {
				cn: [],
				value: 0
			};
		}
		const checkNodes = [];
		const H = code.H;
		for (let i = 0; i < M ; i++) {
			const row = H[i];
			checkNodes[i] = {
				vn: row,
				value: 0
			};
			for (let j = 0, len = row.length; j < len ; j++) {
				const idx = row[j];
				variableNodes[idx] = j;
			}
		}
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

module.exports = LdpcDecoder;