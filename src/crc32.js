/* jshint node: true, esversion: 6 */

function createCrcTable() {
    let table = [];
    for (let n = 0; n < 256; n++) {
        let c = n;
        for (let k = 0; k < 8; k++) {
            c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
        }
        table[n] = c;
    }
    return table;
}

const crcTable = createCrcTable();

/**
 * Calculates a 4-byte CRC32 of a string or byte array
 */
class Crc32 {

    /**
     * Convert a string to an array of UTF-8 bytes
     * @param {string} str string to convert
     * @return {array} of bytes
     */
    static stringToBytes(str) {
        let bytes = [];
        for (let i = 0, len = str.length; i < len; i++) {
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
     * @param {string} str input string
     * @return {number} the crc
     */
    static ofString(str) {
        let bytes = this.stringToBytes(str);
        return this.ofBytes(bytes);
    }

    /**
     * Calculate the crc32 checksum for an array of bytes
     * @param {array} bytes array of bytes
     * @return {number} the crc
     */
    static ofBytes(bytes) {
        let crc = 0 ^ (-1);
        for (let byte of bytes) {
            crc = (crc >>> 8) ^ crcTable[(crc ^ byte) & 0xff];
        }
        return (crc ^ (-1)) >>> 0;
    }

    /**
     * break a 32-bit crc into 4 bytes, so that they can be sent as payload.
     * @param {number} the crc to break apart
     * @return {array} the 4 bytes
     */
    static intToBytes(crc) {
        let bytes = [
            (crc >> 24) & 0xff,
            (crc >> 16) & 0xff,
            (crc >> 8) & 0xff,
            (crc) & 0xff
        ];
        return bytes;
    }

}

module.exports = Crc32;