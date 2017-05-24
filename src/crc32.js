/* jshint node: true, esnext: true */

/**
 * Calculates a 4-byte CRC32 of a string or byte array
 */
class Crc32 {

    /**
    crcTable: number[];
    */

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

    ofString(str) {
        let crcTable = this.crcTable;
        let len = str.length;
        let crc = 0 ^ (-1);

        for (let i = 0; i < len; i++) {
            crc = (crc >>> 8) ^ crcTable[(crc ^ str.charCodeAt(i)) & 0xff];
        }

        return (crc ^ (-1)) >>> 0;
    }

    ofBytes(bytes) {
        let crcTable = this.crcTable;
        let len = bytes.length;
        let crc = 0 ^ (-1);

        for (let i = 0; i < len; i++) {
            crc = (crc >>> 8) ^ crcTable[(crc ^ bytes[i]) & 0xff];
        }

        return (crc ^ (-1)) >>> 0;
    }

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