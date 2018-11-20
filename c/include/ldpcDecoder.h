#ifndef __LDPC_DECODER_H__
#define __LDPC_DECODER_H__

#include <stdint.h>

#include "codes.h"

struct QRNode_def {
	float r;
	float q;
	struct QRNode_def *next;
};
typedef struct QRNode_def QRNode;

struct LinkNode_def {
	QRNode *qr;
	struct LinkNode_def *next;
};
typedef struct LinkNode_def LinkNode;

typedef struct {
	QRNode *qrNodes;
} CheckNode;

typedef struct {
	float ci;
	LinkNode *links;
} VariableNode;

typedef struct {
	Code *code;
	CheckNode *checkNodes;
	VariableNode *variableNodes;
	uint8_t *syndrome;
} LdpcDecoder;


/**
 * Create a new decoder context
 * @param code the code around which to configure this decoder
 * @return a new decoder if successful, else null
 */
LdpcDecoder *ldpcDecoderCreate(Code *code);

/**
 * Clean up a decoder context
 */
void ldpcDecoderDestroy(LdpcDecoder *dec);

/**
 * Decode codeword bits to message bits
 * @param {array} message array of data from -1 -> 1
 * @return decoded array of message array of data from -1 -> 1
 */
uint8_t *ldpcDecode(LdpcDecoder *dec, float *inBits, int nrBits, int maxIter);


#endif
