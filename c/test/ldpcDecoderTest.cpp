#include <stdlib.h>
#include <stdint.h>
#include <gtest/gtest.h>

#include "ldpcEncoder.h"
#include "ldpcDecoder.h"
#include "util.h"

#include "testdata.h"

// ######################################
// # Binary 
// ######################################

uint8_t *makeMessage(int size) {
	uint8_t *msg = (uint8_t *) malloc(size * sizeof(uint8_t));
	for (int i = 0 ; i < size ; i++) {
		float toss = frand();
		msg[i] = toss > 0.5 ? 1 : 0;
	}
	return msg;
}

void addErrors(uint8_t *msg, int len, int nrBitsToFlip) {
	for (let i = 0; i < nrBitsToFlip; i++) {
		int index = (int)(frand() * len); //make sure it is an int
		msg[index] = msg[index] ^ 1;
	}
}


// ######################################
// # Float
// ######################################

float *makeSignal(uint8_t *x, int len) {
	float *msg = (float *) malloc(size * sizeof(float));
	for (int i = 0; i < len; i++) {
		msg[i] = (x[i] == 0) ? 1.0 : -1.0;
	}
	return msg;
}

void addNoise(float *message, int len, float level) {
	for (let i = 0; i < len; i++) {
		float noise = (frand() - 0.5) * level;
		message[i] = message[i] + noise;
	}
}

	
TEST(LdcpDecoder, should_decode_what_the_encoder_encodes) {
	LdpcEncoder *enc = ldpcEncoderCreate(&R12_648);
	LdpcDecoder *dec = ldpcDecoderCreate(&R12_648);
	uint8_t *codeword = ldpcEncodeBytes(enc, shortened1, 183);
	float message = makeMessage()
	uint8_t *decoded = ldpcDecodeBytes(enc)
	const code = table.codes["1/2"]["648"];
	const msg = makeMessage(code.messageBits);
	const enc = new LdpcEncoder(code);
	const codeword = enc.encode(msg);
	expect(codeword.length).toEqual(code.N);
	const dec = new LdpcDecoder(code);
	const signal = makeSignal(codeword);
	const res = dec.decode(signal);
	expect(res).toEqual(msg);
	ldpcEncoderDestroy(enc);
	ldpcDecoderDestroy(dec);
}

TEST(LdcpDecoder, should_decode_with_noise_added) {
	const table = new CodeTable();
	const code = table.codes["1/2"]["648"];
	const msg = makeMessage(code.messageBits);
	const enc = new LdpcEncoder(code);
	const codeword = enc.encode(msg);
	expect(codeword.length).toEqual(code.N);
	const signal = makeSignal(codeword);
	const received = addNoise(signal, 0.1);
	const dec = new LdpcDecoder(code);
	const res = dec.decode(received);
	expect(res).toEqual(msg);
}

TEST(LdcpDecoder, should decode with errors added) {
	const table = new CodeTable();
	const code = table.codes["1/2"]["648"];
	const msg = makeMessage(code.messageBits);
	const enc = new LdpcEncoder(code);
	const codeword = enc.encode(msg);
	expect(codeword.length).toEqual(code.N);
	const withErrors = addErrors(codeword, 8);
	const signal = makeSignal(withErrors);
	const received = addNoise(signal, 0.1);
	const dec = new LdpcDecoder(code);
	const res = dec.decode(received);
	expect(res).toEqual(msg);
}



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

