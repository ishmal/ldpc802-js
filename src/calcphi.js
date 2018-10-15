
/**
 * Calculates the 'phi' function:
 * phi(x) = log((exp(x) + 1) / (exp(x) - 1))
 */

function calcPhiSlow(x) {
	x = Math.max(x, 1e-10);
	const expx = Math.exp(x);
	const v = Math.log((expx + 1) / (expx - 1));
	return v;
}

function makePhiTable(size) {
	const delta = 7 / size;
	const table = [];
	let x = delta; //avoid the asymptote
	for (let i = 0; i < size; i++, x+= delta) {
		const v = calcPhiSlow(x);
		table.push(v);
		//console.log(`${x}: ${v}`);
	}
	return table;
}

const phiTable = makePhiTable(1000);

function calcPhiTable(x) {
	if (x >= 7) {
		return 0;
	}
	const idx = (x * 142.85714) | 0;
	return phiTable[idx];
}

export const calcPhi = calcPhiTable;

