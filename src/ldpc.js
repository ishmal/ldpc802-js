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
     * @param {array[]} Hb the quasi-cyclic matrix
     * @param {array[]} zbits array of z-sized arrays of bits of message
     * @param {number} z size of each array
     * @param {number} kb width of parity bits
     * @param {number} i index of row in matrix
     * @return p a z-sized array with the modulo-2 sum of all of the
     * rotation matrices.
     */
    lambdaI(Hb, zbits, z, kb, i) {
        let p = new Array(z).fill(0);
        for (let j = 0; j < kb; j++) {
            let hij = Hb[i][j]; //how much to rotate?
            if (hij >= 0) {
                let mz = zbits[j];
                p = this.arrayXor(p, this.arrayRotate(mz, hij));
            }
        }
        return p;
    }

    /**
     * Encode an array of bytes with the given LDPC code
     * TODO: select a length according to the length of the byte array
     * @param bytes {array} the bytes to encode
     * @param rateStr {string} the rate from the tables above
     * @param lengthStr {string} the length from the tables above
     * @return {array} the encoded bits
     */
    encode(bytes, rateStr, lengthStr) {
        let rate = codes[rateStr];
        let code = rate.lengths[lengthStr];
        let z = code.z;
        let bits = Util.bytesToBits(bytes);
        let zbits = this.bitsToZ(pbits, z);
        let zbitsOut = zbits.slice(0);
        let Hb = code.Hb; //QC table
        let mb = code.mb; //message length in z-blocks
        let kb = code.kb; //parity in z-blocks
        let p0 = new Array(z).fill(0);
        for (let i = 0; i < mb; i++) {
            let p = this.lambdaI(Hb, zbits, z, kb, i);
            p0 = this.arrayAdd(p0, p);
        }
        zbitsOut.push(p0);
        for (let i = 1; i < kb; i++) {
            let p = this.lambdaI(Hb, zbits, z, kb, i - 1);
            let nextp = this.arrayAdd(p, this.arrayRotate(p0, 1));
            zbitsOut.push(nextp);
        }
        let outbits = this.flatten(zbitsOut);
        return outbits;
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