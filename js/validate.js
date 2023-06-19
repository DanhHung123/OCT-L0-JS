const validateInputCheck = {
	firstName: true,
	lastName: true,
	email: true,
	phone: true,
	houseNumber: true,
	province: true,
	district: true,
	ward: true,
};

function toogleDisableBtnSubmit(key, value) {
	validateInputCheck[key] = value;
	const btnSubmit = document.querySelector("#btnBuySubmit");

	const isValidateAll = () => {
		let check = false;
		Object.values(validateInputCheck).forEach((item) => {
			if (item) {
				check = true;
			}
		});
		return check;
	};

	if (isValidateAll()) {
		btnSubmit.classList.add("btn__Submit--disable");
	} else {
		btnSubmit.classList.remove("btn__Submit--disable");
	}

	return isValidateAll();
}

function validateFirstName() {
	const regexName = /^[\p{L} ]+$/u;
	const firstName = document.querySelector("#buyDialog__input__firstName");
	const firstNameError = document.querySelector(
		"#buyDialog__input__firstName ~ .buyDialog__form__error"
	);
	if (firstName.value.trim() === "") {
		firstNameError.textContent = "Vui lòng nhập họ!";
		toogleDisableBtnSubmit("firstName", true);
		firstName.value = "";
	} else if (!regexName.test(firstName.value)) {
		firstNameError.textContent = "Họ không được có số và kí tự đặc biệt!";
		toogleDisableBtnSubmit("firstName", true);
	} else {
		firstNameError.textContent = "";
		toogleDisableBtnSubmit("firstName", false);
	}
}

function validateLastName() {
	const regexName = /^[\p{L} ]+$/u;
	const lastName = document.querySelector("#buyDialog__input__lastName");
	const lastNameError = document.querySelector(
		"#buyDialog__input__lastName ~ .buyDialog__form__error"
	);

	if (lastName.value.trim() === "") {
		lastNameError.textContent = "Vui lòng nhập tên!";
		toogleDisableBtnSubmit("lastName", true);
		lastName.value = "";
	} else if (!regexName.test(lastName.value)) {
		lastNameError.textContent = "Tên không được có số và kí tự đặc biệt!";
		toogleDisableBtnSubmit("lastName", true);
	} else {
		lastNameError.textContent = "";
		toogleDisableBtnSubmit("lastName", false);
	}
}

function validateEmail() {
	const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const email = document.querySelector("#buyDialog__input__email");
	const emailError = document.querySelector(
		"#buyDialog__input__email ~ .buyDialog__form__error"
	);
	if (email.value.trim() === "") {
		emailError.textContent = "Vui lòng nhập email!";
		toogleDisableBtnSubmit("email", true);
		email.value = "";
	} else if (!regexEmail.test(email.value)) {
		emailError.textContent = "Email phải có kiểu abc@mail.acb!";
		toogleDisableBtnSubmit("email", true);
	} else {
		emailError.textContent = "";
		toogleDisableBtnSubmit("email", false);
	}
}

function validatePhone() {
	const regexPhone = /^\d{10}$/;
	const phone = document.querySelector("#buyDialog__input__phone");
	const phoneError = document.querySelector(
		"#buyDialog__input__phone ~ .buyDialog__form__error"
	);

	if (phone.value.trim() === "") {
		phoneError.textContent = "Vui lòng nhập số điện thoại!";
		toogleDisableBtnSubmit("phone", true);
		phone.value = "";
	} else if (!regexPhone.test(phone.value)) {
		phoneError.textContent = "Số điện thoại gồm 10 kí tự và là số!";
		toogleDisableBtnSubmit("phone", true);
	} else {
		phoneError.textContent = "";
		toogleDisableBtnSubmit("phone", false);
	}
}

function validateHouseNumber() {
	const regexHouseNumber = /^[0-9]+$/;
	const houseNumber = document.querySelector("#buyDialog__input__houseNumber");
	const houseNumberError = document.querySelector(
		"#buyDialog__input__houseNumber ~ .buyDialog__form__error"
	);

	if (houseNumber.value.trim() === "") {
		houseNumberError.textContent = "Vui lòng nhập số nhà!";
		toogleDisableBtnSubmit("houseNumber", true);
		houseNumber.value = "";
	} else if (!regexHouseNumber.test(houseNumber.value)) {
		houseNumberError.textContent = "Số nhà phải là số!";
		toogleDisableBtnSubmit("houseNumber", true);
	} else {
		houseNumberError.textContent = "";
		toogleDisableBtnSubmit("houseNumber", false);
	}
}

function validateAddress() {
	const province = document.querySelector("#selectProvince");
	const provinceError = document.querySelector(
		"#selectProvince ~ .buyDialog__form__error"
	);
	const district = document.querySelector("#selectDistrict");
	const districtError = document.querySelector(
		"#selectDistrict ~ .buyDialog__form__error"
	);
	const ward = document.querySelector("#selectWard");
	const wardError = document.querySelector(
		"#selectWard ~ .buyDialog__form__error"
	);

	if (province.value === "none") {
		toogleDisableBtnSubmit("province", true);
		provinceError.textContent = "Vui lòng chọn tỉnh/thành phố!";
	} else {
		provinceError.textContent = "";
		toogleDisableBtnSubmit("province", false);
	}

	if (district.value === "none") {
		toogleDisableBtnSubmit("district", true);
		districtError.textContent = "Vui lòng chọn quận/huyện!";
	} else {
		districtError.textContent = "";
		toogleDisableBtnSubmit("district", false);
	}

	if (ward.value === "none") {
		toogleDisableBtnSubmit("ward", true);
		wardError.textContent = "Vui lòng chọn phường/xã!";
	} else {
		wardError.textContent = "";
		toogleDisableBtnSubmit("ward", false);
	}
}

(function () {
	const firstName = document.querySelector("#buyDialog__input__firstName");
	const lastName = document.querySelector("#buyDialog__input__lastName");
	const email = document.querySelector("#buyDialog__input__email");
	const phone = document.querySelector("#buyDialog__input__phone");
	const houseNumber = document.querySelector("#buyDialog__input__houseNumber");
	const province = document.querySelector("#selectProvince");
	const district = document.querySelector("#selectDistrict");
	const ward = document.querySelector("#selectWard");

	province.addEventListener("change", () => {
		district.value = "none";
		ward.value = "none";
	});

	district.addEventListener("change", () => {
		ward.value = "none";
	});

	firstName.addEventListener("change", validateFirstName);
	firstName.addEventListener("keyup", validateFirstName);
	firstName.addEventListener("blur", validateFirstName);

	lastName.addEventListener("blur", validateLastName);
	lastName.addEventListener("keyup", validateLastName);
	lastName.addEventListener("change", validateLastName);

	email.addEventListener("blur", validateEmail);
	email.addEventListener("change", validateEmail);
	email.addEventListener("keyup", validateEmail);

	phone.addEventListener("blur", validatePhone);
	phone.addEventListener("change", validatePhone);
	phone.addEventListener("keyup", validatePhone);

	province.addEventListener("blur", validateAddress);
	province.addEventListener("input", validateAddress);
	province.addEventListener("click", validateAddress);
	province.addEventListener("change", validateAddress);

	district.addEventListener("blur", validateAddress);
	district.addEventListener("input", validateAddress);
	district.addEventListener("click", validateAddress);
	district.addEventListener("change", validateAddress);

	ward.addEventListener("blur", validateAddress);
	ward.addEventListener("input", validateAddress);
	ward.addEventListener("click", validateAddress);
	ward.addEventListener("change", validateAddress);

	houseNumber.addEventListener("blur", validateHouseNumber);
	houseNumber.addEventListener("change", validateHouseNumber);
	houseNumber.addEventListener("keyup", validateHouseNumber);
})();
