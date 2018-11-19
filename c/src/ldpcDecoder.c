
#include <stdio.h>
#include <stdlib.h>
#include <math.h>

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
	float r;
	float q;
	QRNode *next;
} QRNode;

typedef struct {
	QRNode *qr;
	LinkNode *next;
} LinkNode;

typedef struct {
	QRNode *qrNodes;
} CheckNode;

typedef struct {
	fload ci;
	LinkNode *qrNodes;
} VariableNode;


/**
 * Create an empty Sum Product tanner graph
 */
static createSPGraph(LdpcDecoder *dec) {
	Code *code = dec->code;
	int M = code->M;
	int N = code->N;
	float **H = code->H;

	CheckNode *checkNodes = (CheckNode *) malloc(M * sizeof(CheckNode));
	VariableNode *variableNodes = (VariableNode *) malloc(N * sizeof(VariableNode));

	/**
	 * First make two blank tables
	 */
	for (int i = 0; i < M; i++) {
		CheckNode cn = checkNodes[i];
		cn.qrNodes = (QRNode *)0;
	}
	for (int i = 0; i < N; i++) {
		VariableNode vn = variableNodes[i];
		vn.ci = 0.0;
		vn.linkNodes = (LinkNode *)0;
	}

	/**
	 * Set up QR records, and link to them from both sides
	 * using the sparse array information from H
	 */
	for (int i = 0 ; i < M; i++) {
		int *row = H[i];
		CheckNode cnode = checkNodes[i];
		int rlen = row.length; 
		QRNode *prevQr = (QRNode *)0;
		Link *prevLink = (LinkNode *)0;
		for (int j = 0; j < rlen; j++) {
			int idx = row[j];
			VariableNode *vnode = variableNodes[idx];
			QRNode *qr = (QRNode *)malloc(sizeof(QRNode));
			qr->q = 0.0;
			qr->r = 0.0;
			qr->next = (QRNode *)0;
			if (!prevQr) {
				cnode->qrNodes = qr;
				prevQr = qr;
			} else {
				prevQr->next = qr;
			}
			LinkNode *link = (LinkNode *)malloc(sizeof(LinkNode));
			link->QRNode = qr;
			link->next = (LinkNode *)0;
			if (!prevLink) {
				vnode.linkNodes = link;
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
		LinkNode *link = vnode->links;
		while (link) {
			QRNode *qr = link->qr;
			qr->r = 0.0;
			qr->q = Lci;
			link = link->next;
		}
	}


	for (int iter = 0; iter < dec->maxIter; iter++) {

		/**
		 * Step 2. update r(ji)
		 */
		for (int m = 0; m < M; m++) {
			CheckNode *checkNode = checkNodes[m];
			QRNode *qr = checkNode->qrNodes;
			while (qr) {
				/**
				 * Sum and product for links !== i
				 */
				float sum = 0.0;
				float prod = 1.0;
				QRNode *v = checkNode->qrNodes;
				while (v) {
					if (v === qr) {
						continue;
					}
					float q = v->q;
					float beta = fabs(q);
					float phiBeta = calcPhi(beta);
					sum += phiBeta;
					float alpha = q < 0 ? -1 : 1;
					prod *= alpha;

					v = v->next;
				}
				const phiSum = calcPhi(sum);
				rlink.r = prod * phiSum;

				qr = qr->next;
			}

			for (let i = 0; i < llen ; i++) {
				const rlink = links[i];
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
	dec->maxIter = 100;
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
	CheckNode *checkNodes = dec->checkNodes;
	for (int i = 0 ; i < M; i++ ) {
		CheckNode *cn = checkNodes[i];
		QRNode *qr = cn->qrNodes;
		while (qr) {
			QRCode *next = qr->next;
			free(qr);
			qr = next;
		}		
	}
	free(checkNodes);

	/**
	 * Variable Nodes
	 */
	VariableNode *variableNodes = dec->variableNodes;
	for (int i = 0; i < N; i++) {
		VariableNode *vn = variableNodes[i];
		LinkNode *link = vn->linkNodes;
		while (link) {
			LinkNode *next = link->next;
			free(link);
			link = next;
		}
	}
	free(variableNodes);

	free(dec);
}

