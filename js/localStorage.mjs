const keyLocalStorageListSP = "DANHSACHSP";
const keyLocalStorageItemCart = "DANSACHITEMCART";

function saveListDataToLocalstorage(listData) {
	if (Array.isArray(listData)) {
		let listDataToString = JSON.stringify(listData);
		localStorage.setItem(keyLocalStorageListSP, listDataToString);
	}
}

function getListSpFromLocalstorage() {
	let listData = JSON.parse(localStorage.getItem(keyLocalStorageListSP));
	return listData;
}

function getItemCartFromLocalstorage() {
	let localStorageItemCart = JSON.parse(
		localStorage.getItem(keyLocalStorageItemCart)
	);
	return localStorageItemCart;
}

function saveItemCartFromLocalstorage(arrItemCart) {
	localStorage.setItem(keyLocalStorageItemCart, JSON.stringify(arrItemCart));
}

export {
	saveListDataToLocalstorage,
	getItemCartFromLocalstorage,
	getListSpFromLocalstorage,
	saveItemCartFromLocalstorage,
};
