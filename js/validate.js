const validateInputCheck = {
	firstName: true,
	lastName: true,
	email: true,
	phone: true,
	houseNumber: true,
};

function changeValidateInputCheck(key, value) {
	validateInputCheck[key] = value;
}

function toogleDisableBtnSubmit() {
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
}

function validateFirstName() {
	const regexName = /^[a-zA-Z\s]+$/;
	const firstName = document.querySelector("#buyDialog__input__firstName");
	const firstNameError = document.querySelector(
		"#buyDialog__input__firstName ~ .buyDialog__form__error"
	);
	if (firstName.value === "") {
		firstNameError.textContent = "Vui lòng nhập họ!";
		changeValidateInputCheck("firstName", true);
	} else if (!regexName.test(firstName.value)) {
		firstNameError.textContent = "Họ không được có số và kí tự đặc biệt!";
		changeValidateInputCheck("firstName", true);
	} else {
		firstNameError.textContent = "";
		changeValidateInputCheck("firstName", false);
	}
}

function validateLastName() {
	const regexName = /^[a-zA-Z\s]+$/;
	const lastName = document.querySelector("#buyDialog__input__lastName");
	const lastNameError = document.querySelector(
		"#buyDialog__input__lastName ~ .buyDialog__form__error"
	);

	if (lastName.value === "") {
		lastNameError.textContent = "Vui lòng nhập tên!";
		changeValidateInputCheck("lastName", true);
	} else if (!regexName.test(lastName.value)) {
		lastNameError.textContent = "Tên không được có số và kí tự đặc biệt!";
		changeValidateInputCheck("lastName", true);
	} else {
		lastNameError.textContent = "";
		changeValidateInputCheck("lastName", false);
	}
}

function validateEmail() {
	const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const email = document.querySelector("#buyDialog__input__email");
	const emailError = document.querySelector(
		"#buyDialog__input__email ~ .buyDialog__form__error"
	);
	if (email.value === "") {
		emailError.textContent = "Vui lòng nhập email!";
		changeValidateInputCheck("email", true);
	} else if (!regexEmail.test(email.value)) {
		emailError.textContent = "Email phải có kiểu abc@mail.acb!";
		changeValidateInputCheck("email", true);
	} else {
		emailError.textContent = "";
		changeValidateInputCheck("email", false);
	}
}

function validatePhone() {
	const regexPhone = /^\d{10}$/;
	const phone = document.querySelector("#buyDialog__input__phone");
	const phoneError = document.querySelector(
		"#buyDialog__input__phone ~ .buyDialog__form__error"
	);

	if (phone.value === "") {
		phoneError.textContent = "Vui lòng nhập số điện thoại!";
		changeValidateInputCheck("phone", true);
	} else if (!regexPhone.test(phone.value)) {
		phoneError.textContent = "Số điện thoại gồm 10 kí tự và là số!";
		changeValidateInputCheck("phone", true);
	} else {
		phoneError.textContent = "";
		changeValidateInputCheck("phone", false);
	}
}

function validateHouseNumber() {
	const regexHouseNumber = /^[0-9]+$/;
	const houseNumber = document.querySelector("#buyDialog__input__houseNumber");
	const houseNumberError = document.querySelector(
		"#buyDialog__input__houseNumber ~ .buyDialog__form__error"
	);

	if (houseNumber.value === "") {
		houseNumberError.textContent = "Vui lòng nhập số nhà!";
		changeValidateInputCheck("houseNumber", true);
	} else if (!regexHouseNumber.test(houseNumber.value)) {
		houseNumberError.textContent = "Số nhà phải là số!";
		changeValidateInputCheck("houseNumber", true);
	} else {
		houseNumberError.textContent = "";
		changeValidateInputCheck("houseNumber", false);
	}
}

(function () {
	const firstName = document.querySelector("#buyDialog__input__firstName");
	const lastName = document.querySelector("#buyDialog__input__lastName");
	const email = document.querySelector("#buyDialog__input__email");
	const phone = document.querySelector("#buyDialog__input__phone");
	const houseNumber = document.querySelector("#buyDialog__input__houseNumber");

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

	houseNumber.addEventListener("blur", validateHouseNumber);
	houseNumber.addEventListener("change", validateHouseNumber);
	houseNumber.addEventListener("keyup", validateHouseNumber);

	firstName.addEventListener("change", toogleDisableBtnSubmit);
	firstName.addEventListener("blur", toogleDisableBtnSubmit);
	firstName.addEventListener("keyup", toogleDisableBtnSubmit);

	lastName.addEventListener("blur", toogleDisableBtnSubmit);
	lastName.addEventListener("change", toogleDisableBtnSubmit);
	lastName.addEventListener("keyup", toogleDisableBtnSubmit);

	email.addEventListener("blur", toogleDisableBtnSubmit);
	email.addEventListener("change", toogleDisableBtnSubmit);
	email.addEventListener("keyup", toogleDisableBtnSubmit);

	phone.addEventListener("blur", toogleDisableBtnSubmit);
	phone.addEventListener("change", toogleDisableBtnSubmit);
	phone.addEventListener("keyup", toogleDisableBtnSubmit);

	houseNumber.addEventListener("blur", toogleDisableBtnSubmit);
	houseNumber.addEventListener("change", toogleDisableBtnSubmit);
	houseNumber.addEventListener("keyup", toogleDisableBtnSubmit);
})();
