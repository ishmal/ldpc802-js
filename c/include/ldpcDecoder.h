#ifndef __LDPC_DECODER_H__
#define __LDPC_DECODER_H__

#include <stdint.h>

#include "codes.h"

typedef struct {
	float r;
	float q;
} QRNode;

typedef struct {
	uint8_t qrLen;
	QRNode *qrNodes;
} CheckNode;

typedef struct {
	float ci;
	uint8_t linkLen;
	QRNode **links;
} VariableNode;

//max M is 972
//max N is 1944
typedef struct {
	Code *code;
	CheckNode *checkNodes;
	VariableNode *variableNodes;
	uint8_t syndrome[1944];
	uint8_t outBytes[243]; // 1944/8
} LdpcDecoder;


#ifdef __cplusplus  
extern "C" {
#endif  
  
/**
 * Create a new decoder context
 * @param {Code *} code the code around which to configure this decoder
 * @return {LdpcDecoder *} a new decoder if successful, else null
 */
LdpcDecoder *ldpcDecoderCreate(Code *code);

/**
 * Clean up a decoder context
 * @param {LdpcDecoder *} dec the decoder context
 */
void ldpcDecoderDestroy(LdpcDecoder *dec);

/**
 * Decode codeword bits to message bits
 * @param {LdpcDecoder *} dec the decoder context
 * @param {float *} inBits message array of data from -1 -> 1
 * @param {int} nrBits the number of values in the array
 * @param {int} maxIter the maximum number of iterations before failing
 * @return decoded array of bits if successful, else null
 */
uint8_t *ldpcDecode(LdpcDecoder *dec, float *inBits, int nrBits, int maxIter);

/**
 * Decode codeword bits into bytes. Assumes that codeword length is a multiple of 8
 * @param {LdpcDecoder} dec the decoder context
 * @param {float *} bits pointer to an array of codeword bits, -1 to 1
 * @param {int} nrBits the length of the bits array
 * @param {int} maxiter the maximum number of iterations before failing
 * @return pointer to bytes if successful, else null
 */
uint8_t *ldpcDecodeBytes(LdpcDecoder *dec, float *bits, int nrBits, int maxIter);



#ifdef __cplusplus  
}  
#endif  

#endif
