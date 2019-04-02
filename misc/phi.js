


function calcPhi(x) {
	if (x < 0) {
		console.log("Error!! " + x);
	}
	else if (x <= 10) {
		const xp = Math.pow(x, 0.864);
		const pow = -0.4527 * xp + 0.0218;
		const v = Math.exp(pow);
		return v;
	} else {
		const pi2 = Math.PI * Math.PI;
		const c = 1 - pi2 / (8 * x);
		const exp = Math.exp(-x / 4);
		const sqrt = Math.sqrt(Math.PI / x);
		const v = sqrt * exp * c;
		return v
	}
}


function testme() {
	const delta = 0.01;
	for (let x = 0.0; x < 20 ; x += 0.01) {
		const y = calcPhi(x);
		console.log(`x: ${x}  y: ${y}`);
	}
}

testme();
