

const Codes = require("../src/codes");
const assert = require("assert");
const math = require("mathjs");
const rawCodes = require("./rawcodes");


describe("LDPC Codes", () => {
	/**
	 * Generate our encoding and decoding tables
	 */
	function validateTables() {
		const codes = new Codes().codes;
		Object.keys(codes).forEach(rate => {
			let rateObj = codes[rate];
			Object.keys(rateObj).forEach(length => {
				let code = rateObj[length];
				validateHb(code, rate, length);
			});
		});
	}

	function printHb(Hb) {
		console.log("Hb: [");
		for (let i = 0; i < Hb.length; i++) {
			let row = Hb[i];
			let s = "\t[ ";
			s += row
				.map(n => {
					let ns = "  " + n.toString();
					ns = ns.substr(ns.length - 2);
					return ns;
				})
				.join(", ");
			s += " ],";
			console.log(s);
		}
		console.log("]");
	}

	/**
	 * Generate the pseudo-cyclic 'Hb' table from the code data
	 * @param {object} code one of the blocks in "lengths" in the code table,  for example, "648"
	 */
	function validateHb(code, rate, length) {
		let arr = [];
		//console.log("rate: " + rate);
		let source = rawCodes[rate][length];
		let qcRows = source.length;
		for (let i = 0; i < qcRows; i++) {
			let row = [];
			let str = source[i].trim();
			let vals = str.split(/\s+/);
			let vlen = vals.length;
			for (let j = 0; j < vlen; j++) {
				let val = vals[j];
				if (val === "-") {
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

	it("should convert a block of QC codes to sparse rows", () => {
		const qc = [
			[  0,  1,  2],
			[  2, -1,  1],
			[  0,  1, -1]
		];
		const z = 3;
		const exp = [
			[0, 4, 8],
			[1, 5, 6],
			[2, 3, 7],
			[2, 7],
			[0, 8],
			[1, 6],
			[0, 4],
			[1, 5],
			[2, 3],
		];
		const codes = new Codes();
		const res = codes.qcMatrixToSparse(qc, z);
		assert.deepEqual(exp, res);
	});

	function printMatrix(arr) {
		console.log("size: " + arr.length);
		arr.forEach((row, i) => {
			process.stdout.write(i.toString().padStart(2) + ":");
			row.forEach(col => {
				process.stdout.write(col.toString().padStart(2));
			});
			process.stdout.write("\n");
		});
	}

	it("does stuff", () => {
		const codes = new Codes();
		const code = codes.codes["5/6"]["648"];
		//console.log("T:" + JSON.stringify(code.T, null, 2));
		const arr = codes.qcMatrixToDense(code.T, code.z);
		//printMatrix(arr);
	});

});
