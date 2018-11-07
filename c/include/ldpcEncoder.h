#ifndef __LDPCENCODER_H__
#define __LDPCENCODER_H__

#include "codes.h"

typedef struct {
	int msgLen;
	Code *code;
	uint8_t *Ast;
	uint8_t *Cst;
	uint8_t *TinvAst;
	uint8_t *ETinvAst;
	uint8_t *p1;
	uint8_t *Bp1;
	uint8_t *AstBp1;
	uint8_t *p2;
	uint8_t *x;
} LdpcEncoder;

#define CODE_UNKNOWN 0
#define CODE_12_648 1
#define CODE_12_1296 2
#define CODE_12_1944 3
#define CODE_23_648 4
#define CODE_23_1296 5
#define CODE_23_1944 6
#define CODE_34_648 7
#define CODE_34_1296 8
#define CODE_34_1944 9
#define CODE_56_648 10
#define CODE_56_1296 11
#define CODE_56_1944 12

#endif