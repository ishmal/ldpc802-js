const Util = require("./util");
const multiplySparse = Util.multiplySparse;
const calcPhi = require("./calcphi");



/**
 * Decoder for LDBC codewords
 * @see "Introduction to LDPC Codes" by William E Ryan
 */
class LdpcDecoder {

	/**
	 * Constructor
	 * @param {object} code the current LDPC code for rate and length
	 */
	constructor(code) {
		this.code = code;
		this.createSPGraph();
	}

	static calcVariance(samples) {
		const n = samples.length;
		let m = 0;
		let s = 0;
		for (let k = 0; k < n; ) {
			const x = samples[k++];
			const oldM = m;
			m += (x - m) / k;
			s += (x - m) * (x - oldM);
		}
	  return s / (n - 1);
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
				clinks: [],
				c: 0
			};
		}
		const checkNodes = [];
		const H = code.H;
		for (let i = 0; i < M; i++) {
			const row = H[i];
			const vlinks = row.map(idx => ({
					v: variableNodes[idx],
					r: 0
			}));
			const cnode = {
				vlinks
			};
			checkNodes[i] = cnode;
			for (let v = 0, len = vlinks.length; v < len; v++) {
				const vnode = vlinks[v].v;
				const clink = {
					c: cnode,
					q: 0
				};
				vnode.clinks.push(clink);
			}
		}
		this.checkNodes = checkNodes;
		this.variableNodes = variableNodes;
	}

	/**
	 * Create an empty
	 */
	createSPGraph() {
		const M = this.code.M;
		const N = this.code.N;
		const H = this.code.H;
		const checkNodes = [];
		const links = [];
		const variableNodes = [];

		for (let i = 0; i < M; i++) {
			checkNodes[i] = {
				links: []
			};
		}
		for (let i = 0; i < N; i++) {
			variableNodes[i] = {
				links: [],
				ci: 0
			};
		}
		for (let i = 0 ; i < M; i++) {
			const row = H[i];
			const cnode = checkNodes[i];
			const rlen = row.length;
			for (let j = 0; j < rlen; j++) {
				const idx = row[j];
				const vnode = variableNodes[idx];
				const link = {
					c: cnode,
					v: vnode,
					q: 0,
					r: 0,
				};
				cnode.links.push(link);
				vnode.links.push(link);
				links.push(link);
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
		//if (this.checkFast(inBits)) {
		//	return inBits.slice(0, this.code.messageBits);
		//s}
		const result = this.decodeSumProduct(inBits);
		return result;
	}

	/**
	 * Decode codeword bits to message bits
	 * @param {array} inBits message array of 1's and 0's
	 * @return decoded array of 1's and zeroes
	 */
	/* eslint-disable max-lines-per-function */
	decodeSumProduct(inBits) {
		// localize some values
		const M = this.code.M;
		const N = this.code.N;
		const checkNodes = this.checkNodes;
		const variableNodes = this.variableNodes;

		/**
		 * Step 1.  Initialization of c(ij) and q(ij)
		 */
		const variance = LdpcDecoder.calcVariance(inBits);
		const weight = 1;  //2 / variance;
		for (let i = 0; i < N; i++) {
			const vnode = variableNodes[i];
			const Lci = inBits[i] * weight;
			vnode.ci = Lci;
			const links = vnode.links;
			const llen = links.len;
			for (let j = 0; j < llen ; j++) {
				const link = links[j];
				link.r = 0;				
				link.q = Lci;				
			}
		}


		for (let iter = 0; iter < 100; iter++) {

			/**
			 * Step 2. update r(ji)
			 */
			for (let m = 0; m < M; m++) {
				const checkNode = checkNodes[m];
				const links = checkNode.links;
				const llen = links.length;

				for (let i = 0; i < llen ; i++) {
					const link = links[i];
					let prod = 1;
					for (let v = 0; v < llen; v++) {
						if (v === i) {
							continue;
						}
						const link2 = links[v];
						const q = link2.q;
						const alpha = q < 0 ? -1 : 1;
						let phiSum = 0;
						for (let v2 = 0; v2 < llen; v2++) {
							if (v2 === i) {
								continue;
							}
							const link3 = links[v2];
							const qb = link3.q;
							const beta = Math.abs(qb);
							const phi = calcPhi(beta);
							phiSum += phi;
						}
						const phiPhiSum = calcPhi(phiSum);
						prod *= alpha * phiPhiSum;
					}
					link.r = prod;
				}
			}

			/**
			 * Step 3.  Update qij
			 */
			for (let i = 0; i < N; i++) {
				const vnode = variableNodes[i];
				const links = vnode.links;
				const llen = links.length;
				for (let c = 0; c < llen; c++) {
					const link = links[c];
					let sum = 0;
					for (let ci = 0; ci < llen; ci++) {
						if (ci !== c) {
							const clink = links[ci];
							sum += clink.r;
						}
					}
					link.q = vnode.ci + sum;
				}
			}

			/**
			 * Step 4.  Update Qi
			 */
			const Q = [];
			for (let i = 0; i < N ; i++) {
				const vnode = variableNodes[i];
				const links = vnode.links;
				const llen = links.length;
				let sum = 0;
				for (let v = 0 ; v < llen ; v++) {
					const link = links[v];
					sum += link.r;
				}
				Q[i] = vnode.ci + sum;
			}

			/**
			 * Step 5.  Check syndrome
			 */
			/* eslint-disable-next-line no-confusing-arrow */
			const c = Q.map(q => q < 0 ? 1 : 0);
			if (this.checkFast(c)) {
				return c.slice(0, this.code.messageBits);
			}


		} // for iter

		return null;
	}
	/* eslint-enable */

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