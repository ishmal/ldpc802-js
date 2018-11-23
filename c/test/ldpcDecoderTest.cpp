#include <stdlib.h>
#include <stdint.h>
#include <gtest/gtest.h>

#include "ldpcEncoder.h"
#include "ldpcDecoder.h"
#include "util.h"

#include "testdata.h"

static float frand() {
	float r = ((float)rand()) / ((float)RAND_MAX);
	return r;
}

// ######################################
// # Binary
// ######################################

uint8_t *makeMessageBytes(int size) {
	uint8_t *msg = (uint8_t *)malloc(size * sizeof(uint8_t));
	for (int i = 0; i < size; i++) {
		msg[i] = (uint8_t)(frand() * 255.0);
	}
	return msg;
}

uint8_t *makeMessageBits(int len) {
	uint8_t *msg = (uint8_t *)malloc(len * sizeof(uint8_t));
	for (int i = 0; i < len; i++) {
		float toss = frand();
		msg[i] = toss > 0.5 ? 1 : 0;
	}
	return msg;
}

void addErrors(uint8_t *msg, int len, int nrBitsToFlip) {
	for (int i = 0; i < nrBitsToFlip; i++) {
		int index = (int)(frand() * len); //make sure it is an int
		msg[index] = msg[index] ^ 1;
	}
}

// ######################################
// # Float
// ######################################

float *makeSignal(uint8_t *x, int len) {
	float *msg = (float *)malloc(len * sizeof(float));
	for (int i = 0; i < len; i++) {
		msg[i] = (x[i] == 0) ? 1.0 : -1.0;
	}
	return msg;
}

void addNoise(float *message, int len, float level) {
	for (int i = 0; i < len; i++) {
		float noise = (frand() - 0.5) * level;
		message[i] = message[i] + noise;
	}
}

TEST(LdcpDecoder, should_decode_what_the_encoder_encodes) {
	LdpcEncoder *enc = ldpcEncoderCreate(&R12_648);
	LdpcDecoder *dec = ldpcDecoderCreate(&R12_648);
	uint8_t *message = makeMessageBits(324);
	uint8_t *x = ldpcEncode(enc, message, 324);
	float *signalBits = makeSignal(x, 648);
	uint8_t *result = ldpcDecode(dec, signalBits, 648, 100);
	ASSERT_NE(result, (uint8_t *)0);
	for (int i = 0; i < 324; i++) {
		int exp = message[i];
		int res = result[i];
		// printf("%d  x:%d e:%d\n", i, outBytes[i], encoded1[i]);
		ASSERT_EQ(res, exp) << "should equal output buffer";
	}
	ldpcEncoderDestroy(enc);
	ldpcDecoderDestroy(dec);
	free(signalBits);
	free(message);
}

TEST(LdcpDecoder, should_handle_errors) {
	LdpcEncoder *enc = ldpcEncoderCreate(&R12_648);
	LdpcDecoder *dec = ldpcDecoderCreate(&R12_648);
	uint8_t *message = makeMessageBits(324);
	uint8_t *x = ldpcEncode(enc, message, 324);
	addErrors(x, 648, 0);
	float *signalBits = makeSignal(x, 648);
	uint8_t *result = ldpcDecode(dec, signalBits, 648, 100);
	ASSERT_NE(result, (uint8_t *)0);
	for (int i = 0; i < 324; i++) {
		int exp = message[i];
		int res = result[i];
		// printf("%d  x:%d e:%d\n", i, outBytes[i], encoded1[i]);
		ASSERT_EQ(res, exp) << "should equal output buffer";
	}
	ldpcEncoderDestroy(enc);
	ldpcDecoderDestroy(dec);
	free(signalBits);
	free(message);
}

int main(int argc, char **argv) {
	::testing::InitGoogleTest(&argc, argv);
	return RUN_ALL_TESTS();
}
