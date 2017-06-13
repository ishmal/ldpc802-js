
const Util = require("../src/util");
const assert = require('assert');


describe("Util", () => {

  it("should convert bytes to big endian bits and back correctly", () => {
    for (let i = 0 ; i < 256 ; i++) {
      let bits = Util.byteToBitsBE(i);
      let b = Util.bitsToByteBE(bits);
      assert.equal(b, i);
    }
  });

  it("should convert bytes to little endian bits and back correctly", () => {
    for (let i = 0 ; i < 256 ; i++) {
      let bits = Util.byteToBitsLE(i);
      let b = Util.bitsToByteLE(bits);
      assert.equal(b, i);
    }
  });

  it("should convert an array of bytes to big endian bits and back", () => {
    let arr = [0, 1, 2, 3, 4, 5, 6];
    let bits = Util.bytesToBitsBE(arr);
    let res = Util.bitsToBytesBE(bits);
    assert.deepEqual(res, arr);
  });

  it("should convert an array of bytes to little endian bits and back", () => {
    let arr = [0, 1, 2, 3, 4, 5, 6];
    let bits = Util.bytesToBitsLE(arr);
    let res = Util.bitsToBytesLE(bits);
    assert.deepEqual(res, arr);
  });

});