

#include <stdint.h>

#include "codes.h"


void add(int *out, int *a, int *b, int len) {
	while (len--) {
		*out++ = *a++ ^ *b++;
	}
}

	/**
	 * Multiply a sparse binary matrix with a normal binary array
	 * @param {array} sparseMatrix an array of integer indices to the 1's of the
	 * sparse row vector
	 * @param {array} arr column vector 
	 */
static void multiplySparse(int out[], int *sparseMatrix[],  int len,  int arr[]) {
	for (int i = 0 ; i < len ; i++) {
		int row[] = sparseMatrix[i];
		int sum = 0;
		const rlen = row[0];
		for (int j = 1 ; j < rlen ; j++) {
				int idx = row[j];
				sum ^= arr[idx];
			}
		out[i] = sum;
	}
}

/**
 * Perform back substitution sparse binary array with a normal binary array.
 * Assume sparse is lower diagonal
 * y[i] = T[i,1]y[1] + T[i,2]y[2] + · · · + T[i,i−1]y[i−1] + x[i]
 * @param {array} sparseArr an array of integer indices to the 1's of the
 * sparse row vector
 * @param {array} arr column vector 
 */
static void substituteSparse(int y[], int *sparseArr[],  int slen, int arr[]) {
	y[0] = [arr[0]];
	for (int i = 1; i < slen; i++) {
		int *row = sparseArr[i];
		int sum = 0;
		int rlen = row[0]
		for (let j = 1; j <= rlen ; j++) {
			int idx = row[j];
			sum ^= y[idx];
		}
		y[i] = sum ^ arr[i];
	}
}


	
LdpcEncoder *ldpcEncoderCreate(code) {

	LdpcEncoder *enc = (LdpcEncoder *) malloc(sizeof LdpcEncoder);
	if (!enc) {
		return (LdpcEncoder *)0;
	}

	Code *code;

	switch (code) {
		case CODE_12_634:
			code = R12_634;
		break;
		default:
		    return null;
	}

	enc->code = code;
	// set up buffers here
	enc->Ast = (uint8_t *) malloc(code->Alen * sizeof uint8_t);
	enc->Cst = (uint8_t *) malloc(code->Alen * sizeof uint8_t);
	enc->TinvAst = (uint8_t *) malloc(code->Alen * sizeof uint8_t);
	enc->ETinvAst = (uint8_t *) malloc(code->Alen * sizeof uint8_t);
	enc->p1 = (uint8_t *) malloc(code->Alen * sizeof uint8_t);
	enc->Bp1 = (uint8_t *) malloc(code->Alen * sizeof uint8_t);
	enc->AstBp1 = (uint8_t *) malloc(code->Alen * sizeof uint8_t);
	enc->p2 = (uint8_t *) malloc(code->Alen * sizeof uint8_t);
	enc->x = (uint8_t *) malloc(code->N * sizeof uint8_t);
}

void ldpcEncodetDestroy(LdpcEncoder *enc) {
	if (!enc) {
		return;
	}
	if (enc->Ast) {
		free(enc->Ast)
	}
	if (enc->Cst) {
		free(enc->Cst)
	}
	if (enc->TinvAst) {
		free(enc->TinvAst)
	}
	if (enc->ETinvAst) {
		free(enc->ETinvAst)
	}
	if (enc->p1) {
		free(enc->p1)
	}
	if (enc->Bp1) {
		free(enc->Bp1)
	}
	if (enc->AstBp1) {
		free(enc->AstBp1)
	}
	if (enc->p2) {
		free(enc->p2)
	}
	if (enc->x) {
		free(enc->x)
	}
	free(enc);
}


uint8_t *ldpcEncode(LdpcEncoder *enc, uint8_t *s, int len) {
	Code *code = enc->code;
	uint8_t *Ast = enc->Ast; 
	uint8_t *Cst = enc->Cst; 
	uint8_t *TinvAst = enc->TinvAst; 
	uint8_t *ETinvAst = enc->ETinvAst; 
	uint8_t *p1 = enc->p1; 
	uint8_t *Bp1 = enc->Bp1; 
	uint8_t *AstBp1 = enc->AstBp1; 
	uint8_t *p2 = enc->p2; 

	// step 1
	multiplySparse(Ast, code->A, s);
	multiplySparse(Cst, code->C, s);
	// step 2
	substituteSparse(TinvAst, code->T, Ast);
	multiplySparse(ETinvAst, code->E, TinvAst);
	// step 3
	add(p1, ETinvAst, Cst);
	// step 4
	multiplySparse(Bp1, code->B, p1);
	add(AstBp1, Ast, Bp1);
	substituteSparse(p2, code->T, AstBp1);
	// step 5
	uint8_t *src = s;
	uint8_t *dest = enc->x;
	while (len--) {
		*dest++ = *src++;
	}
	len = alen;
	src = p1;
	while (len--) {
		*dest++ = *src++;
	}
	len = alen;
	src = p2;
	while (len--) {
		*dest++ = *src++;
	}
	return x;
}

/**
 * Encode a message array of bytes
 * @param {array} bytes an array of bytes to encode 
 * @return encoded message bits
 */
uint8_t *ldpcEncodeBytes(LdpcEncoder *enc, uint8_t *bytes, int len) {
	let bits = Util.bytesToBitsBE(bytes);
	bits = bits.slice(0, this.code.messageBits); //just in case
	return this.encode(bits);
}


