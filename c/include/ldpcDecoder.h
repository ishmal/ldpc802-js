#ifndef __LDPC_DECODER_H__
#define __LDPC_DECODER_H__

#include <stdint.h>

#include "codes.h"

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
	float ci;
	LinkNode *links;
} VariableNode;

typedef struct {
	Code *code;
	CheckNode *checkNodes;
	VariableNode *variableNodes;
	uint8_t *syndrome;
} LdpcDecoder;


#endif
