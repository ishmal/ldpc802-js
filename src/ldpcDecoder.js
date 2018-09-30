const Util = require("../src/util");
const multiplySparse = Util.multiplySparse;

function calcVariance(samples) {
	const n = samples.length;
	let m = 0;
	let s = 0;
	for (let k = 0; k < n; k++) {
		const x = samples[k];
		const oldM = m;
		m = m + (x - m) / k;
		s = s + (x - m) * (x - oldM);
	}
  return s / (n - 1);
}

function calcPhi(x) {
	const phi = Math.log((Math.exp(x) + 1) / (Math.exp(x) - 1));
	return phi;
}


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
		this.createTanner();
	}

	/**
	 * Check is the codeword passes check.
	 * @param {array} codeword the word to check
	 * @return {boolean} true if passes 
	 */
	check(codeword) {
		const code = this.code;
		const checkVal = multiplySparse(code.H, codeword);
		for (let i = 0, len = this.code.messageBits; i < len; i++) {
			if (checkVal[i]) {
				return false;
			}
		}
		return true;
	}

	/**
	 * Check is the codeword passes check.  Fails early
	 * for speed.
	 * @param {array} codeword the word to check
	 * @return {boolean} true if passes 
	 */
	checkFast(codeword) {
		const H = this.code.H;
		for (let i = 0, hlen = H.length; i < hlen; i++) {
			const row = H[i];
			let sum = 0;
			for (let j = 0, rlen = row.length; j < rlen; j++) {
				const idx = row[j];
				sum ^= codeword[idx];
			}
			if (sum) {
				return false;
			}
		}
		return true;
	}



	/**
	 * Set up the variable and check nodes,
	 * make the links between them.
	 */
	createTanner() {
		const code = this.code;
		const M = this.M;
		const N = this.N;
		const variableNodes = [];
		for (let i = 0; i < N; i++) {
			variableNodes[i] = {
				cn: [],
				value: 0
			};
		}
		const checkNodes = [];
		const H = code.H;
		for (let i = 0; i < M; i++) {
			const row = H[i];
			const cnode = {
				vn: row.map(idx => variableNodes[idx]),
			};
			checkNodes[i] = cnode;
			for (let r = 0, len = row.length; r < len; r++) {
				const idx = row[r];
				const vnode = variableNodes[idx];
				vnode.cn.push(cnode);
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
	decode(inBits) {
		if (this.checkFast(inBits)) {
			return inBits.slice(0, this.code.messageBits);
		}
		const result = this.decodeSumProduct(inBits);
		return result;
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

		/**
		 * Step 1.  Initialization of c(ij) and q(ij)
		 */
		const variance = calcVariance(inBits);
		const weight = 2 / variance;
		for (let i = 0, len = this.N; i < len; i++) {
			const vnode = variableNodes[i];
			const b = inBits[i];
			vnode.c = b;
			vnode.q = b * weight;
		}


		for (let iter = 0; iter < 100; iter++) {
			const checkFails = [];

			/**
			 * Step 2. update r(ji)
			 */
			//for each check node
			const r = [];
			for (let m = 0; i < M; i++) {
				const checkNode = checkNodes[m];
				const vn = checkNode.vn;
				let sum = 0;

				for (let v = 0, len = vn.length; v < len; v++) {
					const vnode = vn[v];
					const q = vnode.q;
					const alpha = Math.sign(q);
					for (let v2 = 0; v2 < len; v2++) {
						const beta = Math.abs(q);

					}
				}
			} // for i
			if (checkFails.length === 0) {
				const outBits = variableNodes.map(v => v.value);
				return outBits;
			} else {
				//do something
			}
		} // for iter

		return null;
	}

	/**
	 * Decode codeword bits to message bytes
	 * @param {array} bits message array of 1's and 0's
	 * @return decoded array of bytes if decoding works, else null.
	 */
	decodeToBytes(bits) {
		const outbits = this.decode(bits);
		if (!outbits) {
			return null;
		}
		const bytes = Util.bitsToBytesBE(outbits);
		return bytes;
	}
}

module.exports = LdpcDecoder;