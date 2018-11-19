#include <criterion/criterion.h>
#include <stdint.h>

#include "crc32.h"


Test(crcTest,  valueIsCorrect) {
	uint8_t bytes[] = { 
		0x74, 0x68, 0x65, 0x20, 0x71, 0x75, 
		0x69, 0x63, 0x6b, 0x20, 0x62, 0x72, 
		0x6f, 0x77, 0x6e, 0x20, 0x66, 0x6f, 
		0x78 };
    uint32_t res = Crc32ofBytes(bytes, 19);
	cr_assert_eq(res, 0xdb0aca52, "crc should be equal");
}
