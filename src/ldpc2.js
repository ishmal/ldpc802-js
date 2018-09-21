
const Util = require("./util");

const multiplySparse = Util.multiplySparse;
const substituteSparse = Util.substituteSparse;

function add(a, b) {
	const arr = [];
	for (i=0, len = a.length; i < len ; i++) {
		arr[i] = a[i] ^ b[i];
	}
	return arr;
}

function addMatrix(a, b) {
	const mat = [];
	for (let i=0, rows = a.length; i < rows; i++) {
		const row = [];
		const rowA = a[i];
		const rowB = b[i];
		for (let j=0, cols = rowA.length; j < cols ; j++) {
			row.push(rowA[i] ^ rowB[i]);
		}
		mat.push(row);
	}
	return mat;
}

class Ldpc2 {
	constructor(code) {
		this.A = code.A;
		this.B = code.B;
		this.C = code.C;
		this.D = code.D;
		this.E = code.E;
		this.T = code.T;
		const TinvB = Util.substituteSparseMatrix(this.T, code.Bdense)
	}

	encode(s) {
		const Ast = multiplySparse(this.A, s);
		const Cst = multiplySparse(this.C, s);
		const TinvAst = substituteSparse(this.T, Ast);
		const ETinvAst = multiplySparse(this.E, TinvAst);
		const ETinvAstCst = add(ETinvAst, Cst);
		const 

	}

	step1() {
		this.ast = 0;
		this.cst = 0;
	}

	step2() {
		this.ETinvAst = 0;

	}

	step3() {
		this.p1 = this.ETAst  + cst;
	}

	step4() {
		this.Tp2 = this.ast + Bp1

	}

	step5() {
		this.x = concat(s, p1, p2)

	}
}