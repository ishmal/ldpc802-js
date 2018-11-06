const lib = require("../index");
const fs = require("fs");

const CodeTable = lib.Ldpc.CodeTable;

/**
 * Temporary utility class for generating C tables
 * for our coedes!
 */
class CodeGen {
	constructor() {
		let table = new CodeTable();
		this.codes = table.codes;
	}

	tableOut(name, tname, table) {
		let buf = `${name}_${tname} = {\n`;
		table.forEach((r, i) => {
			let len = r.length.toString();
			if (len !== "0") {
				len += ", ";
			}
			buf += `    { ${len}`;
			r.forEach((c, j) => {
				buf += `${c}`;
				if (j < r.length -1) {
					buf += ", ";
				}
			});
			buf += ` }`;
			if (i < table.length -1) {
				buf += ", ";
			}
			buf += "\n";
		});
		buf += "};\n\n";
		return buf;
	}

	codeOut(name, rate, length) {
		let buf = "";
		const code = this.codes[rate][length];
		buf += this.tableOut(name, "A", code.A);
		buf += this.tableOut(name, "B", code.B);
		buf += this.tableOut(name, "C", code.C);
		buf += this.tableOut(name, "D", code.D);
		buf += this.tableOut(name, "E", code.E);
		buf += this.tableOut(name, "T", code.T);
		buf += this.tableOut(name, "H", code.H);
		return buf;
	}

	generate() {
		let buf = "";
		buf += this.codeOut("ONE_HALF_648", "1/2", "648");
		return buf;
	}

	execute() {
		const buf = this.generate();
		fs.writeFileSync("table.txt", buf, "utf-8");
	}

}

function runme() {
	const tool = new CodeGen();
	tool.execute();
}

runme();