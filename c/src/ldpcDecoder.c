
#include <stdio.h>
#include <stdlib.h>

#include "ldpcDecoder.h"


static float calcVariance(float *samples, int n) {
	float m = 0;
	float s = 0;
	for (int k = 0; k < n; ) {
		float x = samples[k++];
		float oldM = m;
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
static int check(codeword) {
	const checkVal = multiplySparse(code.H, codeword);
	for (int i = 0, len = this.code.messageBits; i < len; i++) {
		if (checkVal[i]) {
			return false;
		}
	}
	return true;
}

typedef struct {

} CheckNode;

typedef struct {

} VariableNode;

typedef struct {
	float r;
	float q;
} Link;

/**
 * Create an empty
 */
static createSPGraph(LdpcDecoder *dec) {
	Code *code = dec->code;
	int M = code->M;
	int N = code->N;
	float **H = code->H;

	CheckNode *checkNodes = (CheckNode *) malloc(M * sizeof(CheckNode));
	VariableNode *variableNodes = (VariableNode *) malloc(N * sizeof(VariableNode));
	LinkNode *linkNodes = (LinkNode *)malloc(N * sizeof(LinkNode));

	/**
		* First make two blank tables
		*/
	for (int i = 0; i < M; i++) {
		checkNodes[i] = {
			links: []
		};
	}
	for (int i = 0; i < N; i++) {
		variableNodes[i] = {
			links: [],
			ci: 0
		};
	}

	/**
		* Then interconnect then with link records,
		* using the sparse array information from H
		*/
	for (int i = 0 ; i < M; i++) {
		const row = H[i];
		const cnode = checkNodes[i];
		const rlen = row.length;
		for (int j = 0; j < rlen; j++) {
			const idx = row[j];
			const vnode = variableNodes[idx];
			const link = {
				q: 0,
				r: 0,
			};
			cnode.links.push(link);
			vnode.links.push(link);
		}
	}

	/**
	 * Attach to this instance
	 */
	dec->checkNodes = checkNodes;
	dec->variableNodes = variableNodes;
	dec->variableNodes = variableNodes;
}


/**
 * Decode codeword bits to message bits
 * @param {array} message array of data from -1 -> 1
 * @return decoded array of message array of data from -1 -> 1
 */
ldpcDecodeSumProduct(LdpcDecoder *dec, float *inBits, int nrBits) {
	// localize some values
	int M = dec->code->M;
	int N = dec->code->N;
	CheckNode *checkNodes = dec->checkNodes;
	VariableNode *variableNodes = dec->variableNodes;

	/**
	 * Step 1.  Initialization of c(ij) and q(ij)
	 */
	float variance = calcVariance(inBits);
	float weight = 2 / variance;
	for (let i = 0; i < N; i++) {
		VariableNode *vnode = variableNodes[i];
		float Lci = inBits[i] * weight;
		vnode.ci = Lci;
		const links = vnode.links;
		const llen = links.length;
		for (int j = 0; j < llen ; j++) {
			const link = links[j];
			link.r = 0;				
			link.q = Lci;				
		}
	}


	for (let iter = 0; iter < this.maxIter; iter++) {

		/**
			* Step 2. update r(ji)
			*/
		for (let m = 0; m < M; m++) {
			const checkNode = checkNodes[m];
			const links = checkNode.links;
			const llen = links.length;

			for (let i = 0; i < llen ; i++) {
				const rlink = links[i];
				/**
					* Sum and product for links !== i
					*/
				let sum = 0;
				let prod = 1;
				for (let v = 0; v < llen; v++) {
					if (v === i) {
						continue;
					}
					const q = links[v].q;
					const beta = Math.abs(q);
					const phiBeta = calcPhi(beta);
					sum += phiBeta;
					const alpha = q < 0 ? -1 : 1;
					prod *= alpha;
				}
				const phiSum = calcPhi(sum);
				rlink.r = prod * phiSum;
			}
		}

		/**
			* Step 3.  Update qij
			*/
		for (let i = 0; i < N; i++) {
			const vnode = variableNodes[i];
			const links = vnode.links;
			const llen = links.length;
			for (let k = 0; k < llen; k++) {
				const link = links[k];
				let sum = 0;
				for (let c = 0; c < llen; c++) {
					if (c !== k) {
						sum += links[c].r;
					}
				}
				link.q = vnode.ci + sum;
			}
		}

		/**
			* Step 4.  Check syndrome
			*/
		const c = [];
		for (let i = 0; i < N ; i++) {
			const vnode = variableNodes[i];
			const links = vnode.links;
			const llen = links.length;
			let sum = 0;
			for (let v = 0 ; v < llen ; v++) {
				const link = links[v];
				sum += link.r;
			}
			const LQi = vnode.ci + sum;
			c[i] = LQi < 0 ? 1 : 0;
		}
		if (this.checkFast(c)) {
			return c.slice(0, this.code.messageBits);
		}


	} // for iter

	return null;
}


/**
 * Create a new decoder context
 * @param code the code around which to configure this decoder
 * @return a new decoder if successful, else null
 */
LdpcDecoder *ldpcDecoderCreate(Code *code) {
	LdpcDecoder *dec = (LdpcDecoder *) malloc(sizeof(LdpcDecoder));

	if (!dec) {
		return dec;
	}

	dec->code = code;


	return dec;
}

/**
 * Clean up a decoder context
 */
void ldpcDecoderDestroy(LdpcDecoder *dec) {
	if (!dec) {
		return;
	}
	free(dec);
}

