
#include <stdint.h>

#include "util.h"

/**
 * Multiply a sparse binary matrix with a normal binary array
 * @param {array} sparseMatrix an array of integer indices to the 1's of the
 * sparse row vector
 * @param {array} arr column vector 
 */
static void multiplySparse(uint8_t *out, int *sparseMatrix[],  int len,  uint8_t *arr) {
	uint8_t *p = out;
	for (int i = 0; i < len; i++) {
		int *row = sparseMatrix[i];
		uint8_t sum = 0;
		int rlen = row[0];
		for (int j = 1 ; j <= rlen ; j++) {
			int idx = row[j];
			sum ^= arr[idx];
		}
		*p++ = sum;
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
static void substituteSparse(uint8_t y[], int *sparseArr[],  int slen, uint8_t *arr) {
	y[0] = arr[0];
	for (int i = 1; i < slen; i++) {
		int *row = sparseArr[i];
		int sum = 0;
		int rlen = row[0];
		for (int j = 1; j <= rlen ; j++) {
			int idx = row[j];
			sum ^= y[idx];
		}
		y[i] = sum ^ arr[i];
	}
}
