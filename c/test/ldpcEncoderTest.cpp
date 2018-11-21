#include <stdlib.h>
#include <stdint.h>
#include <gtest/gtest.h>

#include "ldpcEncoder.h"
#include "util.h"

#include "testdata.h"



/**
 * Test that encoding "shortened1" becomes "encoded1"
 */
TEST(LdpcEncoderTest, CorrectValue) {
	LdpcEncoder *enc = ldpcEncoderCreate(&R34_1944);
	uint8_t *x = ldpcEncodeBytes(enc, shortened1, 183);
	uint8_t *outBytes = (uint8_t *) malloc(243 * sizeof(uint8_t));
	bitsToBytesBE(outBytes, x, 1944);
	for (int i=0; i < 243; i++) {
		int exp = encoded1[i];
		int res = outBytes[i];
		// printf("%d  x:%d e:%d\n", i, outBytes[i], encoded1[i]);
		ASSERT_EQ(res, exp) << "should equal output buffer";
	}
	ldpcEncoderDestroy(enc);
	free(outBytes);
}


int main(int argc, char **argv) {
  ::testing::InitGoogleTest(&argc, argv);
  return RUN_ALL_TESTS();
}

