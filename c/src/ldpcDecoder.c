
#include <stdio.h>
#include <stdlib.h>
#include <math.h>

#include "ldpcDecoder.h"
#include "util.h"



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
 * Check is the codeword passes check.  Fails early
 * for speed.
 * @param {int **} H sparse matrix
 * @param {int} len sparse matrix length
 * @param {array} codeword the word to check
 * @return {boolean} true if passes 
 */
static int checkFast(int **matrix, int len, uint8_t *codeword) {

	for (int i = 0; i < len; i++) {
		int *row = matrix[i];
		int rlen = row[0];
		int sum = 0;
		for (int j = 1; j <= rlen; j++) {
			sum ^= codeword[row[j]];
		}
		if (sum) {
			return 0;
		}
	}
	return 1;
}


/**
 * Create an empty Sum Product tanner graph
 */
static void createSPGraph(LdpcDecoder *dec) {
	Code *code = dec->code;
	int M = code->M;
	int N = code->N;
	int **H = code->H;

	CheckNode *checkNodes = (CheckNode *) malloc(M * sizeof(CheckNode));
	VariableNode *variableNodes = (VariableNode *) malloc(N * sizeof(VariableNode));

	/**
	 * First make two blank tables
	 */
	CheckNode *cn = checkNodes;
	for (int i = 0; i < M; i++, cn++) {
		cn->qrNodes = (QRNode *)0;
	}
	VariableNode *vn = variableNodes;
	for (int i = 0; i < N; i++, vn++) {
		vn->ci = 0.0;
		vn->links = (LinkNode *)0;
	}

	/**
	 * Set up QR records, and link to them from both sides
	 * using the sparse array information from H
	 */
	CheckNode *cnode = checkNodes;
	for (int i = 0 ; i < M; i++, cnode++) {
		int *row = H[i];
		int rlen = row[0];
		QRNode *prevQr = (QRNode *)0;
		LinkNode *prevLink = (LinkNode *)0;
		for (int j = 1; j <= rlen; j++) {
			VariableNode *vnode = variableNodes + row[j];
			QRNode *qr = (QRNode *)malloc(sizeof(QRNode));
			qr->q = 0.0;
			qr->r = 0.0;
			qr->next = (QRNode *)0;
			if (!prevQr) {
				cnode->qrNodes = qr;
			} else {
				prevQr->next = qr;
			}
			LinkNode *link = (LinkNode *)malloc(sizeof(LinkNode));
			link->qr = qr;
			link->next = (LinkNode *)0;
			if (!prevLink) {
				vnode->links = link;
			} else {
				prevLink->next = link;
			}
			prevQr = qr;
			prevLink = link;
		}
	}

	/**
	 * Attach to this instance
	 */
	dec->checkNodes = checkNodes;
	dec->variableNodes = variableNodes;
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
	createSPGraph(dec);
	return dec;
}

/**
 * Clean up a decoder context
 */
void ldpcDecoderDestroy(LdpcDecoder *dec) {
	if (!dec) {
		return;
	}
	int M = dec->code->M;
	int N = dec->code->N;

	/**
	 * Check Nodes
	 */
	CheckNode *cn = dec->checkNodes;
	for (int i = 0 ; i < M; i++ ) {
		QRNode *qr = cn->qrNodes;
		while (qr) {
			QRNode *next = qr->next;
			free(qr);
			qr = next;
		}
		cn++;
	}
	free(dec->checkNodes);

	/**
	 * Variable Nodes
	 */
	VariableNode *vn = dec->variableNodes;
	for (int i = 0; i < N; i++) {
		LinkNode *link = vn->links;
		while (link) {
			LinkNode *next = link->next;
			free(link);
			link = next;
		}
		vn++;
	}
	free(dec->variableNodes);

	free(dec->syndrome);

	free(dec);
}



/**
 * Decode codeword bits to message bits
 * @param {LdpcDecoder *} dec the decoder context
 * @param {float *} inBits message array of data from -1 -> 1
 * @param {int} nrBits the number of values in the array
 * @param {int} maxIter the maximum number of iterations before failing
 * @return decoded array of bits if successful, else null
 */
uint8_t *ldpcDecode(LdpcDecoder *dec, float *inBits, int nrBits, int maxIter) {
	// localize some values
	Code *code = dec->code;
	int M = code->M;
	int N = code->N;
	int **H = code->H;
	CheckNode *checkNodes = dec->checkNodes;
	VariableNode *variableNodes = dec->variableNodes;

	/**
	 * Step 1.  Initialization of c(ij) and q(ij)
	 */
	float variance = calcVariance(inBits, nrBits);
	float weight = 2 / variance;
	VariableNode *vnode = variableNodes;
	for (int i = 0; i < N; i++) {
		float Lci = inBits[i] * weight;
		vnode->ci = Lci;
		for (LinkNode *link = vnode->links; link; link = link->next) {
			QRNode *qr = link->qr;
			qr->r = 0.0;
			qr->q = Lci;
		}
		vnode++;
	}


	for (int iter = 0; iter < maxIter; iter++) {

		/**
		 * Step 2. update r(ji)
		 */
		CheckNode *checkNode = checkNodes;
		for (int m = 0; m < M; m++) {
			for (QRNode *qr = checkNode->qrNodes; qr; qr = qr->next) {
				/**
				 * Sum and product for links !== i
				 */
				float sum = 0.0;
				float prod = 1.0;				
				for (QRNode *v = checkNode->qrNodes; v; v = v->next) {
					if (v == qr) {
						continue;
					}
					float q = v->q;
					float beta = fabs(q);
					float phiBeta = calcPhi(beta);
					sum += phiBeta;
					float alpha = q < 0 ? -1 : 1;
					prod *= alpha;
				}
				double phiSum = calcPhi(sum);
				qr->r = prod * phiSum;
			}
			checkNode++;
		}

		/**
		 * Step 3.  Update qij
		 */
		VariableNode *vnode = variableNodes;
		for (int i = 0; i < N; i++) {
			for (LinkNode *link = vnode->links; link; link = link->next) {
				float sum = 0.0;
				for (LinkNode *c = vnode->links; c; c = c->next) {
					if (c != link) {
						sum += c->qr->r;
					}
				}
				link->qr->q = vnode->ci + sum;
			}
			vnode++;
		}

		/**
		 * Step 4.  Check syndrome
		 */
		uint8_t *c = dec->syndrome;
		vnode = variableNodes;
		for (int i = 0; i < N ; i++) {
			float sum = 0.0;
			for (LinkNode *link = vnode->links; link; link = link->next) {
				sum += link->qr->r;
			}
			float LQi = vnode->ci + sum;
			c[i] = LQi < 0 ? 1 : 0;
			vnode++;
		}
		if (checkFast(H, M, c)) {
			return c;
		}

	} // for iter

	return (uint8_t *)0;
}

/**
 * Decode codeword bits into bytes. Assumes that codeword length is a multiple of 8
 * @param {LdpcDecoder} dec the decoder context
 * @param {float *} inBits pointer to an array of codeword bits, -1 to 1
 * @param {int} nrBits the length of the bits array
 * @param {int} maxiter the maximum number of iterations before failing
 * @return pointer to bytes if successful, else null
 */
uint8_t *ldpcDecodeBytes(LdpcDecoder *dec, float *inBits, int nrBits, int maxIter) {
	uint8_t *bits = ldpcDecode(dec, inBits, nrBits, maxIter);
	if (!bits) {
		return (uint8_t *)0;
	}
	bitsToBytesBE(dec->outBytes, bits, dec->code->N);
	return dec->outBytes;
}

