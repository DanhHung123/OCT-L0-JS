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

function updateSelectAddressUI(data, selectorNode, role) {
	const roleList = {
		Province: "<option selected value='none'>--Chọn Tỉnh/Thành phố--</option>",
		District: "<option selected value='none'>--Chọn Huyện/Quận--</option>",
		Ward: "<option selected value='none'>--Chọn Phường/Xã--</option>",
	};
	if (data) {
		selectorNode.innerHTML = "";
		const optionTagList = data.map((element) => {
			return `<option value=${element.code}>${element.name}</option>`;
		});
		optionTagList.unshift(roleList[role]);
		selectorNode.innerHTML = optionTagList.join("");
	} else {
		selectorNode.innerHTML = roleList[role];
	}
}

async function updateProvinces() {
	try {
		const provinces = await getProvincesFromApi();
		const selectorProvince = document.querySelector("#selectProvince");
		updateSelectAddressUI(provinces, selectorProvince, "Province");
		selectorProvince.addEventListener("change", (event) => {
			updateDistricts(event.target.value);
		});

		if (selectorProvince.value !== "none") {
			updateDistricts(selectorProvince.value);
		}
	} catch (error) {
		console.error(error);
	}
}

async function updateDistricts(id) {
	try {
		const data = await getDistrictsByProvinceID(id);
		const selectorDistricts = document.querySelector("#selectDistrict");
		updateSelectAddressUI(data.districts, selectorDistricts, "District");
		selectorDistricts.addEventListener("change", () => {
			if (selectorDistricts.value !== "none") {
				updateWards(selectorDistricts.value);
			}
		});

		updateWards(selectorDistricts.value);
	} catch (error) {
		console.error(error);
	}
}

async function updateWards(id) {
	try {
		const data = await getWardsByDistrictsID(id);
		const selectorWards = document.querySelector("#selectWard");
		updateSelectAddressUI(data.wards, selectorWards, "Ward");
	} catch (error) {
		console.error(error);
	}
}
