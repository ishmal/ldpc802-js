const lib = require("../index");
const fs = require("fs");

const CodeTable = lib.Ldpc.CodeTable;

const codes_h = `
#ifndef __CODES_H__
#define __CODES_H__

/**
 * Tables of sparse arrays for encoding
 * with LDPC
 */
typedef struct
{
	int M;
	int N;
	int messageBits;
	int Alen;
	int **A;
	int Blen;
	int **B;
	int Clen;
	int **C;
	int Dlen;
	int **D;
	int Elen;
	int **E;
	int Tlen;
	int **T;
	int Hlen;
	int **H;
} Code;

Code R12_648;
Code R12_1296;
Code R12_1944;
Code R23_648;
Code R23_1296;
Code R23_1944;
Code R34_648;
Code R34_1296;
Code R34_1944;
Code R56_648;
Code R56_1296;
Code R56_1944;

#endif

`;

const header = `

#include "codes.h"


`;

const footer = `
`;

/**
 * Temporary utility class for generating C tables
 * for our coedes!
 */
class CodeGen {
	constructor() {
		let table = new CodeTable();
		this.codes = table.codes;
	}

	tableOut(name, tableName, table) {
		let buf = `static int *${name}_${tableName}[${table.length}] = {\n`;

		table.forEach((r, i) => {
			let len = r.length;

			buf += `\t(int []){ ${len}`;
			r.forEach(c => {
				buf += `, ${c}`;
			});
			buf += ` },\n`;
		});

		buf += "};";
		return buf;
	}


	codeOut(name, rate, length) {
		const code = this.codes[rate][length];
		const buf = `
/* ############################################################
### ${name}
############################################################ */

${this.tableOut(name, "A", code.A)}
${this.tableOut(name, "B", code.B)}
${this.tableOut(name, "C", code.C)}
${this.tableOut(name, "D", code.D)}
${this.tableOut(name, "E", code.E)}
${this.tableOut(name, "T", code.T)}
${this.tableOut(name, "H", code.H)}

Code ${name} = {
	${code.M}, // M
	${code.N}, // N
	${code.messageBits}, // messageBits
	${code.A.length}, // A
	(int **)&${name}_A,
	${code.B.length}, // B
	(int **)&${name}_B,
	${code.C.length}, // C
	(int **)&${name}_C,
	${code.D.length}, // D
	(int **)&${name}_D,
	${code.E.length}, // E
	(int **)&${name}_E,
	${code.T.length}, // T
	(int **)&${name}_T,
	${code.H.length}, // H
	(int **)&${name}_H
};


`;
	return buf;
	}

	generate() {
		let buf = header;
		buf += this.codeOut("R12_648", "1/2", "648");
		buf += this.codeOut("R12_1296", "1/2", "1296");
		buf += this.codeOut("R12_1944", "1/2", "1944");
		buf += this.codeOut("R23_648", "2/3", "648");
		buf += this.codeOut("R23_1296", "2/3", "1296");
		buf += this.codeOut("R23_1944", "2/3", "1944");
		buf += this.codeOut("R34_648", "3/4", "648");
		buf += this.codeOut("R34_1296", "3/4", "1296");
		buf += this.codeOut("R34_1944", "3/4", "1944");
		buf += this.codeOut("R56_648", "5/6", "648");
		buf += this.codeOut("R56_1296", "5/6", "1296");
		buf += this.codeOut("R56_1944", "5/6", "1944");
		buf += footer;
		return buf;
	}

	execute() {
		const buf = this.generate();
		fs.writeFileSync("codes.c", buf, "utf-8");
		fs.writeFileSync("codes.h", codes_h, "utf-8");
	}

}

function runme() {
	const tool = new CodeGen();
	tool.execute();
}

runme();