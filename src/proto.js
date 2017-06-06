const Ldpc = require("./ldpc");
const Util = require("./util");
const Crc32 = require("{./crc32");


class Proto {

	constructor() {
		this.scrambleBits = [];
        this.scrambleIdx = 0;
		this.generateScrambler(0xff);
	}

	generateScrambler(initial) {
		let x = Util.byteToBits(initial).slice(1).reverse();
		let arr = [];
		for (let i = 0; i < 127; i++) {
			let x7 = x[0];
			let x4 = x[3];
			let out = x7 ^ x4;
			x.shift();
			x.push(out);
			arr.push(out);
		}
		this.scrambleBits = arr;
		this.scrambleIdx = 0;
		return arr;
	}

	nextScrambleBit() {
		let idx = this.scrambleIdx;
		let b = this.scrambleBits[idx++];
		this.scrambleIdx = idx % 127;
		return b;
	}

	/**
	 * Take an array of integers calculate their CRC32 checksum, and append
	 * the result to the end.
	 * @param {array} bytes the array of bytes to seal with a checksum
	 * @return {array} array 'wrapped' with a crc on the end as 4 bytes
	 */
	wrapBytes(bytes) {
		let checksum = Crc32.ofBytes(bytes);
		let checksumBytes = Crc32.intToBytes(checksum);
		let obytes = bytes.concat(checksumBytes);
		return obytes;
	}

	scrambleByte(byte) {
		let bits = Util.byteToBits(byte);
		let b = [];
		let b0 = this.nextScrambleBit();
		let b1 = this.nextScrambleBit();
		let b2 = this.nextScrambleBit();
		let b3 = this.nextScrambleBit();
		let b4 = this.nextScrambleBit();
		let b5 = this.nextScrambleBit();
		let b6 = this.nextScrambleBit();
		let b7 = this.nextScrambleBit();
		b[0] = bits[7] ^ b0;
		b[1] = bits[6] ^ b1;
		b[2] = bits[5] ^ b2;
		b[3] = bits[4] ^ b3;
		b[4] = bits[3] ^ b4;
		b[5] = bits[2] ^ b5;
		b[6] = bits[1] ^ b6;
		b[7] = bits[0] ^ b7;
		let obyte = Util.bitsToByte(b);
		return obyte;
	}

	/**
	 * Scramble the bits in an array of bytes
	 * @param {array} bytes 
	 * @return a scrambled copy of the array
	 */
	scrambleBytes(bytes) {
		let arr = [];
		for (let i = 0, len = bytes.length; i < len; i++) {
			let inb = bytes[i];
			let b = this.scrambleByte(inb);
			arr[i] = b;
		}
		return arr;
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
     * Encode an array of bytes with the given LDPC code
     * TODO: select a length according to the length of the byte array
     * @param bytes {array} the bytes to encode
     * @param rateStr {string} the rate from the tables above
     * @param lengthStr {string} the length from the tables above
     * @return {array} the encoded bits
     */
    encode(bytes, rateStr, lengthStr) {
        let rate = codes[rateStr];
        let length = rate.lengths[lengthStr];
        let z = length.z;
        let bits = Util.bytesToBits(bytes);
        let pbits = this.zeroPadArray(bits, length.length);
        let zbits = this.bitsToZ(pbits, z);
        let zbitsOut = zbits.slice(0);
        let Hb = length.Z;
        let mb = zbits.length; //message length in z-blocks
        let nrParityZ = (length.length - mb * z) / z;
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


module.exports = Proto;