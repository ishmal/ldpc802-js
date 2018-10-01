function makePhiTable(size) {
	const delta = 7 / size;
	const table = [];
	for (let i = 0, x = 0; i < size; i++, x+= delta) {
		const expx = Math.exp(x);
		const phi = (x === 0) ? 8 : Math.log((expx + 1) / (expx - 1));
		table.push(phi);
		//console.log(`${x}: ${phi}`);
	}
	return table;
}

const phiTable = makePhiTable(1000);

function calcPhi(x) {
	if (x >= 7) {
		return 0;
	}
	const idx = (x * 142) | 0;
	return phiTable[idx];
}

//console.log(calcPhi(5));

module.exports = calcPhi;


