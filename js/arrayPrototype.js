Array.prototype.calculatePriceProduct = function () {
	const totalMap = new Map();

	let totalQuanlity = this.reduce((accumulator, currentValue) => {
		return (accumulator += currentValue.quanlity);
	}, 0);
	totalMap.set("totalQuanlity", totalQuanlity);

	let totalPrice = this.reduce((accumulator, currentValue) => {
		return (accumulator += currentValue.price);
	}, 0);

	totalMap.set("totalPrice", totalPrice);

	return totalMap;
};
