

const fullText =
  "Joy, bright spark of divinity,\n" +
  "Daughter of Elysium,\n" +
  "Fire-insired we tread\n" +
  "Thy sanctuary.\n" +
  "Thy magic power re-unites\n" +
  "All that custom has divided,\n" +
  "All men become brothers\n" +
  "Under the sway of thy gentle wings.";

//#################################################################
//# E X A M P L E 1
//#################################################################
/* beautify preserve:start */

const inputMessage1 = [];
for (let i = 0; i < 72 ; i++) {
	inputMessage1[i] = fullText.charCodeAt(i);
}

const inputMac1 = [
      0x04, 0x02, 0x00, 0x2e, 0x00,
      0x60, 0x08, 0xcd, 0x37, 0xa6,
      0x00, 0x20, 0xd6, 0x01, 0x3c,
      0xf1, 0x00, 0x60, 0x08, 0xad,
      0x3b, 0xaf, 0x00, 0x00
    ];

/**
 * The message is converted to ASCII; then it is prepended
 * with an appropriate MAC header, and a CRC32 is
 * added. The resulting 100 octets PSDU is shown in Table G.33.
 */
const inputBytes1 = [
    /*  1....5 */
    0x04, 0x02, 0x00, 0x2E, 0x00,
    /*  6...10 */
    0x60, 0x08, 0xCD, 0x37, 0xA6,
    /* 11...15 */
    0x00, 0x20, 0xD6, 0x01, 0x3C,
    /* 16...20 */
    0xF1, 0x00, 0x60, 0x08, 0xAD,
    /* 21...25 */
    0x3B, 0xAF, 0x00, 0x00, 0x4A,
    /* 26...30 */
    0x6F, 0x79, 0x2C, 0x20, 0x62,
    /* 31...35 */
    0x72, 0x69, 0x67, 0x68, 0x74,
    /* 36...40 */
    0x20, 0x73, 0x70, 0x61, 0x72,
    /* 41...45 */
    0x6B, 0x20, 0x6F, 0x66, 0x20,
    /* 46...50 */
    0x64, 0x69, 0x76, 0x69, 0x6E,
    /* 51...55 */
    0x69, 0x74, 0x79, 0x2C, 0x0A,
    /* 56...60 */
    0x44, 0x61, 0x75, 0x67, 0x68,
    /* 61...65 */
    0x74, 0x65, 0x72, 0x20, 0x6F,
    /* 66...70 */
    0x66, 0x20, 0x45, 0x6C, 0x79,
    /* 71...75 */
    0x73, 0x69, 0x75, 0x6D, 0x2C,
    /* 76...80 */
    0x0A, 0x46, 0x69, 0x72, 0x65,
    /* 81...85 */
    0x2D, 0x69, 0x6E, 0x73, 0x69,
    /* 86...90 */
    0x72, 0x65, 0x64, 0x20, 0x77,
    /* 91...95 */
    0x65, 0x20, 0x74, 0x72, 0x65,
    /* 96..100 */
    0x61, 0x67, 0x33, 0x21, 0xB6
  ];

const TXVECTOR1 = {
  fec_coding: 1,   // LDPC
  ch_bandwidth: 0, //HT_CBW20 - 20mhz
  mcs: 4,  // QAM16, rate 3/4 
  r: "3/4",
  length: 100,
  stbc: 0
};

const scrambleBits = [
   0,0,0,0,1,1,1,0, 1,1,1,1,0,0,1,0, 1,1,0,0,1,0,0,1, 0,0,0,0,0,0,1,0,
   0,0,1,0,0,1,1,0, 0,0,1,0,1,1,1,0, 1,0,1,1,0,1,1,0, 0,0,0,0,1,1,0,0,
   1,1,0,1,0,1,0,0, 1,1,1,0,0,1,1,1, 1,0,1,1,0,1,0,0, 0,0,1,0,1,0,1,0,
   1,1,1,1,1,0,1,0, 0,1,0,1,0,0,0,1, 1,0,1,1,1,0,0,0, 1,1,1,1,1,1,1
];

/**
 * The transmitted message shown in Table G.33 contains 100 octets,
 * or equivalently, 800 bits. The bits are prepended by the 16
 * SERVICE field bits (bits 0–15 in Table G.34), as defined in 20.3.11.1,
 * but tail bits and padding bits are not appended as in the BCC example.
 * The resulting 816 bits are shown in Table G.34.
 */
const servicePrepended1 = [
  // bit#    7-0      15-8     23-16      hex    hex   hex
  /* 000–023 00000000 00000000 00000100 */ 0x00, 0x00, 0x04,
  /* 024–047 00000010 00000000 00101110 */ 0x02, 0x00, 0x2E,
  /* 048–071 00000000 01100000 00001000 */ 0x00, 0x60, 0x08,
  /* 072–095 11001101 00110111 10100110 */ 0xCD, 0x37, 0xA6,
  /* 096–119 00000000 00100000 11010110 */ 0x00, 0x20, 0xD6,
  /* 120–143 00000001 00111100 11110001 */ 0x01, 0x3C, 0xF1,
  /* 144–167 00000000 01100000 00001000 */ 0x00, 0x60, 0x08,
  /* 168–191 10101101 00111011 10101111 */ 0xAD, 0x3B, 0xAF,
  /* 192–215 00000000 00000000 01001010 */ 0x00, 0x00, 0x4A,
  /* 216–239 01101111 01111001 00101100 */ 0x6F, 0x79, 0x2C,
  /* 240–263 00100000 01100010 01110010 */ 0x20, 0x62, 0x72,
  /* 264–287 01101001 01100111 01101000 */ 0x69, 0x67, 0x68,
  /* 288–311 01110100 00100000 01110011 */ 0x74, 0x20, 0x73,
  /* 312–335 01110000 01100001 01110010 */ 0x70, 0x61, 0x72,
  /* 336–359 01101011 00100000 01101111 */ 0x6B, 0x20, 0x6F,
  /* 360–383 01100110 00100000 01100100 */ 0x66, 0x20, 0x64,
  /* 384–407 01101001 01110110 01101001 */ 0x69, 0x76, 0x69,
  /* 408–431 01101110 01101001 01110100 */ 0x6E, 0x69, 0x74,
  /* 432–455 01111001 00101100 00001010 */ 0x79, 0x2C, 0x0A,
  /* 456–479 01000100 01100001 01110101 */ 0x44, 0x61, 0x75,
  /* 480–503 01100111 01101000 01110100 */ 0x67, 0x68, 0x74,
  /* 504–527 01100101 01110010 00100000 */ 0x65, 0x72, 0x20,
  /* 528–551 01101111 01100110 00100000 */ 0x6F, 0x66, 0x20,
  /* 552–575 01000101 01101100 01111001 */ 0x45, 0x6C, 0x79,
  /* 576–599 01110011 01101001 01110101 */ 0x73, 0x69, 0x75,
  /* 600–623 01101101 00101100 00001010 */ 0x6D, 0x2C, 0x0A,
  /* 624–647 01000110 01101001 01110010 */ 0x46, 0x69, 0x72,
  /* 648–671 01100101 00101101 01101001 */ 0x65, 0x2D, 0x69,
  /* 672–695 01101110 01110011 01101001 */ 0x6E, 0x73, 0x69,
  /* 696–719 01110010 01100101 01100100 */ 0x72, 0x65, 0x64,
  /* 720–743 00100000 01110111 01100101 */ 0x20, 0x77, 0x65,
  /* 744–767 00100000 01110100 01110010 */ 0x20, 0x74, 0x72,
  /* 768–791 01100101 01100001 01100111 */ 0x65, 0x61, 0x67,
  /* 792–815 00110011 00100001 10110110 */ 0x33, 0x21, 0xB6,
];

/**
 * The 816 bits are scrambled by the scrambler defined in 17.3.5.4.
 * The initial state of the scrambler is the state 1011101 binary
 * (0x5D hexadecimal). The scrambled sequence is given in Table G.35.
 * 
 * NOTE—The scrambled entries for the correct CRC32 value are given in bits 784–815.
 */
const scrambled1 = [
  // bit#    0-7      8-15     16-23       hex   hex   hex
  /* 000–023 01101100 00011001 10001001 */ 0x6C, 0x19, 0x89,
  /* 024–047 10001111 01101000 00100001 */ 0x8F, 0x68, 0x21,
  /* 048–071 11110100 10100101 01100001 */ 0xF4, 0xA5, 0x61,
  /* 072–095 01001111 11010111 10101110 */ 0x4F, 0xD7, 0xAE,
  /* 096–119 00100100 00001100 11110011 */ 0x24, 0x0C, 0xF3,
  /* 120–143 00111010 11100100 10111100 */ 0x3A, 0xE4, 0xBC,
  /* 144–167 01010011 10011000 11000000 */ 0x53, 0x98, 0xC0,
  /* 168–191 00011110 00110101 10110011 */ 0x1E, 0x35, 0xB3,
  /* 192–215 11100011 11111000 00100101 */ 0xE3, 0xF8, 0x25,
  /* 216–239 01100000 11010110 00100101 */ 0x60, 0xD6, 0x25,
  /* 240–263 00110101 00110011 11111110 */ 0x35, 0x33, 0xFE,
  /* 264–287 11110000 01000001 00101011 */ 0xF0, 0x41, 0x2B,
  /* 288–311 10001111 01010011 00011100 */ 0x8F, 0x53, 0x1C,
  /* 312–335 10000011 01000001 10111110 */ 0x83, 0x41, 0xBE,
  /* 336–359 00111001 00101000 01100110 */ 0x39, 0x28, 0x66,
  /* 360–383 01000100 01100110 11001101 */ 0x44, 0x66, 0xCD,
  /* 384–407 11110110 10100011 11011000 */ 0xF6, 0xA3, 0xD8,
  /* 408–431 00001101 11010100 10000001 */ 0x0D, 0xD4, 0x81,
  /* 432–455 00111011 00101111 11011111 */ 0x3B, 0x2F, 0xDF,
  /* 456–479 11000011 01011000 11110111 */ 0xC3, 0x58, 0xF7,
  /* 480–503 11000110 01010010 11101011 */ 0xC6, 0x52, 0xEB,
  /* 504–527 01110000 10001111 10011110 */ 0x70, 0x8F, 0x9E,
  /* 528–551 01101010 10010000 10000001 */ 0x6A, 0x90, 0x81,
  /* 552–575 11111101 01111100 10101001 */ 0xFD, 0x7C, 0xA9,
  /* 576–599 11010001 01010101 00010010 */ 0xD1, 0x55, 0x12,
  /* 600–623 00000100 01110100 11011001 */ 0x04, 0x74, 0xD9,
  /* 624–647 11101001 00111011 11001101 */ 0xE9, 0x3B, 0xCD,
  /* 648–671 10010011 10001101 01111011 */ 0x93, 0x8D, 0x7B,
  /* 672–695 01111100 01110000 00000010 */ 0x7C, 0x70, 0x02,
  /* 696–719 00100000 10011001 10100001 */ 0x20, 0x99, 0xA1,
  /* 720–743 01111101 10001010 00100111 */ 0x7D, 0x8A, 0x27,
  /* 744–767 00010111 00111001 00010101 */ 0x17, 0x39, 0x15,
  /* 768–791 10100000 11101100 10010101 */ 0xA0, 0xEC, 0x95,
  /* 792–815 00010110 10010001 00010000 */ 0x16, 0x91, 0x10
];

/** 
 * from the input TXVECTOR parameters:
 * — NCW = 1 (number of codewords)
 * — LLDPC = 1944 (size of codeword)
 * — NCBPS = 208 (number of coded bits per symbol)
 * — Navbits = 1248 (number of available bits)
 * — Nshrt = 642 (number of bits to be shortened)
 * — Npunc = 54 (number of bits to be punctured)
 * — NSYM = 6 (number of OFDM symbols)
 * — Nrep = 0 (number of bits to be repeated)
 * The results of applying shortening bits, as prescribed in
 * paragraph (c) of 20.3.11.6.5, is given in Table G.36.
 * NOTE—Nshrt = 642 shortening bits have been inserted
 * as zeros in bits 816–1457.
 */
const shortened1 = [
  //  bit#      0-7      8-15     16-23       hex   hex   hex
  /*  0000–0023 01101100 00011001 10001001 */ 0x6C, 0x19, 0x89,
  /*  0024–0047 10001111 01101000 00100001 */ 0x8F, 0x68, 0x21,
  /*  0048–0071 11110100 10100101 01100001 */ 0xF4, 0xA5, 0x61,
  /*  0072–0095 01001111 11010111 10101110 */ 0x4F, 0xD7, 0xAE,
  /*  0096–0119 00100100 00001100 11110011 */ 0x24, 0x0C, 0xF3,
  /*  0120–0143 00111010 11100100 10111100 */ 0x3A, 0xE4, 0xBC,
  /*  0144–0167 01010011 10011000 11000000 */ 0x53, 0x98, 0xC0,
  /*  0168–0191 00011110 00110101 10110011 */ 0x1E, 0x35, 0xB3,
  /*  0192–0215 11100011 11111000 00100101 */ 0xE3, 0xF8, 0x25,
  /*  0216–0239 01100000 11010110 00100101 */ 0x60, 0xD6, 0x25,
  /*  0240–0263 00110101 00110011 11111110 */ 0x35, 0x33, 0xFE,
  /*  0264–0287 11110000 01000001 00101011 */ 0xF0, 0x41, 0x2B,
  /*  0288–0311 10001111 01010011 00011100 */ 0x8F, 0x53, 0x1C,
  /*  0312–0335 10000011 01000001 10111110 */ 0x83, 0x41, 0xBE,
  /*  0336–0359 00111001 00101000 01100110 */ 0x39, 0x28, 0x66,
  /*  0360–0383 01000100 01100110 11001101 */ 0x44, 0x66, 0xCD,
  /*  0384–0407 11110110 10100011 11011000 */ 0xF6, 0xA3, 0xD8,
  /*  0408–0431 00001101 11010100 10000001 */ 0x0D, 0xD4, 0x81,
  /*  0432–0455 00111011 00101111 11011111 */ 0x3B, 0x2F, 0xDF,
  /*  0456–0479 11000011 01011000 11110111 */ 0xC3, 0x58, 0xF7,
  /*  0480–0503 11000110 01010010 11101011 */ 0xC6, 0x52, 0xEB,
  /*  0504–0527 01110000 10001111 10011110 */ 0x70, 0x8F, 0x9E,
  /*  0528–0551 01101010 10010000 10000001 */ 0x6A, 0x90, 0x81,
  /*  0552–0575 11111101 01111100 10101001 */ 0xFD, 0x7C, 0xA9,
  /*  0576–0599 11010001 01010101 00010010 */ 0xD1, 0x55, 0x12,
  /*  0600–0623 00000100 01110100 11011001 */ 0x04, 0x74, 0xD9,
  /*  0624–0647 11101001 00111011 11001101 */ 0xE9, 0x3B, 0xCD,
  /*  0648–0671 10010011 10001101 01111011 */ 0x93, 0x8D, 0x7B,
  /*  0672–0695 01111100 01110000 00000010 */ 0x7C, 0x70, 0x02,
  /*  0696–0719 00100000 10011001 10100001 */ 0x20, 0x99, 0xA1,
  /*  0720–0743 01111101 10001010 00100111 */ 0x7D, 0x8A, 0x27,
  /*  0744–0767 00010111 00111001 00010101 */ 0x17, 0x39, 0x15,
  /*  0768–0791 10100000 11101100 10010101 */ 0xA0, 0xEC, 0x95,
  /*  0792–0815 00010110 10010001 00010000 */ 0x16, 0x91, 0x10,
  /*  0816–0839 00000000 00000000 00000000 */ 0x00, 0x00, 0x00,
  /*  0840–0863 00000000 00000000 00000000 */ 0x00, 0x00, 0x00,
  /*  0864–0887 00000000 00000000 00000000 */ 0x00, 0x00, 0x00,
  /*  0888–0911 00000000 00000000 00000000 */ 0x00, 0x00, 0x00,
  /*  0912–0935 00000000 00000000 00000000 */ 0x00, 0x00, 0x00,
  /*  0936–0959 00000000 00000000 00000000 */ 0x00, 0x00, 0x00,
  /*  0960–0983 00000000 00000000 00000000 */ 0x00, 0x00, 0x00,
  /*  0984–1007 00000000 00000000 00000000 */ 0x00, 0x00, 0x00,
  /*  1008–1031 00000000 00000000 00000000 */ 0x00, 0x00, 0x00,
  /*  1032–1055 00000000 00000000 00000000 */ 0x00, 0x00, 0x00,
  /*  1056–1079 00000000 00000000 00000000 */ 0x00, 0x00, 0x00,
  /*  1080–1103 00000000 00000000 00000000 */ 0x00, 0x00, 0x00,
  /*  1104–1127 00000000 00000000 00000000 */ 0x00, 0x00, 0x00,
  /*  1128–1151 00000000 00000000 00000000 */ 0x00, 0x00, 0x00,
  /*  1152–1175 00000000 00000000 00000000 */ 0x00, 0x00, 0x00,
  /*  1176–1199 00000000 00000000 00000000 */ 0x00, 0x00, 0x00,
  /*  1200–1223 00000000 00000000 00000000 */ 0x00, 0x00, 0x00,
  /*  1224–1247 00000000 00000000 00000000 */ 0x00, 0x00, 0x00,
  /*  1248–1271 00000000 00000000 00000000 */ 0x00, 0x00, 0x00,
  /*  1272–1295 00000000 00000000 00000000 */ 0x00, 0x00, 0x00,
  /*  1296–1319 00000000 00000000 00000000 */ 0x00, 0x00, 0x00,
  /*  1320–1343 00000000 00000000 00000000 */ 0x00, 0x00, 0x00,
  /*  1344–1367 00000000 00000000 00000000 */ 0x00, 0x00, 0x00,
  /*  1368–1391 00000000 00000000 00000000 */ 0x00, 0x00, 0x00,
  /*  1392–1415 00000000 00000000 00000000 */ 0x00, 0x00, 0x00,
  /*  1416–1439 00000000 00000000 00000000 */ 0x00, 0x00, 0x00,
  /*  1440–1457 00000000 00000000 00------ */ 0x00, 0x00, 0x00   //last is 0x0-
];

/**
 * The DATA with shortening bits are LDPC encoded as a 
 * single (NCW = 1) codeword (LLDPC = 1944; R = 3/4) as
 * prescribed by paragraph (c) of 20.3.11.6.5. The results
 * are given in Table G.37.
 * 
 * NOTE—The LDPC encoder appends 486 bits (i.e., bits 1458–1943) 
 * after the shortening bits.
 */
const encoded1 = [
  // bit#      7-0      15-8     23-16      hex    hex   hex
  /* 0000–0023 01101100 00011001 10001001 */ 0x6C, 0x19, 0x89,
  /* 0024–0047 10001111 01101000 00100001 */ 0x8F, 0x68, 0x21,
  /* 0048–0071 11110100 10100101 01100001 */ 0xF4, 0xA5, 0x61,
  /* 0072–0095 01001111 11010111 10101110 */ 0x4F, 0xD7, 0xAE,
  /* 0096–0119 00100100 00001100 11110011 */ 0x24, 0x0C, 0xF3,
  /* 0120–0143 00111010 11100100 10111100 */ 0x3A, 0xE4, 0xBC,
  /* 0144–0167 01010011 10011000 11000000 */ 0x53, 0x98, 0xC0,
  /* 0168–0191 00011110 00110101 10110011 */ 0x1E, 0x35, 0xB3,
  /* 0192–0215 11100011 11111000 00100101 */ 0xE3, 0xF8, 0x25,
  /* 0216–0239 01100000 11010110 00100101 */ 0x60, 0xD6, 0x25,
  /* 0240–0263 00110101 00110011 11111110 */ 0x35, 0x33, 0xFE,
  /* 0264–0287 11110000 01000001 00101011 */ 0xF0, 0x41, 0x2B,
  /* 0288–0311 10001111 01010011 00011100 */ 0x8F, 0x53, 0x1C,
  /* 0312–0335 10000011 01000001 10111110 */ 0x83, 0x41, 0xBE,
  /* 0336–0359 00111001 00101000 01100110 */ 0x39, 0x28, 0x66,
  /* 0360–0383 01000100 01100110 11001101 */ 0x44, 0x66, 0xCD,
  /* 0384–0407 11110110 10100011 11011000 */ 0xF6, 0xA3, 0xD8,
  /* 0408–0431 00001101 11010100 10000001 */ 0x0D, 0xD4, 0x81,
  /* 0432–0455 00111011 00101111 11011111 */ 0x3B, 0x2F, 0xDF,
  /* 0456–0479 11000011 01011000 11110111 */ 0xC3, 0x58, 0xF7,
  /* 0480–0503 11000110 01010010 11101011 */ 0xC6, 0x52, 0xEB,
  /* 0504–0527 01110000 10001111 10011110 */ 0x70, 0x8F, 0x9E,
  /* 0528–0551 01101010 10010000 10000001 */ 0x6A, 0x90, 0x81,
  /* 0552–0575 11111101 01111100 10101001 */ 0xFD, 0x7C, 0xA9,
  /* 0576–0599 11010001 01010101 00010010 */ 0xD1, 0x55, 0x12,
  /* 0600–0623 00000100 01110100 11011001 */ 0x04, 0x74, 0xD9,
  /* 0624–0647 11101001 00111011 11001101 */ 0xE9, 0x3B, 0xCD,
  /* 0648–0671 10010011 10001101 01111011 */ 0x93, 0x8D, 0x7B,
  /* 0672–0695 01111100 01110000 00000010 */ 0x7C, 0x70, 0x02,
  /* 0696–0719 00100000 10011001 10100001 */ 0x20, 0x99, 0xA1,
  /* 0720–0743 01111101 10001010 00100111 */ 0x7D, 0x8A, 0x27,
  /* 0744–0767 00010111 00111001 00010101 */ 0x17, 0x39, 0x15,
  /* 0768–0791 10100000 11101100 10010101 */ 0xA0, 0xEC, 0x95,
  /* 0792–0815 00010110 10010001 00010000 */ 0x16, 0x91, 0x10,
  /* 0816–0839 00000000 00000000 00000000 */ 0x00, 0x00, 0x00,
  /* 0840–0863 00000000 00000000 00000000 */ 0x00, 0x00, 0x00,
  /* 0864–0887 00000000 00000000 00000000 */ 0x00, 0x00, 0x00,
  /* 0888–0911 00000000 00000000 00000000 */ 0x00, 0x00, 0x00,
  /* 0912–0935 00000000 00000000 00000000 */ 0x00, 0x00, 0x00,
  /* 0936–0959 00000000 00000000 00000000 */ 0x00, 0x00, 0x00,
  /* 0960–0983 00000000 00000000 00000000 */ 0x00, 0x00, 0x00,
  /* 0984–1007 00000000 00000000 00000000 */ 0x00, 0x00, 0x00,
  /* 1008–1031 00000000 00000000 00000000 */ 0x00, 0x00, 0x00,
  /* 1032–1055 00000000 00000000 00000000 */ 0x00, 0x00, 0x00,
  /* 1056–1079 00000000 00000000 00000000 */ 0x00, 0x00, 0x00,
  /* 1080–1103 00000000 00000000 00000000 */ 0x00, 0x00, 0x00,
  /* 1104–1127 00000000 00000000 00000000 */ 0x00, 0x00, 0x00,
  /* 1128–1151 00000000 00000000 00000000 */ 0x00, 0x00, 0x00,
  /* 1152–1175 00000000 00000000 00000000 */ 0x00, 0x00, 0x00,
  /* 1176–1199 00000000 00000000 00000000 */ 0x00, 0x00, 0x00,
  /* 1200–1223 00000000 00000000 00000000 */ 0x00, 0x00, 0x00,
  /* 1224–1247 00000000 00000000 00000000 */ 0x00, 0x00, 0x00,
  /* 1248–1271 00000000 00000000 00000000 */ 0x00, 0x00, 0x00,
  /* 1272–1295 00000000 00000000 00000000 */ 0x00, 0x00, 0x00,
  /* 1296–1319 00000000 00000000 00000000 */ 0x00, 0x00, 0x00,
  /* 1320–1343 00000000 00000000 00000000 */ 0x00, 0x00, 0x00,
  /* 1344–1367 00000000 00000000 00000000 */ 0x00, 0x00, 0x00,
  /* 1368–1391 00000000 00000000 00000000 */ 0x00, 0x00, 0x00,
  /* 1392–1415 00000000 00000000 00000000 */ 0x00, 0x00, 0x00,
  /* 1416–1439 00000000 00000000 00000000 */ 0x00, 0x00, 0x00,
  /* 1440–1463 00000000 00000000 00100110 */ 0x00, 0x00, 0x26,
  /* 1464–1487 00111101 10101001 10011100 */ 0x3D, 0xA9, 0x9C,
  /* 1488–1511 01000000 11010111 10110010 */ 0x40, 0xD7, 0xB2,
  /* 1512–1535 10000110 11100011 10111111 */ 0x86, 0xE3, 0xBF,
  /* 1536–1559 01000011 10100101 11011001 */ 0x43, 0xA5, 0xD9,
  /* 1560–1583 00001101 00000110 11010110 */ 0x0D, 0x06, 0xD6,
  /* 1584–1607 01100000 11110100 00011111 */ 0x60, 0xF4, 0x1F,
  /* 1608–1631 00110001 00001100 00010011 */ 0x31, 0x0C, 0x13,
  /* 1632–1655 01110110 00001111 10011111 */ 0x76, 0x0F, 0x9F,
  /* 1656–1679 11011010 10011111 10101001 */ 0xDA, 0x9F, 0xA9,
  /* 1680–1703 01110100 01011001 11011100 */ 0x74, 0x59, 0xDC,
  /* 1704–1727 10001001 11110010 11100010 */ 0x89, 0xF2, 0xE2,
  /* 1728–1751 11011000 01101000 10100001 */ 0xD8, 0x68, 0xA1,
  /* 1752–1775 01100011 00011101 10100101 */ 0x63, 0x1D, 0xA5,
  /* 1776–1799 10100110 10000000 11010001 */ 0xA6, 0x80, 0xD1,
  /* 1800–1823 10001001 01010111 11011100 */ 0x89, 0x57, 0xDC,
  /* 1824–1847 10110011 01011101 00110011 */ 0xB3, 0x5D, 0x33,
  /* 1848–1871 01110000 11011100 10110010 */ 0x70, 0xDC, 0xB2,
  /* 1872–1895 11110110 00111001 00111101 */ 0xF6, 0x39, 0x3D,
  /* 1896–1919 00100011 10011011 00110110 */ 0x23, 0x9B, 0x36,
  /* 1920–1943 00111110 00010101 00010001 */ 0x3E, 0x15, 0x11
];

/**
 * The shortening bits, applied before LDPC encoding, are
 * now removed as prescribed in paragraph (c) of
 * 20.3.11.6.5. Finally, either puncturing is applied as
 * described in paragraph (d) of the same subclause, or the
 * copying of repeated bits is applied as described in paragraph (e)
 * of the same subclause. In LDPC example 1, because Npunc = 54
 * is nonzero and Nrep = 0, puncturing is prescribed and completes
 * the LDPC encoding process.
 * The results are given in Table G.38.
 * NOTE—The Nshrt = 642 shortening bits have been removed, and
 * the Npunc = 54 bits have been punctured from
 * Table G.37 to produce bits 816–1247 of Table G.38.
 */
const final1 = [
  // bit#      7-0      15-8     23-16      hex    hex   hex
  /* 0000–0023 01101100 00011001 10001001 */ 0x6C, 0x19, 0x89,
  /* 0024–0047 10001111 01101000 00100001 */ 0x8F, 0x68, 0x21,
  /* 0048–0071 11110100 10100101 01100001 */ 0xF4, 0xA5, 0x61,
  /* 0072–0095 01001111 11010111 10101110 */ 0x4F, 0xD7, 0xAE,
  /* 0096–0119 00100100 00001100 11110011 */ 0x24, 0x0C, 0xF3,
  /* 0120–0143 00111010 11100100 10111100 */ 0x3A, 0xE4, 0xBC,
  /* 0144–0167 01010011 10011000 11000000 */ 0x53, 0x98, 0xC0,
  /* 0168–0191 00011110 00110101 10110011 */ 0x1E, 0x35, 0xB3,
  /* 0192–0215 11100011 11111000 00100101 */ 0xE3, 0xF8, 0x25,
  /* 0216–0239 01100000 11010110 00100101 */ 0x60, 0xD6, 0x25,
  /* 0240–0263 00110101 00110011 11111110 */ 0x35, 0x33, 0xFE,
  /* 0264–0287 11110000 01000001 00101011 */ 0xF0, 0x41, 0x2B,
  /* 0288–0311 10001111 01010011 00011100 */ 0x8F, 0x53, 0x1C,
  /* 0312–0335 10000011 01000001 10111110 */ 0x83, 0x41, 0xBE,
  /* 0336–0359 00111001 00101000 01100110 */ 0x39, 0x28, 0x66,
  /* 0360–0383 01000100 01100110 11001101 */ 0x44, 0x66, 0xCD,
  /* 0384–0407 11110110 10100011 11011000 */ 0xF6, 0xA3, 0xD8,
  /* 0408–0431 00001101 11010100 10000001 */ 0x0D, 0xD4, 0x81,
  /* 0432–0455 00111011 00101111 11011111 */ 0x3B, 0x2F, 0xDF,
  /* 0456–0479 11000011 01011000 11110111 */ 0xC3, 0x58, 0xF7,
  /* 0480–0503 11000110 01010010 11101011 */ 0xC6, 0x52, 0xEB,
  /* 0504–0527 01110000 10001111 10011110 */ 0x70, 0x8F, 0x9E,
  /* 0528–0551 01101010 10010000 10000001 */ 0x6A, 0x90, 0x81,
  /* 0552–0575 11111101 01111100 10101001 */ 0xFD, 0x7C, 0xA9,
  /* 0576–0599 11010001 01010101 00010010 */ 0xD1, 0x55, 0x12,
  /* 0600–0623 00000100 01110100 11011001 */ 0x04, 0x74, 0xD9,
  /* 0624–0647 11101001 00111011 11001101 */ 0xE9, 0x3B, 0xCD,
  /* 0648–0671 10010011 10001101 01111011 */ 0x93, 0x8D, 0x7B,
  /* 0672–0695 01111100 01110000 00000010 */ 0x7C, 0x70, 0x02,
  /* 0696–0719 00100000 10011001 10100001 */ 0x20, 0x99, 0xA1,
  /* 0720–0743 01111101 10001010 00100111 */ 0x7D, 0x8A, 0x27,
  /* 0744–0767 00010111 00111001 00010101 */ 0x17, 0x39, 0x15,
  /* 0768–0791 10100000 11101100 10010101 */ 0xA0, 0xEC, 0x95,
  /* 0792–0815 00010110 10010001 00010000 */ 0x16, 0x91, 0x10,
  /* 0816–0839 10011000 11110110 10100110 */ 0x98, 0xF6, 0xA6,
  /* 0840–0863 01110001 00000011 01011110 */ 0x71, 0x03, 0x5E,
  /* 0864–0887 11001010 00011011 10001110 */ 0xCA, 0x1B, 0x8E,
  /* 0888–0911 11111101 00001110 10010111 */ 0xFD, 0x0E, 0x97,
  /* 0912–0935 01100100 00110100 00011011 */ 0x64, 0x34, 0x1B,
  /* 0936–0959 01011001 10000011 11010000 */ 0x59, 0x83, 0xD0,
  /* 0960–0983 01111100 11000100 00110000 */ 0x7C, 0xC4, 0x30,
  /* 0984–1007 01001101 11011000 00111110 */ 0x4D, 0xD8, 0x3E,
  /* 1008–1031 01111111 01101010 01111110 */ 0x7F, 0x6A, 0x7E,
  /* 1032–1055 10100101 11010001 01100111 */ 0xA5, 0xD1, 0x67,
  /* 1056–1079 01110010 00100111 11001011 */ 0x72, 0x27, 0xCB,
  /* 1080–1103 10001011 01100001 10100010 */ 0x8B, 0x61, 0xA2,
  /* 1104–1127 10000101 10001100 01110110 */ 0x85, 0x8C, 0x76,
  /* 1128–1151 10010110 10011010 00000011 */ 0x96, 0x9A, 0x03,
  /* 1152–1175 01000110 00100101 01011111 */ 0x46, 0x25, 0x5F,
  /* 1176–1199 01110010 11001101 01110100 */ 0x72, 0xCD, 0x74,
  /* 1200–1223 11001101 11000011 01110010 */ 0xCD, 0xC3, 0x72,
  /* 1224–1247 11001011 11011000 11100100 */ 0xCB, 0xD8, 0xE4
];
/* beautify preserve:end */



module.exports = {
    encoded1,
    final1,
    fullText,
    inputBytes1,
    inputMac1,
    inputMessage1,
    scrambleBits,
    scrambled1,
    servicePrepended1,
    shortened1,
    TXVECTOR1
};