function getProvincesFromApi() {
	return fetch("https://provinces.open-api.vn/api/p/")
		.then((respose) => {
			return respose.json();
		})
		.catch((error) => {
			throw error;
		});
}

function getDistrictsByProvinceID(id) {
	return fetch(`https://provinces.open-api.vn/api/p/${id}?depth=2`)
		.then((respose) => {
			return respose.json();
		})
		.catch((error) => {
			throw error;
		});
}

function getWardsByDistrictsID(id) {
	return fetch(`https://provinces.open-api.vn/api/d/${id}?depth=2`)
		.then((respose) => {
			return respose.json();
		})
		.catch((error) => {
			throw error;
		});
}

function updateSelectAddressUI(data, selectorNode) {
	if (selectorNode) {
		selectorNode.innerHTML = "";
		data.forEach((element) => {
			let optionTag = document.createElement("option");
			optionTag.setAttribute("value", element.code);
			optionTag.textContent = element.name;
			selectorNode.appendChild(optionTag);
		});
	}
}

async function updateProvinces() {
	try {
		const provinces = await getProvincesFromApi();
		const selectorProvince = document.querySelector("#selectProvince");
		updateSelectAddressUI(provinces, selectorProvince);
		selectorProvince.addEventListener("change", (event) => {
			updateDistricts(event.target.value);
		});
		updateDistricts(selectorProvince.value);
	} catch (error) {
		console.log(error);
	}
}

async function updateDistricts(id) {
	try {
		const data = await getDistrictsByProvinceID(id);
		const selectorDistricts = document.querySelector("#selectDistrict");
		updateSelectAddressUI(data.districts, selectorDistricts);
		selectorDistricts.addEventListener("change", (event) => {
			updateWards(event.target.value);
		});
		updateWards(selectorDistricts.value);
	} catch (error) {
		console.log(error);
	}
}

async function updateWards(id) {
	try {
		const data = await getWardsByDistrictsID(id);
		const selectorWards = document.querySelector("#selectWard");
		updateSelectAddressUI(data.wards, selectorWards);
	} catch (error) {
		console.log(error);
	}
}
