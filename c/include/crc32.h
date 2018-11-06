#ifndef __CRC32_H__
#define __CRC32_H__

#include <stdint.h>

/**
 * Calculate the crc32 checksum for an array of bytes
 * @param {ubyte *} bytes array of bytes
 * @param {int} len number of bytes in array
 * @return {uint32_t} the crc
 */
uint32_t Crc32ofBytes(uint8_t* bytes, int len);


#endif /*__CRC32_H__*/

