const keyLocalStorageListSP = "DANHSACHSP";
const keyLocalStorageItemCart = "DANSACHITEMCART";
const keyLocalStorageRandomId = "RANDOMID";
const API = "http://localhost:3000/bills";

(function () {
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

	function saveRandomIdToLocal(randomId) {
		localStorage.setItem(keyLocalStorageRandomId, randomId);
	}

	function getRandomIdFromLocal() {
		let randomId = localStorage.getItem(keyLocalStorageRandomId);
		return randomId;
	}

	function clearCartLocal() {
		localStorage.removeItem(keyLocalStorageItemCart);
	}

	const getBills = () => {
		return fetch(API)
			.then((respose) => {
				return respose.json();
			})
			.catch((error) => {
				throw error;
			});
	};

	const getBillById = (id) => {
		return fetch(`${API}/${id}`)
			.then((respose) => {
				return respose.json();
			})
			.catch((error) => {
				throw error;
			});
	};

	const postBillApi = (bill) => {
		return fetch(API, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(bill),
		})
			.then((respose) => {
				return respose.ok;
			})
			.catch((error) => {
				throw error;
			});
	};

	const deleteBillApi = (id) => {
		return fetch(`${API}/${id}`, {
			method: "DELETE",
		})
			.then((response) => {
				return response.ok;
			})
			.catch((error) => {
				throw error;
			});
	};

	const checkUniqueId = async (id) => {
		try {
			const bills = await getBills();
			bills.forEach((bill) => {
				if (bill.id === id) {
					return true;
				}
			});
			return false;
		} catch (error) {
			console.log("error");
		}
	};

	const generateRandomId = async () => {
		const characters =
			"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		let randomId = "";

		function generateId() {
			for (let i = 0; i < 10; i++) {
				let randomIndex = Math.floor(Math.random() * characters.length);
				randomId += characters[randomIndex];
			}
		}

		generateId();

		while (await checkUniqueId(randomId)) {
			randomId = "";
			generateId();
		}

		saveRandomIdToLocal(randomId);
	};

	window.myLibary = {
		saveListDataToLocalstorage,
		getListSpFromLocalstorage,
		getItemCartFromLocalstorage,
		saveItemCartFromLocalstorage,
		getRandomIdFromLocal,
		clearCartLocal,
		getBillById,
		getBills,
		postBillApi,
		deleteBillApi,
		generateRandomId,
	};
})();
