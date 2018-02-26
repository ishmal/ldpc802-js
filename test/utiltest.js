
const Util = require("../src/util");
const assert = require('assert');
const Data = require("./testdata");


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

  it("should pad bytes correctly", () => {
    let bytes = [ 1, 2, 3, 4, 5, 6];
    let exp = [ 1, 2, 3, 4, 5, 6, 0, 0, 0];
    let res = Util.zeroPadArray(bytes, 9);
    assert.deepEqual(res, exp);
  });

  it("should pad bits correctly", () => {
    let bits = Util.bytesToBitsBE(Data.scrambled1);
    let obits = Util.zeroPadArray(bits, 1458);
    let res = Util.bitsToBytesBE(obits);
    assert.deepEqual(res, Data.shortened1);  
  });



});