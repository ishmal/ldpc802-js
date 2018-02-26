/* jshint node: true, esversion: 6 */

const Crc32 = require("./crc32");
const Util = require("./util");
const codes = require("./ldpccodes");

/**
 * LDPC codec for 802.11n LDPC codes
 */
class Ldpc {
	//######################################################
	//# C O N S T R U C T O R
	//######################################################

	constructor() {
		this.codes = codes;
		this.makeTables();
	}

	makeTables() {
		for (let rate of Object.values(codes)) {
			for (let code of Object.values(rate.lengths)) {
				code.A = this.getA(code);
				code.B = this.getB(code);
				code.C = this.getC(code);
				code.D = this.getD(code);
				code.E = this.getE(code);
				code.T = this.getT(code);				
			}
		}
	}

	getA(code) {
		let A = [];
		for (let i = 0, len = code.mb - 1; i < len; i++) {
			let row = code.Hb[i];
			let val = row.slice(0, code.kb);
			A.push(val);
		}
		return A;
	}

	//let's just make this an array rather than array[]
	getB(code) {
		let pos = code.kb;
		let B = [];
		for (let i = 0, len = code.mb - 1; i < len; i++) {
			let val = code.Hb[i][pos];
			B.push(val);
		}
		return B;
	}

	getC(code) {
		let C = code.Hb[code.mb - 1].slice(0, code.kb);
		return C;
	}

	getD(code) {
		let D = [code.Hb[code.mb - 1][code.kb]];
		return D;
	}

	getE(code) {
		let E = code.Hb[code.mb - 1].slice(code.kb + 1);
		return E;
	}

	getT(code) {
		let pos = code.kb + 1;
		let T = [];
		for (let i = 0, len = code.mb - 1; i < len; i++) {
			let row = code.Hb[i];
			T.push(row.slice(pos));
		}
		return T;
	}

	//######################################################
	//# U T I L I T Y
	//######################################################

	/**
     * Break up a linear array of bits into z-sized subarrays.
     * NOTE:  this assumes that the input array's length is a multiple of z
     * @param {array} inbits array of bits to break up
     * @param {number} size the size of each subarray
     * @return {array[]} array of arrays of bits
     */
	bitsToZ(inbits, size) {
		let zarr = [];
		for (
			let i = 0, next = size, len = inbits.length;
			i < len;
			i = next, next += size
		) {
			let bits = inbits.slice(i, next);
			zarr.push(bits);
		}
		return zarr;
	}

	/**
     * Flatten a Z array (array of arrays of bits) to a single array of bits
     * @param {array[]} z the array-of-arrays to flatten
     * @return {array} linear array of bits
     */
	flatten(z) {
		return z.reduce((acc, child) => acc.concat(child), []);
	}

	/**
     * Rotate an array N places to the right.  This assumes
     * that n is less than or equal to the array length.
     * @param {array} arr the array of bits to rotate
     * @param {number} n the number of spaces to rotate
     * @return {array} a copy of the array rotated n places
     *     to the right
     */
	arrayRotate(arr, n) {
		if (!n) {
			return arr.slice();
		}
		let pos = arr.length - n;
		return arr.slice(pos).concat(arr.slice(0, pos));
	}

	/**
     * Rotatethe subarrays of an array N places to the right.  
     * This assumes that n is less than or equal to the length
     * of all of the subarrays.
     * @param {array[]} arr the array of bits to rotate
     * @param {array} bitsArr an array with each member as the
     *    number of spaces to rotate
     * @return {array[]} a clone of the array with each of the
     * subarrays rotated by the associated number in bitsArr
     */
	arrayRotateDeep(qcArr, bitsArr) {
		let arr = [];
		for (let i = 0, len = bitsArr.length; i < len; i++) {
			let rotation = qcArr[i];
			let rotated = this.arrayRotate(bitsArr[i], rotation);
			arr[i] = rotated;
		}
		return arr;
	}

	/**
     * Sum two arrays of numbers together
     * @param {array} a array of numbers
     * @param {array} b array of numbers
     * @return {array} sum of the two arrays
     */
	arrayAdd(a, b) {
		let len = a.length;
		let arr = new Array(len);
		for (let i = 0; i < len; i++) {
			arr[i] = a[i] + b[i];
		}
		return arr;
	}

	/**
     * XOR two arrays of numbers together.  Intended for binary arrays of 1 and 0
     * @param {array} a array of bits
     * @param {array} b array of bits
     * @return {array} xor of the two arrays
     */
	arrayXor(a, b) {
		let arr = [];
		for (let i = 0, len = a.length; i < len; i++) {
			arr[i] = a[i] ^ b[i];
		}
		return arr;
	}

	/**
     * XOR two arrays of arrays of numbers together.  Assumes
     * that their lengths are the same and that their corresponding
     * subarrays are the same length.
     * @param {array[]} a an array of bit arrays
     * @param {array[]} b an array of bit arrays
     * @return {array} xor of the two arrays
     */
	arrayXorDeep(a, b) {
		let arr = [];
		for (let i = 0, len = a.length; i < len; i++) {
			arr[i] = this.arrayXor(a[i], b[i]);
		}
		return arr;
	}

	/**
     * Perform one "lambda" operation on a message and matrix row.
     * Iterate through all of the z-sized subarrays of zbits, and
     * rotate each one right by amount in the associated cell
     * of the Hb array.
     * @param {array} row a row in the quasi-cyclic matrix, containing
	 * 	values in the range (-1) .. (z-1)
     * @param {array[]} zbits array of z-sized arrays of bits of message
     * @param {number} z the size of a z-array
     * @param {number} kb width of parity bits
     * @return p a z-sized array with the modulo-2 sum of all of the
     * rotation matrices.
     */
	lambdaI(row, zbits, z, kb) {
		let rowlen = row.length;
		if (kb > rowLen) {
			throw new Error("row data too short. rowLen: " + 
				rowLen + "  kb: " + kb);
		}
		let p = new Array(z).fill(0); //carries the sum
		for (let j = 0; j < kb; j++) {
			let rotation = row[j]; //how much to rotate?
			if (rotation >= 0) {
				let mj = zbits[j];
				let rotated = this.arrayRotate(mj, rotation);
				p = this.arrayXor(p, rotated);
			}
		}
		return p;
	}

	/**
     * Encode an array of bytes with the given LDPC code
     * @param {array} bytes the bytes to encode
     * @param {string} rateStr the rate from the tables above
     * @param {string} lengthStr the length from the tables above
     * @return {array} the encoded bits
     */
	encode(bytes, rateStr, lengthStr) {
		let rate = codes[rateStr];
		let code = rate.lengths[lengthStr];
		let nrPad = (code.length >> 3) - bytes.length;
		for (let i = 0 ; i < nrPad ; i++) {
			bytes.push(0);
		}
		let z = code.z;
		let Hb = code.Hb; //QC table
		let mb = code.mb; //parity in z-blocks
		let kb = code.kb; //message length in z-blocks
		let bits = Util.bytesToBitsBE(bytes);
		bits = bits.slice(0, code.messageBits); //just in case
		let zbits = this.bitsToZ(bits, z);
		let parityZbits = [];

		/**
         * First get parity bits p0
         * p0 = sum(0..mb-1)lambdaI
         */
		let p0 = new Array(z).fill(0);
		for (let i = 0; i < mb; i++) {
			let row = Hb[i];
			let p = this.lambdaI(row, zbits, z, kb);
			p0 = this.arrayXor(p0, p);
		}
		parityZbits.push(p0);

		/**
         * Now get the remainder of the parity bits
         * pip0 is p0 shifted 1 position right
         * p1 = lambdaI(0) + pip0
         * p2 = lambdaI(1) + pip1
         */
		let lastp = p0;
		for (let i = 0; i < mb - 1; i++) {
			let row = Hb[i];
			let lambdai = this.lambdaI(row, zbits, z, kb);
			let pipN = this.arrayRotate(lastp, 1);
			let p = this.arrayXor(lambdai, pipN);
			parityZbits.push(p);
			lastp = p;
		}

		/**
         * Done.  Append parity bits to end of message bits
         */
		let outbits = bits.slice();
		parityZbits.forEach(arr => {
			outbits = outbits.concat(arr);
		});
		return outbits;
	}

	/**
     * Rotate an array of z-subarrays by a row of rotations.
     * Sum the rotated subarrays.
     * @param {array[number]} row array of rotations
     * @param {array[array[number]]} arr array of z-sized arrays
     * @param {number} z size of each subarray
     * @return {array} z-sized array of the sum
     */
	multiplyQC(row, arr, z, kb) {
		let sum = new Array(z).fill(0);
		for (let i = 0; i < kb; i++) {
			let rotate = row[i];
			let v = arr[i];
			if (rotate === 0) {
				sum = this.arrayXor(sum, v);
			} else if (rotate >= 0) {
				let rotated = this.arrayRotate(v, rotate);
				sum = this.arrayXor(sum, rotated);
			}
		}
		return sum;
	}

	/**
     * Encode an array of bytes with the given LDPC code
     * @param {array} bytes the bytes to encode
     * @param {string} rateStr the rate from the tables above
     * @param {string} lengthStr the length from the tables above
     * @return {array} the encoded bits
     */
	encode2(bytes, rateStr, lengthStr) {
		let rate = codes[rateStr];
		let code = rate.lengths[lengthStr];
		let z = code.z;
		let bits = Util.bytesToBitsBE(bytes);
		bits = bits.slice(0, code.messageBits); //just in case
		let zbits = this.bitsToZ(bits, z);
		let parityZbits = [];
		let Hb = code.Hb; //QC table
		let mb = code.mb; //message length in z-blocks
		let mb1 = mb - 1;
		let kb = code.kb; //parity in z-blocks

		/**
         * Step 1:  Compute A x s(T)  and C x s(T)
         * AsT is m-1 rows, 1 column
         * Cst is 1 row, 1 column
         */
		let Ast = [];
		for (let i = 0; i < mb1; i++) {
			let row = code.A[i];
			let res = this.multiplyQC(row, zbits, z, kb);
			Ast.push(res);
		}
		let Cst = this.multiplyQC(code.C, zbits, z, kb);

		/**
         * Step 2: Compute E x (T-1) * A x s(T)
         * ET1xAst is 1 row, 1 column
         */
		let Et1xAst = new Array(z).fill(0);
		for (let i = 0; i < mb1; i++) {
			let bits = Ast[i];
			Et1xAst = this.arrayXor(Et1xAst, bits);
		}

		/**
         * Step 3: Compute p1T by p
         */
		let p1 = this.arrayXor(Et1xAst, Cst);

		/**
         * Step 4: Get Bp1
         * Bp1 is m - 1 rows, 1 column
         */
		let Bp1 = [];
		for (let i = 0; i < mb1; i++) {
			let val = code.B[i];
			let rotated = this.arrayRotate(p1, val);
			Bp1.push(rotated);
		}

		/**
         * Get Tp1 = Ast + Bp1
         * Tp1 is m - 1 row, k columns
         */
		let Tp1 = [];
		for (let i = 0; i < mb1; i++) {
			let arow = Ast[i];
			let brow = Bp1[i];
			Tp1.push(this.arrayXorDeep(arow, brow));
		}

		/**
         * Use back substitution to solve
         * Tp1 = AsT + Bp1
         * p2 = mb - 1 z-blocks
         */
		let p2 = new Array(mb1).fill(new Array(z).fill(0));
		for (let i = mb1 - 1; i >= 0; i--) {
			let xi = Tp1[i];
			for (let j = i; j < mb1; j++) {
				let amount = code.T[i][j];
				let rot = this.arrayRotate(p2[j], z - amount);
				xi = this.arrayXor(xi, rot);
			}
			p2[i] = xi; //no need to scale
		}

		let p1bits = this.flatten(p1);
		let p2bits = this.flatten(p2);
		let outbits = bits.concat(p1bits).concat(p2bits);
		return outbits;
	}

	/**
     * Encode a string with the given LDPC code
     * @param {string} str the string to encode
     * @param {string} rateStr the rate from the tables above
     * @param {string} lenStr length from the tables above
     * @return {array} the encoded bits
     */
	encodeString(str, rateStr, lenStr) {
		let bytes = Util.stringToBytes(str);
		return this.encode(bytes, lenStr, rateStr);
	}

	/**
     * Decode an array of LDPC-encoded bits with the given LDPC code
     * @param {array} inbits array of bits
     * @param {string} rateStr the rate from the tables above
     * @param {string} lenStr the length from the tables above
     * @return {array} the output bytes
     */
	decode(inbits, rateStr, lenStr) {
		let outbytes = [];
		/**
         * Step 2 ...  ?
         */
		return outbytes;
	}

	/** 
     * Decode an array of LDPC-encoded bits with the given LDPC code
     * @param {array} inbits array of bits
     * @param {string} rateStr the rate from the tables above
     * @param {string} lenStr the length from the tables above
     * @param {string} the output string
     */
	decodeString(inbits, rateStr, lenStr) {
		let outbytes = this.decode(inbits);
		let str = Util.bytesToString(outbytes);
		return str;
	}
}

module.exports = Ldpc;
