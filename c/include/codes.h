
#ifndef __CODES_H__
#define __CODES_H__

/**
 * Tables of sparse arrays for encoding
 * with LDPC
 */
typedef struct
{
	int M;
	int N;
	int messageBits;
	int Alen;
	int **A;
	int Blen;
	int **B;
	int Clen;
	int **C;
	int Dlen;
	int **D;
	int Elen;
	int **E;
	int Tlen;
	int **T;
	int Hlen;
	int **H;
} Code;

#endif

