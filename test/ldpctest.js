/* jshint node: true, esversion: 6 */
/* globals
describe: false,
expect: false,
it: false
*/

const Ldpc = require("../src/ldpc");
const Util = require("../src/util");
const Data = require("./testdata");
const codes = require("../src/ldpccodes");
const assert = require('assert');

describe("LDPC Codes", () => {
      /**
     * Generate our encoding and decoding tables
     */
    function validateTables() {
        Object.keys(codes).forEach(k => {
            let rate = codes[k];
            Object.keys(rate.lengths).forEach(k2 => {
                let code = rate.lengths[k2];
                validateHb(code);
            });
        });
    }

    function printHb(Hb) {
        console.log("Hb: [");
        for (let i = 0 ; i < Hb.length ; i++) {
            let row = Hb[i];
            let s = "\t[ ";
            s += row.map((n) => {
                let ns = "  " + n.toString();
                ns = ns.substr(ns.length - 2);
                return ns;
            }).join(", ");
            s += " ],";
            console.log(s);
        }
        console.log("]");
    }

    /**
     * Generate the pseudo-cyclic 'Hb' table from the code data
     * @param {*} code one of the blocks in "lengths" in the code table,  for example, "648"
     */
    function validateHb(code) {
        let arr = [];
        let source = code.source;
        let qcRows = source.length;
        for (let i = 0; i < qcRows; i++) {
            let row = [];
            let str = source[i].trim();
            let vals = str.split(/\s+/);
            let vlen = vals.length;
            for (let j = 0; j < vlen; j++) {
                let val = vals[j];
                if (val === '-') {
                    row.push(-1);
                } else {
                    let shift = parseInt(val, 10);
                    row.push(shift);
                }
            }
            arr.push(row);
        }
        //printHb(arr);
        assert.deepEqual(code.Hb, arr);
    }

    it("should have valid tables", () => {
      validateTables();
    });

});


describe("LDPC", () => {

  it("should initialize properly", () => {
    let ldpc;
    assert.doesNotThrow(() => {
      ldpc = new Ldpc();
    });
    assert(ldpc);
  });

  it("should rotate an array to the right", () => {
    let ldpc = new Ldpc();
    let arr = [0,1,2,3,4,5,6,7,8,9];
    let exp = [7,8,9,0,1,2,3,4,5,6];
    let res = ldpc.arrayRotate(arr, 3);
    assert.deepEqual(res, exp);
  });

  it("should group an array into z-size chunks", () => {
    let ldpc = new Ldpc();
    let arr = [0,1,2,3,4,5,6,7,8];
    let exp = [[0,1,2], [3,4,5], [6,7,8]];
    let res = ldpc.bitsToZ(arr, 3);
    assert.deepEqual(res, exp);
  });

  it("should flatten an array of arrays", () => {
    let ldpc = new Ldpc();
    let arr = [[0,1,2], [3,4,5], [6,7,8,9]];
    let exp = [0,1,2,3,4,5,6,7,8,9];
    let res = ldpc.flatten(arr);
    assert.deepEqual(res, exp);
  });

  it("should add two arrays", () => {
    let ldpc = new Ldpc();
    let arr1 = [1,2,3,4,5];
    let arr2 = [6,7,8,9,10];
    let exp = [7,9,11,13,15];
    let res = ldpc.arrayAdd(arr1, arr2);
    assert.deepEqual(res, exp);
  });

  it("should xor two arrays", () => {
    let ldpc = new Ldpc();
    let arr1 = [0,1,1,0,0,1];
    let arr2 = [1,1,1,1,1,1];
    let exp = [1,0,0,1,1,0];
    let res = ldpc.arrayXor(arr1, arr2);
    assert.deepEqual(res, exp);
  });


  it("should encode correctly", () => {
    let ldpc = new Ldpc();
    let bits = ldpc.encode(Data.shortened1, "3/4", "1944");
    assert.equal(bits.length, 1944);
    let bytes = Util.bitsToBytes(bits);
    //assert.deepEqual(bytes, Data.encoded1);
    for (let i=0, len= bytes.length ; i < len ; i++) {
      console.log(i);
      assert.equal(bytes[i], Data.encoded1[i], "index" + i);
    }
  });

  
});