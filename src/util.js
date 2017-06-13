/* jshint esversion: 6 */


/**
 * Various common utilities we needs among several modules
 */
class Util {

    /**
     * Convert a string to an array of UTF-8 bytes
     * @param {string} str 
     * @return {array} of bytes
     */
    static stringToBytes(str) {
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
    static bytesToString(byteArray) {
        let encodedString = String.fromCharCode.apply(null, byteArray);
        let decodedString = decodeURIComponent(escape(encodedString));
        return decodedString;
    }

    //#########################################################
    //# B I G   E N D I A N
    //#########################################################
    

    /**
     * Bigendian
     * @param {*} bits 
     */
    static bitsToByteBE(bits) {
        let byte =
            ((bits[0] << 7) & 128) +
            ((bits[1] << 6) & 64) +
            ((bits[2] << 5) & 32) +
            ((bits[3] << 4) & 16) +
            ((bits[4] << 3) & 8) +
            ((bits[5] << 2) & 4) +
            ((bits[6] << 1) & 2) +
            ((bits[7]) & 1);
        return byte;
    }

    /** 
     * Assumes bits length is multiple of 8
     */
    static bitsToBytesBE(bits) {
        let len = bits.length;
        let bytes = [];
        for (let i = 0; i < len; i += 8) {
            let b = [
                bits[i],
                bits[i + 1],
                bits[i + 2],
                bits[i + 3],
                bits[i + 4],
                bits[i + 5],
                bits[i + 6],
                bits[i + 7]
            ];
            let byte = this.bitsToByteBE(b);
            bytes.push(byte);
        }
        return bytes;
    }

    /**
     * Bigendian
     * @param {*} b 
     */
    static byteToBitsBE(b) {
        let bits = [];
        bits.push((b >> 7) & 1);
        bits.push((b >> 6) & 1);
        bits.push((b >> 5) & 1);
        bits.push((b >> 4) & 1);
        bits.push((b >> 3) & 1);
        bits.push((b >> 2) & 1);
        bits.push((b >> 1) & 1);
        bits.push((b) & 1);
        return bits;
    }

    /**
     * Convert an array of bytes to an array of bits. Bigendian.
     * The output array is 8x the size of the input, each element a 1 or 0
     * @param {array} bytes 
     * @return {array} of bits
     */
    static bytesToBitsBE(bytes) {
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

    //#########################################################
    //#  L I T T L E    E N D I A N
    //#########################################################
    

    /**
     * Bigendian
     * @param {*} bits 
     */
    static bitsToByteLE(bits) {
        let byte =
            ((bits[7] << 7) & 128) +
            ((bits[6] << 6) & 64) +
            ((bits[5] << 5) & 32) +
            ((bits[4] << 4) & 16) +
            ((bits[3] << 3) & 8) +
            ((bits[2] << 2) & 4) +
            ((bits[1] << 1) & 2) +
            ((bits[0]) & 1);
        return byte & 0xff;;
    }

    /** 
     * Assumes bits length is multiple of 8
     */
    static bitsToBytesLE(bits) {
        let len = bits.length;
        let bytes = [];
        for (let i = 0; i < len; i += 8) {
            let b = [
                bits[i],
                bits[i + 1],
                bits[i + 2],
                bits[i + 3],
                bits[i + 4],
                bits[i + 5],
                bits[i + 6],
                bits[i + 7]
            ];
            let byte = this.bitsToByteLE(b);
            bytes.push(byte);
        }
        return bytes;
    }

    /**
     * Convert a byte to bits in little endian order
     * @param {*} b 
     */
    static byteToBitsLE(b) {
        b &= 0xff;
        let bits = [];
        bits.push((b) & 1);
        bits.push((b >> 1) & 1);
        bits.push((b >> 2) & 1);
        bits.push((b >> 3) & 1);
        bits.push((b >> 4) & 1);
        bits.push((b >> 5) & 1);
        bits.push((b >> 6) & 1);
        bits.push((b >> 7) & 1);
        return bits;
    }

    /**
     * Convert an array of bytes to an array of bits. Bigendian.
     * The output array is 8x the size of the input, each element a 1 or 0
     * @param {array} bytes 
     * @return {array} of bits
     */
    static bytesToBitsLE(bytes) {
        let bits = [];
        let len = bytes.length;
        for (let i = 0; i < len; i++) {
            let b = bytes[i] & 255;
            bits.push((b     ) & 1);
            bits.push((b >> 1) & 1);
            bits.push((b >> 2) & 1);
            bits.push((b >> 3) & 1);
            bits.push((b >> 4) & 1);
            bits.push((b >> 5) & 1);
            bits.push((b >> 6) & 1);
            bits.push((b >> 7) & 1);
        }
        return bits;
    }

	/**
	 * Pad an array with zeroes to that its length is a given size
	 * @param {array} inbits input array of bits
	 * @param {*} size the desired size,  >= the length of the array
	 */
	static zeroPadArray(inarr, size) {
		let arr = inarr.slice(0);
		let nrZeros = Math.max(size - arr.length, 0);
		while (nrZeros--) {
			arr.push(0);
		}
		return arr;
	}


}

module.exports = Util;