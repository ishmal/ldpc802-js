
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

extern Code R12_648;
extern Code R12_1296;
extern Code R12_1944;
extern Code R23_648;
extern Code R23_1296;
extern Code R23_1944;
extern Code R34_648;
extern Code R34_1296;
extern Code R34_1944;
extern Code R56_648;
extern Code R56_1296;
extern Code R56_1944;

#endif

