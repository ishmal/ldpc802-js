/* jshint node: true, esnext: true */
const Crc32 = require('./crc32');

const codes = {
    "648": {
        z: 27,
        length: 648,
        rates: {
            "1/2": {
                source: [
                    " 0  -  -  -  0  0  -  -  0  -  -  0  1 0 - - - - - - - - - -",
                    "22  0  -  - 17  -  0  0 12  -  -  -  - 0 0 - - - - - - - - -",
                    " 6  -  0  - 10  -  -  - 24  -  0  -  - - 0 0 - - - - - - - -",
                    " 2  -  -  0 20  -  -  - 25  0  -  -  - - - 0 0 - - - - - - -",
                    "23  -  -  -  3  -  -  -  0  -  9 11  - - - - 0 0 - - - - - -",
                    "24  - 23  1 17  -  3  - 10  -  -  -  - - - - - 0 0 - - - - -",
                    "25  -  -  -  8  -  -  -  7 18  -  -  0 - - - - - 0 0 - - - -",
                    "13 24  -  -  0  -  8  -  6  -  -  -  - - - - - - - 0 0 - - -",
                    " 7 20  - 16 22 10  -  - 23  -  -  -  - - - - - - - - 0 0 - -",
                    "11  -  -  - 19  -  -  - 13  -  3 17  - - - - - - - - - 0 0 -",
                    "25  -  8  - 23 18  - 14  9  -  -  -  - - - - - - - - - - 0 0",
                    " 3  -  -  - 16  -  -  2 25  5  -  -  1 - - - - - - - - - - 0"
                ]
            },
            "2/3": {
                source: [
                    "25 26 14  - 20  -  2  -  4  -  -  8  - 16  - 18  1 0 - - - - - -",
                    "10  9 15 11  -  0  -  1  -  - 18  -  8  - 10  -  - 0 0 - - - - -",
                    "16  2 20 26 21  -  6  -  1 26  -  7  -  -  -  -  - - 0 0 - - - -",
                    "10 13  5  0  -  3  -  7  -  - 26  -  - 13  - 16  - - - 0 0 - - -",
                    "23 14 24  - 12  - 19  - 17  -  -  - 20  - 21  -  0 - - - 0 0 - -",
                    " 6 22  9 20  - 25  - 17  -  8  - 14  - 18  -  -  - - - - - 0 0 -",
                    "14 23 21 11 20  - 24  - 18  - 19  -  -  -  - 22  - - - - - - 0 0",
                    "17 11 11 20  - 21  - 26  -  3  -  - 18  - 26  -  1 - - - - - - 0"
                ]
            },
            "3/4": {
                source: [
                    "16 17 22 24  9  3 14  -  4  2  7  - 26  -  2  - 21  -  1 0 - - - -",
                    "25 12 12  3  3 26  6 21  - 15 22  - 15  -  4  -  - 16  - 0 0 - - -",
                    "25 18 26 16 22 23  9  -  0  -  4  -  4  -  8 23 11  -  - - 0 0 - -",
                    " 9  7  0  1 17  -  -  7  3  -  3 23  - 16  -  - 21  -  0 - - 0 0 -",
                    "24  5 26  7  1  -  - 15 24 15  -  8  - 13  - 13  - 11  - - - - 0 0",
                    " 2  2 19 14 24  1 15 19  - 21  -  2  - 24  -  3  -  2  1 - - - - 0"
                ]
            },
            "5/6": {
                source: [
                    "17 13  8 21  9  3 18 12 10  0  4 15 19  2  5 10 26 19 13 13  1 0 - -",
                    " 3 12 11 14 11 25  5 18  0  9  2 26 26 10 24  7 14 20  4  2  - 0 0 -",
                    "22 16  4  3 10 21 12  5 21 14 19  5  -  8  5 18 11  5  5 15  0 - 0 0",
                    " 7  7 14 14  4 16 16 24 24 10  1  7 15  6 10 26  8 18 21 14  1 - - 0"
                ]
            }
        }
    },
    "1296": {
        z: 54,
        length: 1296,
        rates: {
            "1/2": {
                source: [
                    "40  -  -  - 22  - 49 23 43  -  -  -  1 0 - - - - - - - - - -",
                    "50  1  -  - 48 35  -  - 13  - 30  -  - 0 0 - - - - - - - - -",
                    "39 50  -  -  4  -  2  -  -  -  - 49  - - 0 0 - - - - - - - -",
                    "33  -  - 38 37  -  -  4  1  -  -  -  - - - 0 0 - - - - - - -",
                    "45  -  -  -  0 22  -  - 20 42  -  -  - - - - 0 0 - - - - - -",
                    "51  -  - 48 35  -  -  - 44  - 18  -  - - - - - 0 0 - - - - -",
                    "47 11  -  -  - 17  -  - 51  -  -  -  0 - - - - - 0 0 - - - -",
                    " 5  - 25  -  6  - 45  - 13 40  -  -  - - - - - - - 0 0 - - -",
                    "33  -  - 34 24  -  -  - 23  -  - 46  - - - - - - - - 0 0 - -",
                    " 1  - 27  -  1  -  -  - 38  - 44  -  - - - - - - - - - 0 0 -",
                    " - 18  -  - 23  -  -  8  0 35  -  -  - - - - - - - - - - 0 0",
                    "49  - 17  - 30  -  -  - 34  -  - 19  1 - - - - - - - - - - 0"
                ]
            },
            "2/3": {
                source: [
                    "39 31 22 43  - 40  4  - 11  -  - 50  -  -  -  6  1 0 - - - - - -",
                    "25 52 41  2  6  - 14  - 34  -  -  - 24  - 37  -  - 0 0 - - - - -",
                    "43 31 29  0 21  - 28  -  -  2  -  -  7  - 17  -  - - 0 0 - - - -",
                    "20 33 48  -  4 13  - 26  -  - 22  -  - 46 42  -  - - - 0 0 - - -",
                    "45  7 18 51 12 25  -  -  - 50  -  -  5  -  -  -  0 - - - 0 0 - -",
                    "35 40 32 16  5  -  - 18  -  - 43 51  - 32  -  -  - - - - - 0 0 -",
                    " 9 24 13 22 28  -  - 37  -  - 25  -  - 52  - 13  - - - - - - 0 0",
                    "32 22  4 21 16  -  -  - 27 28  - 38  -  -  -  8  1 - - - - - - 0"
                ]
            },
            "3/4": {
                source: [
                    "39 40 51 41  3 29  8 36  - 14  -  6  - 33  - 11  -  4  1 0 - - - -",
                    "48 21 47  9 48 35 51  - 38  - 28  - 34  - 50  - 50  -  - 0 0 - - -",
                    "30 39 28 42 50 39  5 17  -  6  - 18  - 20  - 15  - 40  - - 0 0 - -",
                    "29  0  1 43 36 30 47  - 49  - 47  -  3  - 35  - 34  -  0 - - 0 0 -",
                    " 1 32 11 23 10 44 12  7  - 48  -  4  -  9  - 17  - 16  - - - - 0 0",
                    "13  7 15 47 23 16 47  - 43  - 29  - 52  -  2  - 53  -  1 - - - - 0"
                ]
            },
            "5/6": {
                source: [
                    "48 29 37 52  2 16  6 14 53 31 34  5 18 42 53 31 45  - 46 52  1 0 - -",
                    "17  4 30  7 43 11 24  6 14 21  6 39 17 40 47  7 15 41 19  -  - 0 0 -",
                    " 7  2 51 31 46 23 16 11 53 40 10  7 46 53 33 35  - 25 35 38  0 - 0 0",
                    "19 48 41  1 10  7 36 47  5 29 52 52 31 10 26  6  3  2  - 51  1 - - 0"
                ]
            }
        }
    },
    "1944": {
        z: 81,
        length: 1944,
        rates: {
            "1/2": {
                source: [
                    "57  -  -  - 50  - 11  - 50  - 79  -  1 0 - - - - - - - - - -",
                    " 3  - 28  -  0  -  -  - 55  7  -  -  - 0 0 - - - - - - - - -",
                    "30  -  -  - 24 37  -  - 56 14  -  -  - - 0 0 - - - - - - - -",
                    "62 53  -  - 53  -  -  3 35  -  -  -  - - - 0 0 - - - - - - -",
                    "40  -  - 20 66  -  - 22 28  -  -  -  - - - - 0 0 - - - - - -",
                    " 0  -  -  -  8  - 42  - 50  -  -  8  - - - - - 0 0 - - - - -",
                    "69 79 79  -  -  - 56  - 52  -  -  -  0 - - - - - 0 0 - - - -",
                    "65  -  -  - 38 57  -  - 72  - 27  -  - - - - - - - 0 0 - - -",
                    "64  -  -  - 14 52  -  - 30  -  - 32  - - - - - - - - 0 0 - -",
                    " - 45  - 70  0  -  -  - 77  9  -  -  - - - - - - - - - 0 0 -",
                    " 2 56  - 57 35  -  -  -  -  - 12  -  - - - - - - - - - - 0 0",
                    "24  - 61  - 60  -  - 27 51  -  - 16  1 - - - - - - - - - - 0"
                ]
            },
            "2/3": {
                source: [
                    "61 75  4 63 56  -  -  -  -  -  -  8  -  2 17 25  1 0 - - - - - -",
                    "56 74 77 20  -  -  - 64 24  4 67  -  7  -  -  -  - 0 0 - - - - -",
                    "28 21 68 10  7 14 65  -  -  - 23  -  -  - 75  -  - - 0 0 - - - -",
                    "48 38 43 78 76  -  -  -  -  5 36  - 15 72  -  -  - - - 0 0 - - -",
                    "40  2 53 25  - 52 62  - 20  -  - 44  -  -  -  -  0 - - - 0 0 - -",
                    "69 23 64 10 22  - 21  -  -  -  -  - 68 23 29  -  - - - - - 0 0 -",
                    "12  0 68 20 55 61  - 40  -  -  - 52  -  -  - 44  - - - - - - 0 0",
                    "58  8 34 64 78  -  - 11 78 24  -  -  -  -  - 58  1 - - - - - - 0"
                ]
            },
            "3/4": {
                source: [
                    "48 29 28 39  9 61  -  -  - 63 45 80  -  -  - 37 32 22  1 0 - - - -",
                    " 4 49 42 48 11 30  -  -  - 49 17 41 37 15  - 54  -  -  - 0 0 - - -",
                    "35 76 78 51 37 35 21  - 17 64  -  -  - 59  7  -  - 32  - - 0 0 - -",
                    " 9 65 44  9 54 56 73 34 42  -  -  - 35  -  -  - 46 39  0 - - 0 0 -",
                    " 3 62  7 80 68 26  - 80 55  - 36  - 26  -  9  - 72  -  - - - - 0 0",
                    "26 75 33 21 69 59  3 38  -  -  - 35  - 62 36 26  -  -  1 - - - - 0"
                ]
            },
            "5/6": {
                source: [
                    "13 48 80 66  4 74  7 30 76 52 37 60  - 49 73 31 74 73 23  -  1 0 - -",
                    "69 63 74 56 64 77 57 65  6 16 51  - 64  - 68  9 48 62 54 27  - 0 0 -",
                    "51 15  0 80 24 25 42 54 44 71 71  9 67 35  - 58  - 29  - 53  0 - 0 0",
                    "16 29 36 41 44 56 59 37 50 24  - 65  4 65 52  -  4  - 73 52  1 - - 0"
                ]
            }
        }
    }
};


/**
 * LDPC codec for 802.11n LDPC codes
 */
class Ldpc {

    constructor() {
        this.generateTables();
    }

    /**
     * Generate our encoding and decoding tables
     */
    generateTables() {
        Object.keys(codes).forEach(k => {
            let code = codes[k];
            Object.keys(code.rates).forEach(k2 => {
                let rate = code.rates[k2];
                this.generateZ(code, rate);
            });
        });
    }

    /**
     * Generate the pseudo-cyclic 'Z' table from the code data
     * @param {*} code name of the code
     * @param {*} rate code rate for the code
     */
    generateZ(code, rate) {
        let z = code.z;
        let arr = [];
        let qtable = rate.source;
        let qcRows = qtable.length;
        for (let i = 0; i < qcRows; i++) {
            let row = [];
            let str = qtable[i].trim();
            let vals = str.split(/\s+/);
            let vlen = vals.length;
            for (let j = 0; j < vlen; j++) {
                let val = vals[j];
                if (val === '-') {
                    row.push(-1);
                } else {
                    let shift = parseInt(val, 10);
                    row.push(shift);
                }
            }
            arr.push(row);
        }
        rate.Z = arr;
    }

    /**
     * Convert a string to an array of UTF-8 bytes
     * @param {string} str 
     * @return {array} of bytes
     */
    stringToBytes(str) {
        let bytes = [];
        let len = str.length;
        for (let i = 0; i < len; i++) {
            let code = str.charCodeAt(i);
            if (code < 0x80) {
                bytes.push(code);
            } else if (code < 0x800) {
                bytes.push(0xc0 | (code >> 6),
                    0x80 | (code & 0x3f));
            } else if (code < 0xd800 || code >= 0xe000) {
                bytes.push(0xe0 | (code >> 12),
                    0x80 | ((code >> 6) & 0x3f),
                    0x80 | (code & 0x3f));
            } else { // surrogate pair
                i++;
                /**
                 * UTF-16 encodes 0x10000-0x10FFFF by
                 * subtracting 0x10000 and splitting the
                 * 20 bits of 0x0-0xFFFFF into two halves
                 */
                code = 0x10000 + (((code & 0x3ff) << 10) |
                    (str.codeAt(i) & 0x3ff));
                bytes.push(0xf0 | (code >> 18),
                    0x80 | ((code >> 12) & 0x3f),
                    0x80 | ((code >> 6) & 0x3f),
                    0x80 | (code & 0x3f));
            }
        }
        return bytes;
    }

    /**
     * Convert an array of UTF-8 bytes to a string
     * @param {array} byteArray 
     * @return {string}
     */
    bytesToString(byteArray) {
        let encodedString = String.fromCharCode.apply(null, byteArray);
        let decodedString = decodeURIComponent(escape(encodedString));
        return decodedString;
    }

    /**
     * Take an array of integers calculate their CRC32 checksum, and append
     * the result to the end.
     * @param {array} bytes the array of bytes to seal with a checksum
     * @return {array} array 'wrapped' with a crc on the end as 4 bytes
     */
    wrapBytes(bytes) {
        let crc = new Crc32();
        let len = bytes.length + 8;
        let lenBytes = crc.intToBytes(len);
        let bytes2 = lenBytes.concat(bytes);
        let checksum = crc.ofBytes(bytes2);
        let checksumBytes = crc.intToBytes(checksum);
        let obytes = bytes2.concat(checksumBytes);
        return obytes;
    }

    /**
     * Convert an array of bytes to an array of bits. Bigendian.
     * The output array is 8x the size of the input, each element a 1 or 0
     * @param {array} bytes 
     * @return {array} of bits
     */
    bytesToBits(bytes) {
        let bits = [];
        let len = bytes.length;
        for (let i = 0; i < len; i++) {
            let b = bytes[i];
            bits.push((b >> 7) & 1);
            bits.push((b >> 6) & 1);
            bits.push((b >> 5) & 1);
            bits.push((b >> 4) & 1);
            bits.push((b >> 3) & 1);
            bits.push((b >> 2) & 1);
            bits.push((b >> 1) & 1);
            bits.push((b) & 1);
        }
        return bits;
    }

    /**
     * Pad an array with zeroes to that its length is a given size
     * @param {array} inbits input array of bits
     * @param {*} size the desired size,  >= the length of the array
     */
    zeroPadArray(inarr, size) {
        let arr = inarr.slice(0);
        let nrZeros = size - arr.length;
        while (nrZeros--) {
            arr.push(0);
        }
        return arr;
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
    zToBits(z) {
        return z.reduce((acc, child) => acc.concat(child), []);
    }

    /**
     * Rotate an array N places to the right
     * @param {array} arr the array of bits to rotate
     * @param {*} n the number of spaces to rotate
     */
    arrayRotate(arr, n) {
        return arr.slice(n, arr.length).concat(arr.slice(0, n));
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
     * Perform one "lambda" operation on a message and matrix row
     * @param {array[]} Hb the quasi-cyclic matrix
     * @param {array[]} zbits array of z-sized arrays of bits of message
     * @param {number} z size of each array
     * @param {number} kb width of parity bits
     * @param {number} i index of row in matrix
     */
    lambdaI(Hb, zbits, z, kb, i) {
        let p = new Array(z).fill(0);
        for (let j = 0; j < kb; j++) {
            let hij = Hb[i][j];
            if (hij >= 0) {
                let mz = zbits[j];
                for (let k = 0; k < z; k++) {
                    p = this.arrayXor(p, this.arrayRotate(mz, hij));
                }
            }
        }
        return p;
    }

    /**
     * Encode an array of bytes with the given LDPC code
     * @param bytes {array} the bytes to encode
     * @param lenStr {string} the length from the tables above
     * @param rateStr {string} the rate from the tables above
     * @return {array} the encoded bits
     */
    encode(bytes, lenStr, rateStr) {
        let code = codes[lenStr];
        let rate = code.rates[rateStr];
        let z = code.z;
        let bits = this.bytesToBits(bytes);
        let pbits = this.zeroPadArray(bits, code.length);
        let zbits = this.bitsToZ(pbits, code.z);
        let zbitsOut = zbits.slice(0);
        let Hb = rate.Z;
        let mb = zbits.length; //message length in z-blocks
        let nrParityZ = (code.length - mb * z) / z;
        let nb = Hb[0].length; // matrix width in z-blocks
        let kb = nb - mb;
        let p0 = new Array(z).fill(0);
        for (let i = 0; i < mb; i++) {
            let p = this.lambdaI(Hb, zbits, z, kb, i);
            p0 = this.arrayAdd(p0, p);
        }
        zbitsOut.push(p0);
        for (let i = 1; i < nrParityZ; i++) {
            let p = this.lambdaI(Hb, zbits, z, kb, i - 1);
            let nextp = this.arrayAdd(p, this.arrayRotate(p0, 1));
            zbitsOut.push(nextp);
        }
        let outbits = this.zToBits(zbitsOut);
        return outbits;
    }

    /**
     * Encode a string with the given LDPC code
     * @param str {string} the string to encode
     * @param lenStr {string} the length from the tables above
     * @param rateStr {string} the rate from the tables above
     * @return {array} the encoded bits
     */
    encodeString(str, lenStr, rateStr) {
        let bytes = this.stringToBytes(str);
        return this.encode(bytes, lenStr, rateStr);
    }

    /**
     * Decode an array of LDPC-encoded bits with the given LDPC code
     * @param {array} inbits array of bits
     * @param lenStr {string} the length from the tables above
     * @param rateStr {string} the rate from the tables above
     * @param {array} the output bytes
     */
    decode(inbits, lenStr, rateStr) {
        let outbytes = [];
        /**
         * Step 2 ...  ?
         */
        return outbytes;
    }

    /** 
     * Decode an array of LDPC-encoded bits with the given LDPC code
     * @param {array} inbits array of bits
     * @param lenStr {string} the length from the tables above
     * @param rateStr {string} the rate from the tables above
     * @param {string} the output string
     */
    decodeString(inbits, lenStr, rateStr) {
        let outbytes = this.decode(inbits);
        let str = this.bytesToString(outbytes);
        return str;
    }

}


module.exports = Ldpc;