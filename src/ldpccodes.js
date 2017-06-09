

/**
 * LDPC codes from IEEE Std 802.11n-2009
 */
const codes = {
    "1/2": {
        lengths: {
            "648": {
                z: 27,
                length: 648,
                messageBits: 324,
                nb: 24,
                mb: 12,
                kb: 12,
                source: [
                    " 0  -  -  -  0  0  -  -  0  -  -  0  1 0 - - - - - - - - - -",
                    "22  0  -  - 17  -  0  0 12  -  -  -  - 0 0 - - - - - - - - -",
                    " 6  -  0  - 10  -  -  - 24  -  0  -  - - 0 0 - - - - - - - -",
                    " 2  -  -  0 20  -  -  - 25  0  -  -  - - - 0 0 - - - - - - -",
                    "23  -  -  -  3  -  -  -  0  -  9 11  - - - - 0 0 - - - - - -",
                    "24  - 23  1 17  -  3  - 10  -  -  -  - - - - - 0 0 - - - - -",
                    "25  -  -  -  8  -  -  -  7 18  -  -  0 - - - - - 0 0 - - - -",
                    "13 24  -  -  0  -  8  -  6  -  -  -  - - - - - - - 0 0 - - -",
                    " 7 20  - 16 22 10  -  - 23  -  -  -  - - - - - - - - 0 0 - -",
                    "11  -  -  - 19  -  -  - 13  -  3 17  - - - - - - - - - 0 0 -",
                    "25  -  8  - 23 18  - 14  9  -  -  -  - - - - - - - - - - 0 0",
                    " 3  -  -  - 16  -  -  2 25  5  -  -  1 - - - - - - - - - - 0"
                ],
				Hb: [
					[  0, -1, -1, -1,  0,  0, -1, -1,  0, -1, -1,  0,  1,  0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1 ],
					[ 22,  0, -1, -1, 17, -1,  0,  0, 12, -1, -1, -1, -1,  0,  0, -1, -1, -1, -1, -1, -1, -1, -1, -1 ],
					[  6, -1,  0, -1, 10, -1, -1, -1, 24, -1,  0, -1, -1, -1,  0,  0, -1, -1, -1, -1, -1, -1, -1, -1 ],
					[  2, -1, -1,  0, 20, -1, -1, -1, 25,  0, -1, -1, -1, -1, -1,  0,  0, -1, -1, -1, -1, -1, -1, -1 ],
					[ 23, -1, -1, -1,  3, -1, -1, -1,  0, -1,  9, 11, -1, -1, -1, -1,  0,  0, -1, -1, -1, -1, -1, -1 ],
					[ 24, -1, 23,  1, 17, -1,  3, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1,  0,  0, -1, -1, -1, -1, -1 ],
					[ 25, -1, -1, -1,  8, -1, -1, -1,  7, 18, -1, -1,  0, -1, -1, -1, -1, -1,  0,  0, -1, -1, -1, -1 ],
					[ 13, 24, -1, -1,  0, -1,  8, -1,  6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0,  0, -1, -1, -1 ],
					[  7, 20, -1, 16, 22, 10, -1, -1, 23, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0,  0, -1, -1 ],
					[ 11, -1, -1, -1, 19, -1, -1, -1, 13, -1,  3, 17, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0,  0, -1 ],
					[ 25, -1,  8, -1, 23, 18, -1, 14,  9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0,  0 ],
					[  3, -1, -1, -1, 16, -1, -1,  2, 25,  5, -1, -1,  1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0 ]
				]
            },
            "1296": {
                z: 54,
                length: 1296,
                messageBits: 648,
                nb: 24,
                mb: 12,
                kb: 12,
                source: [
                    "40  -  -  - 22  - 49 23 43  -  -  -  1 0 - - - - - - - - - -",
                    "50  1  -  - 48 35  -  - 13  - 30  -  - 0 0 - - - - - - - - -",
                    "39 50  -  -  4  -  2  -  -  -  - 49  - - 0 0 - - - - - - - -",
                    "33  -  - 38 37  -  -  4  1  -  -  -  - - - 0 0 - - - - - - -",
                    "45  -  -  -  0 22  -  - 20 42  -  -  - - - - 0 0 - - - - - -",
                    "51  -  - 48 35  -  -  - 44  - 18  -  - - - - - 0 0 - - - - -",
                    "47 11  -  -  - 17  -  - 51  -  -  -  0 - - - - - 0 0 - - - -",
                    " 5  - 25  -  6  - 45  - 13 40  -  -  - - - - - - - 0 0 - - -",
                    "33  -  - 34 24  -  -  - 23  -  - 46  - - - - - - - - 0 0 - -",
                    " 1  - 27  -  1  -  -  - 38  - 44  -  - - - - - - - - - 0 0 -",
                    " - 18  -  - 23  -  -  8  0 35  -  -  - - - - - - - - - - 0 0",
                    "49  - 17  - 30  -  -  - 34  -  - 19  1 - - - - - - - - - - 0"
                ],
				Hb: [
					[ 40, -1, -1, -1, 22, -1, 49, 23, 43, -1, -1, -1,  1,  0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1 ],
					[ 50,  1, -1, -1, 48, 35, -1, -1, 13, -1, 30, -1, -1,  0,  0, -1, -1, -1, -1, -1, -1, -1, -1, -1 ],
					[ 39, 50, -1, -1,  4, -1,  2, -1, -1, -1, -1, 49, -1, -1,  0,  0, -1, -1, -1, -1, -1, -1, -1, -1 ],
					[ 33, -1, -1, 38, 37, -1, -1,  4,  1, -1, -1, -1, -1, -1, -1,  0,  0, -1, -1, -1, -1, -1, -1, -1 ],
					[ 45, -1, -1, -1,  0, 22, -1, -1, 20, 42, -1, -1, -1, -1, -1, -1,  0,  0, -1, -1, -1, -1, -1, -1 ],
					[ 51, -1, -1, 48, 35, -1, -1, -1, 44, -1, 18, -1, -1, -1, -1, -1, -1,  0,  0, -1, -1, -1, -1, -1 ],
					[ 47, 11, -1, -1, -1, 17, -1, -1, 51, -1, -1, -1,  0, -1, -1, -1, -1, -1,  0,  0, -1, -1, -1, -1 ],
					[  5, -1, 25, -1,  6, -1, 45, -1, 13, 40, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0,  0, -1, -1, -1 ],
					[ 33, -1, -1, 34, 24, -1, -1, -1, 23, -1, -1, 46, -1, -1, -1, -1, -1, -1, -1, -1,  0,  0, -1, -1 ],
					[  1, -1, 27, -1,  1, -1, -1, -1, 38, -1, 44, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0,  0, -1 ],
					[ -1, 18, -1, -1, 23, -1, -1,  8,  0, 35, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0,  0 ],
					[ 49, -1, 17, -1, 30, -1, -1, -1, 34, -1, -1, 19,  1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0 ]
				]
            },
            "1944": {
                z: 81,
                length: 1944,
                messageBits: 972,
                nb: 24,
                mb: 12,
                kb: 12,
                source: [
                    "57  -  -  - 50  - 11  - 50  - 79  -  1 0 - - - - - - - - - -",
                    " 3  - 28  -  0  -  -  - 55  7  -  -  - 0 0 - - - - - - - - -",
                    "30  -  -  - 24 37  -  - 56 14  -  -  - - 0 0 - - - - - - - -",
                    "62 53  -  - 53  -  -  3 35  -  -  -  - - - 0 0 - - - - - - -",
                    "40  -  - 20 66  -  - 22 28  -  -  -  - - - - 0 0 - - - - - -",
                    " 0  -  -  -  8  - 42  - 50  -  -  8  - - - - - 0 0 - - - - -",
                    "69 79 79  -  -  - 56  - 52  -  -  -  0 - - - - - 0 0 - - - -",
                    "65  -  -  - 38 57  -  - 72  - 27  -  - - - - - - - 0 0 - - -",
                    "64  -  -  - 14 52  -  - 30  -  - 32  - - - - - - - - 0 0 - -",
                    " - 45  - 70  0  -  -  - 77  9  -  -  - - - - - - - - - 0 0 -",
                    " 2 56  - 57 35  -  -  -  -  - 12  -  - - - - - - - - - - 0 0",
                    "24  - 61  - 60  -  - 27 51  -  - 16  1 - - - - - - - - - - 0"
                ],
				Hb: [
					[ 57, -1, -1, -1, 50, -1, 11, -1, 50, -1, 79, -1,  1,  0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1 ],
					[  3, -1, 28, -1,  0, -1, -1, -1, 55,  7, -1, -1, -1,  0,  0, -1, -1, -1, -1, -1, -1, -1, -1, -1 ],
					[ 30, -1, -1, -1, 24, 37, -1, -1, 56, 14, -1, -1, -1, -1,  0,  0, -1, -1, -1, -1, -1, -1, -1, -1 ],
					[ 62, 53, -1, -1, 53, -1, -1,  3, 35, -1, -1, -1, -1, -1, -1,  0,  0, -1, -1, -1, -1, -1, -1, -1 ],
					[ 40, -1, -1, 20, 66, -1, -1, 22, 28, -1, -1, -1, -1, -1, -1, -1,  0,  0, -1, -1, -1, -1, -1, -1 ],
					[  0, -1, -1, -1,  8, -1, 42, -1, 50, -1, -1,  8, -1, -1, -1, -1, -1,  0,  0, -1, -1, -1, -1, -1 ],
					[ 69, 79, 79, -1, -1, -1, 56, -1, 52, -1, -1, -1,  0, -1, -1, -1, -1, -1,  0,  0, -1, -1, -1, -1 ],
					[ 65, -1, -1, -1, 38, 57, -1, -1, 72, -1, 27, -1, -1, -1, -1, -1, -1, -1, -1,  0,  0, -1, -1, -1 ],
					[ 64, -1, -1, -1, 14, 52, -1, -1, 30, -1, -1, 32, -1, -1, -1, -1, -1, -1, -1, -1,  0,  0, -1, -1 ],
					[ -1, 45, -1, 70,  0, -1, -1, -1, 77,  9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0,  0, -1 ],
					[  2, 56, -1, 57, 35, -1, -1, -1, -1, -1, 12, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0,  0 ],
					[ 24, -1, 61, -1, 60, -1, -1, 27, 51, -1, -1, 16,  1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0 ]
				]				
            }
        }
    },
    "2/3": {
        lengths: {
            "648": {
                z: 27,
                length: 648,
                messageBits: 432,
                nb: 24,
                mb: 8,
                kb: 16,
                source: [
                    "25 26 14  - 20  -  2  -  4  -  -  8  - 16  - 18  1 0 - - - - - -",
                    "10  9 15 11  -  0  -  1  -  - 18  -  8  - 10  -  - 0 0 - - - - -",
                    "16  2 20 26 21  -  6  -  1 26  -  7  -  -  -  -  - - 0 0 - - - -",
                    "10 13  5  0  -  3  -  7  -  - 26  -  - 13  - 16  - - - 0 0 - - -",
                    "23 14 24  - 12  - 19  - 17  -  -  - 20  - 21  -  0 - - - 0 0 - -",
                    " 6 22  9 20  - 25  - 17  -  8  - 14  - 18  -  -  - - - - - 0 0 -",
                    "14 23 21 11 20  - 24  - 18  - 19  -  -  -  - 22  - - - - - - 0 0",
                    "17 11 11 20  - 21  - 26  -  3  -  - 18  - 26  -  1 - - - - - - 0"
                ],
				Hb: [
					[ 25, 26, 14, -1, 20, -1,  2, -1,  4, -1, -1,  8, -1, 16, -1, 18,  1,  0, -1, -1, -1, -1, -1, -1 ],
					[ 10,  9, 15, 11, -1,  0, -1,  1, -1, -1, 18, -1,  8, -1, 10, -1, -1,  0,  0, -1, -1, -1, -1, -1 ],
					[ 16,  2, 20, 26, 21, -1,  6, -1,  1, 26, -1,  7, -1, -1, -1, -1, -1, -1,  0,  0, -1, -1, -1, -1 ],
					[ 10, 13,  5,  0, -1,  3, -1,  7, -1, -1, 26, -1, -1, 13, -1, 16, -1, -1, -1,  0,  0, -1, -1, -1 ],
					[ 23, 14, 24, -1, 12, -1, 19, -1, 17, -1, -1, -1, 20, -1, 21, -1,  0, -1, -1, -1,  0,  0, -1, -1 ],
					[  6, 22,  9, 20, -1, 25, -1, 17, -1,  8, -1, 14, -1, 18, -1, -1, -1, -1, -1, -1, -1,  0,  0, -1 ],
					[ 14, 23, 21, 11, 20, -1, 24, -1, 18, -1, 19, -1, -1, -1, -1, 22, -1, -1, -1, -1, -1, -1,  0,  0 ],
					[ 17, 11, 11, 20, -1, 21, -1, 26, -1,  3, -1, -1, 18, -1, 26, -1,  1, -1, -1, -1, -1, -1, -1,  0 ]
				]				
            },
            "1296": {
                z: 54,
                length: 1296,
                messageBits: 864,
                nb: 24,
                mb: 8,
                kb: 16,
                source: [
                    "39 31 22 43  - 40  4  - 11  -  - 50  -  -  -  6  1 0 - - - - - -",
                    "25 52 41  2  6  - 14  - 34  -  -  - 24  - 37  -  - 0 0 - - - - -",
                    "43 31 29  0 21  - 28  -  -  2  -  -  7  - 17  -  - - 0 0 - - - -",
                    "20 33 48  -  4 13  - 26  -  - 22  -  - 46 42  -  - - - 0 0 - - -",
                    "45  7 18 51 12 25  -  -  - 50  -  -  5  -  -  -  0 - - - 0 0 - -",
                    "35 40 32 16  5  -  - 18  -  - 43 51  - 32  -  -  - - - - - 0 0 -",
                    " 9 24 13 22 28  -  - 37  -  - 25  -  - 52  - 13  - - - - - - 0 0",
                    "32 22  4 21 16  -  -  - 27 28  - 38  -  -  -  8  1 - - - - - - 0"
                ],
				Hb: [
					[ 39, 31, 22, 43, -1, 40,  4, -1, 11, -1, -1, 50, -1, -1, -1,  6,  1,  0, -1, -1, -1, -1, -1, -1 ],
					[ 25, 52, 41,  2,  6, -1, 14, -1, 34, -1, -1, -1, 24, -1, 37, -1, -1,  0,  0, -1, -1, -1, -1, -1 ],
					[ 43, 31, 29,  0, 21, -1, 28, -1, -1,  2, -1, -1,  7, -1, 17, -1, -1, -1,  0,  0, -1, -1, -1, -1 ],
					[ 20, 33, 48, -1,  4, 13, -1, 26, -1, -1, 22, -1, -1, 46, 42, -1, -1, -1, -1,  0,  0, -1, -1, -1 ],
					[ 45,  7, 18, 51, 12, 25, -1, -1, -1, 50, -1, -1,  5, -1, -1, -1,  0, -1, -1, -1,  0,  0, -1, -1 ],
					[ 35, 40, 32, 16,  5, -1, -1, 18, -1, -1, 43, 51, -1, 32, -1, -1, -1, -1, -1, -1, -1,  0,  0, -1 ],
					[  9, 24, 13, 22, 28, -1, -1, 37, -1, -1, 25, -1, -1, 52, -1, 13, -1, -1, -1, -1, -1, -1,  0,  0 ],
					[ 32, 22,  4, 21, 16, -1, -1, -1, 27, 28, -1, 38, -1, -1, -1,  8,  1, -1, -1, -1, -1, -1, -1,  0 ]
				]				
            },
            "1944": {
                z: 81,
                length: 1944,
                messageBits: 1296,
                nb: 24,
                mb: 8,
                kb: 16,
                source: [
					"61 75  4 63 56  -  -  -  -  -  -  8  -  2 17 25 1 0 - - - - - -",
					"56 74 77 20  -  -  - 64 24  4 67  -  7  -  -  - - 0 0 - - - - -",
					"28 21 68 10  7 14 65  -  -  - 23  -  -  - 75  - - - 0 0 - - - -",
					"48 38 43 78 76  -  -  -  -  5 36  - 15 72  -  - - - - 0 0 - - -",
					"40  2 53 25  - 52 62  - 20  -  - 44  -  -  -  - 0 - - - 0 0 - -",
					"69 23 64 10 22  - 21  -  -  -  -  - 68 23 29  - - - - - - 0 0 -",
					"12  0 68 20 55 61  - 40  -  -  - 52  -  -  - 44 - - - - - - 0 0",
					"58  8 34 64 78  -  - 11 78 24  -  -  -  -  - 58 1 - - - - - - 0"
				],
				Hb: [
					[ 61, 75,  4, 63, 56, -1, -1, -1, -1, -1, -1,  8, -1,  2, 17, 25,  1,  0, -1, -1, -1, -1, -1, -1 ],
					[ 56, 74, 77, 20, -1, -1, -1, 64, 24,  4, 67, -1,  7, -1, -1, -1, -1,  0,  0, -1, -1, -1, -1, -1 ],
					[ 28, 21, 68, 10,  7, 14, 65, -1, -1, -1, 23, -1, -1, -1, 75, -1, -1, -1,  0,  0, -1, -1, -1, -1 ],
					[ 48, 38, 43, 78, 76, -1, -1, -1, -1,  5, 36, -1, 15, 72, -1, -1, -1, -1, -1,  0,  0, -1, -1, -1 ],
					[ 40,  2, 53, 25, -1, 52, 62, -1, 20, -1, -1, 44, -1, -1, -1, -1,  0, -1, -1, -1,  0,  0, -1, -1 ],
					[ 69, 23, 64, 10, 22, -1, 21, -1, -1, -1, -1, -1, 68, 23, 29, -1, -1, -1, -1, -1, -1,  0,  0, -1 ],
					[ 12,  0, 68, 20, 55, 61, -1, 40, -1, -1, -1, 52, -1, -1, -1, 44, -1, -1, -1, -1, -1, -1,  0,  0 ],
					[ 58,  8, 34, 64, 78, -1, -1, 11, 78, 24, -1, -1, -1, -1, -1, 58,  1, -1, -1, -1, -1, -1, -1,  0 ]
				]
            }
        }
    },
    "3/4": {
        lengths: {
            "648": {
                z: 27,
                length: 648,
                messageBits: 486,
                nb: 24,
                mb: 6,
                kb: 18,
                source: [
                    "16 17 22 24  9  3 14  -  4  2  7  - 26  -  2  - 21  -  1 0 - - - -",
                    "25 12 12  3  3 26  6 21  - 15 22  - 15  -  4  -  - 16  - 0 0 - - -",
                    "25 18 26 16 22 23  9  -  0  -  4  -  4  -  8 23 11  -  - - 0 0 - -",
                    " 9  7  0  1 17  -  -  7  3  -  3 23  - 16  -  - 21  -  0 - - 0 0 -",
                    "24  5 26  7  1  -  - 15 24 15  -  8  - 13  - 13  - 11  - - - - 0 0",
                    " 2  2 19 14 24  1 15 19  - 21  -  2  - 24  -  3  -  2  1 - - - - 0"
                ],
				Hb: [
					[ 16, 17, 22, 24,  9,  3, 14, -1,  4,  2,  7, -1, 26, -1,  2, -1, 21, -1,  1,  0, -1, -1, -1, -1 ],
					[ 25, 12, 12,  3,  3, 26,  6, 21, -1, 15, 22, -1, 15, -1,  4, -1, -1, 16, -1,  0,  0, -1, -1, -1 ],
					[ 25, 18, 26, 16, 22, 23,  9, -1,  0, -1,  4, -1,  4, -1,  8, 23, 11, -1, -1, -1,  0,  0, -1, -1 ],
					[  9,  7,  0,  1, 17, -1, -1,  7,  3, -1,  3, 23, -1, 16, -1, -1, 21, -1,  0, -1, -1,  0,  0, -1 ],
					[ 24,  5, 26,  7,  1, -1, -1, 15, 24, 15, -1,  8, -1, 13, -1, 13, -1, 11, -1, -1, -1, -1,  0,  0 ],
					[  2,  2, 19, 14, 24,  1, 15, 19, -1, 21, -1,  2, -1, 24, -1,  3, -1,  2,  1, -1, -1, -1, -1,  0 ]
				]				
            },
            "1296": {
                z: 54,
                length: 1296,
                messageBits: 972,
                nb: 24,
                mb: 6,
                kb: 18,
                source: [
                    "39 40 51 41  3 29  8 36  - 14  -  6  - 33  - 11  -  4  1 0 - - - -",
                    "48 21 47  9 48 35 51  - 38  - 28  - 34  - 50  - 50  -  - 0 0 - - -",
                    "30 39 28 42 50 39  5 17  -  6  - 18  - 20  - 15  - 40  - - 0 0 - -",
                    "29  0  1 43 36 30 47  - 49  - 47  -  3  - 35  - 34  -  0 - - 0 0 -",
                    " 1 32 11 23 10 44 12  7  - 48  -  4  -  9  - 17  - 16  - - - - 0 0",
                    "13  7 15 47 23 16 47  - 43  - 29  - 52  -  2  - 53  -  1 - - - - 0"
                ],
				Hb: [
					[ 39, 40, 51, 41,  3, 29,  8, 36, -1, 14, -1,  6, -1, 33, -1, 11, -1,  4,  1,  0, -1, -1, -1, -1 ],
					[ 48, 21, 47,  9, 48, 35, 51, -1, 38, -1, 28, -1, 34, -1, 50, -1, 50, -1, -1,  0,  0, -1, -1, -1 ],
					[ 30, 39, 28, 42, 50, 39,  5, 17, -1,  6, -1, 18, -1, 20, -1, 15, -1, 40, -1, -1,  0,  0, -1, -1 ],
					[ 29,  0,  1, 43, 36, 30, 47, -1, 49, -1, 47, -1,  3, -1, 35, -1, 34, -1,  0, -1, -1,  0,  0, -1 ],
					[  1, 32, 11, 23, 10, 44, 12,  7, -1, 48, -1,  4, -1,  9, -1, 17, -1, 16, -1, -1, -1, -1,  0,  0 ],
					[ 13,  7, 15, 47, 23, 16, 47, -1, 43, -1, 29, -1, 52, -1,  2, -1, 53, -1,  1, -1, -1, -1, -1,  0 ]
				]				
            },
            "1944": {
                z: 81,
                length: 1944,
                messageBits: 1458,
    	        nb: 24,
                mb: 6,
                kb: 18,
                source: [
                    "48 29 28 39  9 61  -  -  - 63 45 80  -  -  - 37 32 22  1 0 - - - -",
                    " 4 49 42 48 11 30  -  -  - 49 17 41 37 15  - 54  -  -  - 0 0 - - -",
                    "35 76 78 51 37 35 21  - 17 64  -  -  - 59  7  -  - 32  - - 0 0 - -",
                    " 9 65 44  9 54 56 73 34 42  -  -  - 35  -  -  - 46 39  0 - - 0 0 -",
                    " 3 62  7 80 68 26  - 80 55  - 36  - 26  -  9  - 72  -  - - - - 0 0",
                    "26 75 33 21 69 59  3 38  -  -  - 35  - 62 36 26  -  -  1 - - - - 0"
                ],
				Hb: [
					[ 48, 29, 28, 39,  9, 61, -1, -1, -1, 63, 45, 80, -1, -1, -1, 37, 32, 22,  1,  0, -1, -1, -1, -1 ],
					[  4, 49, 42, 48, 11, 30, -1, -1, -1, 49, 17, 41, 37, 15, -1, 54, -1, -1, -1,  0,  0, -1, -1, -1 ],
					[ 35, 76, 78, 51, 37, 35, 21, -1, 17, 64, -1, -1, -1, 59,  7, -1, -1, 32, -1, -1,  0,  0, -1, -1 ],
					[  9, 65, 44,  9, 54, 56, 73, 34, 42, -1, -1, -1, 35, -1, -1, -1, 46, 39,  0, -1, -1,  0,  0, -1 ],
					[  3, 62,  7, 80, 68, 26, -1, 80, 55, -1, 36, -1, 26, -1,  9, -1, 72, -1, -1, -1, -1, -1,  0,  0 ],
					[ 26, 75, 33, 21, 69, 59,  3, 38, -1, -1, -1, 35, -1, 62, 36, 26, -1, -1,  1, -1, -1, -1, -1,  0 ]
				]				
            }
        }
    },
    "5/6": {
        lengths: {
            "648": {
                z: 27,
                length: 648,
                messageBits: 540,
                nb: 24,
                mb: 4,
                kb: 20,
                source: [
                    "17 13  8 21  9  3 18 12 10  0  4 15 19  2  5 10 26 19 13 13  1 0 - -",
                    " 3 12 11 14 11 25  5 18  0  9  2 26 26 10 24  7 14 20  4  2  - 0 0 -",
                    "22 16  4  3 10 21 12  5 21 14 19  5  -  8  5 18 11  5  5 15  0 - 0 0",
                    " 7  7 14 14  4 16 16 24 24 10  1  7 15  6 10 26  8 18 21 14  1 - - 0"
                ],
				Hb: [
					[ 17, 13,  8, 21,  9,  3, 18, 12, 10,  0,  4, 15, 19,  2,  5, 10, 26, 19, 13, 13,  1,  0, -1, -1 ],
					[  3, 12, 11, 14, 11, 25,  5, 18,  0,  9,  2, 26, 26, 10, 24,  7, 14, 20,  4,  2, -1,  0,  0, -1 ],
					[ 22, 16,  4,  3, 10, 21, 12,  5, 21, 14, 19,  5, -1,  8,  5, 18, 11,  5,  5, 15,  0, -1,  0,  0 ],
					[  7,  7, 14, 14,  4, 16, 16, 24, 24, 10,  1,  7, 15,  6, 10, 26,  8, 18, 21, 14,  1, -1, -1,  0 ]
				]
            },
            "1296": {
                z: 54,
                length: 1296,
                messageBits: 1080,
                nb: 24,
                mb: 4,
                kb: 20,
                source: [
                    "48 29 37 52  2 16  6 14 53 31 34  5 18 42 53 31 45  - 46 52  1 0 - -",
                    "17  4 30  7 43 11 24  6 14 21  6 39 17 40 47  7 15 41 19  -  - 0 0 -",
                    " 7  2 51 31 46 23 16 11 53 40 10  7 46 53 33 35  - 25 35 38  0 - 0 0",
                    "19 48 41  1 10  7 36 47  5 29 52 52 31 10 26  6  3  2  - 51  1 - - 0"
                ],
				Hb: [
					[ 48, 29, 37, 52,  2, 16,  6, 14, 53, 31, 34,  5, 18, 42, 53, 31, 45, -1, 46, 52,  1,  0, -1, -1 ],
					[ 17,  4, 30,  7, 43, 11, 24,  6, 14, 21,  6, 39, 17, 40, 47,  7, 15, 41, 19, -1, -1,  0,  0, -1 ],
					[  7,  2, 51, 31, 46, 23, 16, 11, 53, 40, 10,  7, 46, 53, 33, 35, -1, 25, 35, 38,  0, -1,  0,  0 ],
					[ 19, 48, 41,  1, 10,  7, 36, 47,  5, 29, 52, 52, 31, 10, 26,  6,  3,  2, -1, 51,  1, -1, -1,  0 ]
				]
            },
            "1944": {
                z: 81,
                length: 1944,
                messageBits: 1620,
                nb: 24,
                mb: 4,
                kb: 20,
                source: [
                    "13 48 80 66  4 74  7 30 76 52 37 60  - 49 73 31 74 73 23  -  1 0 - -",
                    "69 63 74 56 64 77 57 65  6 16 51  - 64  - 68  9 48 62 54 27  - 0 0 -",
                    "51 15  0 80 24 25 42 54 44 71 71  9 67 35  - 58  - 29  - 53  0 - 0 0",
                    "16 29 36 41 44 56 59 37 50 24  - 65  4 65 52  -  4  - 73 52  1 - - 0"
                ],
				Hb: [
					[ 13, 48, 80, 66,  4, 74,  7, 30, 76, 52, 37, 60, -1, 49, 73, 31, 74, 73, 23, -1,  1,  0, -1, -1 ],
					[ 69, 63, 74, 56, 64, 77, 57, 65,  6, 16, 51, -1, 64, -1, 68,  9, 48, 62, 54, 27, -1,  0,  0, -1 ],
					[ 51, 15,  0, 80, 24, 25, 42, 54, 44, 71, 71,  9, 67, 35, -1, 58, -1, 29, -1, 53,  0, -1,  0,  0 ],
					[ 16, 29, 36, 41, 44, 56, 59, 37, 50, 24, -1, 65,  4, 65, 52, -1,  4, -1, 73, 52,  1, -1, -1,  0 ]
				]
            }
        }
    }
};


module.exports = codes;
