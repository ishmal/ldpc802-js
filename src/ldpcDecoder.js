
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
		this.M = code.M;
		this.N = code.N;
		this.createCheckNodes();
		this.decode = this.decodeSumProduct;
	}

	/**
	 * Set up the variable and check nodes,
	 * make the links between them.
	 */
	createCheckNodes() {
		const code = this.code;
		const M = this.M;
		const N = this.N;
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
		this.checkNodes = checkNodes;
		this.variableNodes = variableNodes;
	}

	/**
	 * Decode codeword bits to message bits
	 * @param {array} inBits message array of 1's and 0's
	 * @return decoded array of 1's and zeroes
	 */
	decodeSumProduct(inBits) {
		const M = this.M;
		const checkNodes = this.checkNodes;
		const variableNodes = this.variableNodes;
		for (let i = 0, len = this.N; i < len ; i++) {
			let b = inBits[i];
			b = b > 0.5 ? 1 : 0;
			variableNodes[i] = b;
		}
		for (let keepGoing = true ; keepGoing ;) {
			const checkFails = [];
			for (let i=0 ; i < M ; i++) {
				const checkNode = checkNodes[i];
				const vn = checkNode.vn;
				let sum = 0;
				for (let j = 0, len = vn.length ; j < len ; j++) {
					const idx = vn[j];
					sum ^= variableNodes[idx].value;
				}
				if (sum) {
					checkFails.push(i);
				}
			}
			if (checkFails.length === 0) {
				keepGoing = false;
			} else {
				//do something
			}
		}
		const outBits = variableNodes.map(v => v.value);
		return outBits;
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