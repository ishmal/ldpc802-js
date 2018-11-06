#include <stdlib.h>
#include <stdint.h>
#include <gtest/gtest.h>

#include "crc32.h"

// Tests that the Foo::Bar() method does Abc.
TEST(Crc32Test, CorrectValue) {
	const char *str = "The quick brown fox jumps over the lazy dog";
	int len = strlen(str);
	uint8_t * bytes = (uint8_t *) str;
    uint32_t res = Crc32ofBytes(bytes, len);
	ASSERT_EQ(res, 0x414fa339) << "crc should be equal";
}


int main(int argc, char **argv) {
  ::testing::InitGoogleTest(&argc, argv);
  return RUN_ALL_TESTS();
}

