function getProvincesFromApi() {
	fetch("https://provinces.open-api.vn/api/p/")
		.then((respose) => {
			return respose.json();
		})
		.catch((error) => {
			return error;
		});
}

function getDistrictsByProvinceID(id) {
	fetch(`https://provinces.open-api.vn/api/p/${id}?depth=2`)
		.then((respose) => {
			return respose.json();
		})
		.catch((error) => {
			return error;
		});
}

function getWardsByDistrictsID(id) {
	fetch(`https://provinces.open-api.vn/api/d/${id}?depth=2`)
		.then((respose) => {
			return respose.json();
		})
		.catch((error) => {
			return error;
		});
}
