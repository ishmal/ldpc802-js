#ifndef __UTIL_H__
#define __UTIL_H__


#include <stdint.h>

#include "util.h"

/**
 * Multiply a sparse binary matrix with a normal binary array
 * @param {array} sparseMatrix an array of integer indices to the 1's of the
 * sparse row vector
 * @param {array} arr column vector 
 */
void multiplySparse(uint8_t *out, int *sparseMatrix[],  int len,  uint8_t *arr);

/**
 * Perform back substitution sparse binary array with a normal binary array.
 * Assume sparse is lower diagonal
 * y[i] = T[i,1]y[1] + T[i,2]y[2] + · · · + T[i,i−1]y[i−1] + x[i]
 * @param {array} sparseArr an array of integer indices to the 1's of the
 * sparse row vector
 * @param {array} arr column vector 
 */
void substituteSparse(uint8_t y[], int *sparseArr[],  int slen, uint8_t *arr);


#endif
