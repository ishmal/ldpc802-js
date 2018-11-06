

#include <stdint.h>


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

typedef struct {
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
	int ***D;
	int Elen;
	int **E;
	int Tlen;
	int **T;
	int Hlen;
	int **H;
} LdpcEncoder;


#define ONE_HALF_634 1
	
LdpcEncoder *ldpcEncoderCreate(code) {

	LdpcEncoder *enc = (LdpcEncoder *) malloc(sizeof LdpcEncoder);

	switch (code) {
		case ONE_HALF_634:
		break;
		default:
		    return null;
	}	
}


	encode(int s[], ) {
		// step 1
		const Ast = multiplySparse(this.code.A, s);
		const Cst = multiplySparse(this.code.C, s);
		// step 2
		const TinvAst = substituteSparse(this.code.T, Ast);
		const ETinvAst = multiplySparse(this.code.E, TinvAst);
		// step 3
		const p1 = add(ETinvAst, Cst);
		// step 4
		const Bp1 = multiplySparse(this.code.B, p1);
		const AstBp1 = add(Ast, Bp1);
		const p2 = substituteSparse(this.code.T, AstBp1);
		// step 5
		const x = s.concat(p1).concat(p2);
		return x;
	}

	/**
	 * Encode a message array of bytes
	 * @param {array} bytes an array of bytes to encode 
	 * @return encoded message bits
	 */
	encodeBytes(bytes) {
		let bits = Util.bytesToBitsBE(bytes);
		bits = bits.slice(0, this.code.messageBits); //just in case
		return this.encode(bits);
	}


}
