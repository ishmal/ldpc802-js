/* jshint node: true, esversion: 6 */

/**
 * Calculates a 4-byte CRC32 of a string or byte array
 */
class Crc32 {

    constructor() {
        let crcTable = [];
        for (let n = 0; n < 256; n++) {
            let c = n;
            for (let k = 0; k < 8; k++) {
                c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
            }
            crcTable[n] = c;
        }
        this.crcTable = crcTable;
    }

    /**
     * Convert a string to an array of UTF-8 bytes
     * @param {string} str string to convert
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
     * Calculate the crc32 checksum for a string
     * @param {string} str 
     * @return the crc
     */
    ofString(str) {
        let crcTable = this.crcTable;
        let crc = 0 ^ (-1);
        let bytes = this.stringToBytes(str);
        return this.ofBytes(bytes);
    }

    /**
     * Calculate the crc32 checksum for an array of bytes
     * @param {array} array of bytes
     * @return the crc
     */
    ofBytes(bytes) {
        let crcTable = this.crcTable;
        let len = bytes.length;
        let crc = 0 ^ (-1);
        for (let i = 0; i < len; i++) {
            crc = (crc >>> 8) ^ crcTable[(crc ^ bytes[i]) & 0xff];
        }
        return (crc ^ (-1)) >>> 0;
    }

    /**
     * break a 32-bit crc into 4 bytes, so that they can be sent as payload.
     * @param {number} the crc to break apart
     * @return the 4 bytes
     */
    intToBytes(crc) {
        let bytes = [
            (crc >> 24) & 0xff,
            (crc >> 16) & 0xff,
            (crc >> 8) & 0xff,
            (crc) & 0xff,
        ];
        return bytes;
    }

}

module.exports = Crc32;