/* jshint node: true, esversion: 6 */

const Crc32 = require('./crc32');
const Util = require('./util');
const codes = require('./ldpccodes');


/**
 * LDPC codec for 802.11n LDPC codes
 */
class Ldpc {

    constructor() {
        this.codes = codes;
    }

    /**
     * Break up a linear array of bits into z-sized subarrays.
     * NOTE:  this assumes that the input array's length is a multiple of z
     * @param {array} inbits array of bits to break up
     * @param {number} size the size of each subarray
     */
    bitsToZ(inbits, size) {
        let bits = inbits.slice(0);
        let zarr = [];
        while (bits.length > 0) {
            zarr.push(bits.splice(0, size));
        }
        return zarr;
    }

    /**
     * Flatten a Z array (array of arrays of bits) to a single array of bits
     * @param {array} z the array-of-arrays to flatten
     */
    flatten(z) {
        return z.reduce((acc, child) => acc.concat(child), []);
    }

    /**
     * Rotate an array N places to the right.  This assumes
     * that n is less than or equalt to the array length.
     * @param {array} arr the array of bits to rotate
     * @param {*} n the number of spaces to rotate
     */
    arrayRotate(arr, n) {
        if (!n) {
            return arr.slice(0);
        }
        let pos = arr.length - n;
        return arr.slice(pos).concat(arr.slice(0, pos));
    }

    /**
     * Sum two arrays of numbers together
     * @param {array} a 
     * @param {array} b 
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
     * XOR two arrays of numbers together
     * @param {array} a 
     * @param {array} b 
     * @return {array} xor of the two arrays
     */
    arrayXor(a, b) {
        let len = a.length;
        let arr = new Array(len);
        for (let i = 0; i < len; i++) {
            arr[i] = a[i] ^ b[i];
        }
        return arr;
    }

    /**
     * Perform one "lambda" operation on a message and matrix row.
     * Iterate through all of the z-sized subarrays of zbits, and
     * rotate each one right by amount in the associated cell
     * of the Hb array.
     * @param {array} row a row in the quasi-cyclic matrix
     * @param {array[]} zbits array of z-sized arrays of bits of message
     * @param {number} z the size of a z-array
     * @param {number} kb width of parity bits
     * @return p a z-sized array with the modulo-2 sum of all of the
     * rotation matrices.
     */
    lambdaI(row, zbits, z, kb) {
        let p = new Array(z).fill(0);
        for (let j = 0; j < kb; j++) {
            let rotation = row[j]; //how much to rotate?
            if (rotation >= 0) {
                let mz = zbits[j];
                p = this.arrayXor(p, this.arrayRotate(mz, rotation));
            }
        }
        return p;
    }

    /**
     * Encode an array of bytes with the given LDPC code
     * @param bytes {array} the bytes to encode
     * @param rateStr {string} the rate from the tables above
     * @param lengthStr {string} the length from the tables above
     * @return {array} the encoded bits
     */
    encode(bytes, rateStr, lengthStr) {
        let rate = codes[rateStr];
        let code = rate.lengths[lengthStr];
        let z = code.z;
        let Hb = code.Hb; //QC table
        let mb = code.mb; //parity in z-blocks
        let kb = code.kb; //message length in z-blocks
        let bits = Util.bytesToBits(bytes);
        let msgBitLen = kb * z;
        bits = bits.slice(0, msgBitLen);  //just in case
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
        let outbits = bits.slice(0);
        parityZbits.forEach((arr) => {
            outbits = outbits.concat(arr);
        });
        return outbits;
    }

    multiplyQC(row, arr) {
        let len = arr.length;
        let sum = new Array(len).fill(0);
        for (let i = 0 ; i < len ; i++) {
            let rotate = row[i];
            let v = arr[i];
            if (rotate === 0) {
                sum = this.arrayXor(sum, v);
            } else if (rotate >= 0) {
                let rotated = this.arrayRotate(v, rotation);
                sum = this.arrayXor(sum, rotated);
            }
        }
        return sum;
    }

   /**
     * Encode an array of bytes with the given LDPC code
     * @param bytes {array} the bytes to encode
     * @param rateStr {string} the rate from the tables above
     * @param lengthStr {string} the length from the tables above
     * @return {array} the encoded bits
     */
    encode2(bytes, rateStr, lengthStr) {
        let rate = codes[rateStr];
        let code = rate.lengths[lengthStr];
        let z = code.z;
        let bits = Util.bytesToBits(bytes);
        let zbits = this.bitsToZ(bits, z);
        let parityZbits = [];
        let Hb = code.Hb; //QC table
        let mb = code.mb; //message length in z-blocks
        let kb = code.kb; //parity in z-blocks

        /**
         * Step 1:  Compute A x s(T)  and C x s(T)
         */
        let AsT = new Array(mb).fill(0);
        for (let i = 0 ; i < kb - 1 ; i++) {
            let row = Hb[i];
            let rowsum = this.multiplyQC(row, zbits);
            AsT = this.arrayXor(AsT, rowsum);
        }
        row = Hb[kb - 1];
        let CsT = this.multiplyQC(row, zbits);
        

        /**
         * Step 2: Compute E x (T-1) * A x s(T)
         */

        /**
         * Step 3: Compute p1T by p
         */

        /**
         * Step 4: 
         */

        return [];
    }

    /**
     * Encode a string with the given LDPC code
     * @param str {string} the string to encode
     * @param rateStr {string} the rate from the tables above
     * @param lenStr {string} the length from the tables above
     * @return {array} the encoded bits
     */
    encodeString(str, rateStr, lenStr) {
        let bytes = Util.stringToBytes(str);
        return this.encode(bytes, lenStr, rateStr);
    }

    /**
     * Decode an array of LDPC-encoded bits with the given LDPC code
     * @param {array} inbits array of bits
     * @param rateStr {string} the rate from the tables above
     * @param lenStr {string} the length from the tables above
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
     * @param rateStr {string} the rate from the tables above
     * @param lenStr {string} the length from the tables above
     * @param {string} the output string
     */
    decodeString(inbits, rateStr, lenStr) {
        let outbytes = this.decode(inbits);
        let str = Util.bytesToString(outbytes);
        return str;
    }

}


module.exports = Ldpc;