
const Util = require("../src/util");
const assert = require('assert');


describe("Util", () => {

  it("should convert bytes to bits and back correctly", () => {
    for (let i = 0 ; i < 256 ; i++) {
      let bits = Util.byteToBits(i);
      let b = Util.bitsToByte(bits);
      assert.equal(b, i);
    }
  });

});