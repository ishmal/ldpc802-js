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


#ifdef __cplusplus  
extern "C" {
#endif  
  

/**
 * Create a new encoder context configured for the given code
 */
LdpcEncoder *ldpcEncoderCreate(Code *code);

/**
 *
 */
void ldpcEncoderDestroy(LdpcEncoder *enc);

/**
 * @param {array} s array of bits, size code->messageBits
 * @return {array} array of encoded bits, size N
 */
uint8_t *ldpcEncode(LdpcEncoder *enc, uint8_t *s, int len);

/**
 * Encode a message array of bytes
 * @param {array} bytes an array of bytes to encode 
 */
uint8_t *ldpcEncodeBytes(LdpcEncoder *enc, uint8_t *bytes, int nrBytes);

#ifdef __cplusplus  
}  
#endif  



#endif