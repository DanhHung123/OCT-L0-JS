const updateProductAfterBuy = () => {
	const cartLocal = myLibary.getItemCartFromLocalstorage();
	const productLocal = myLibary.getListSpFromLocalstorage();
	const listProduct = productLocal.map((product) => {
		const cartItemById = cartLocal.find((item) => product.id === item.id);
		if (cartItemById) {
			return {
				id: product.id,
				name: product.name,
				image: product.image,
				quanlity: product.quanlity - cartItemById.quanlity,
				price: product.price,
			};
		}
		return product;
	});

	myLibary.saveListDataToLocalstorage(listProduct);
};

const createNewBill = () => {
	const firstName = document.querySelector(
		"#buyDialog__input__firstName"
	).value;
	const lastName = document.querySelector("#buyDialog__input__lastName").value;
	const email = document.querySelector("#buyDialog__input__email").value;
	const phone = document.querySelector("#buyDialog__input__phone").value;
	const houseNumber = document.querySelector(
		"#buyDialog__input__houseNumber"
	).value;
	const message = document.querySelector("#buyDialog__input__mess").value;
	const province =
		document.querySelector("#selectProvince").children[1].textContent;
	const district =
		document.querySelector("#selectDistrict").children[1].textContent;
	const ward = document.querySelector("#selectWard").children[1].textContent;

	myLibary.generateRandomId();
	const randomId = myLibary.getRandomIdFromLocal();

	const cartLocal = myLibary.getItemCartFromLocalstorage();
	const listProduct = cartLocal.map((item) => {
		let product = getByIdSP(item.id);
		return {
			id: item.id,
			name: product.name,
			image: product.image,
			quanlity: item.quanlity,
			price: product.price,
		};
	});

	const today = new Date();
	return {
		id: randomId,
		fullName: firstName + " " + lastName,
		email: email,
		phone: phone,
		address: ward + ", " + district + ", " + province,
		houseNumber: houseNumber,
		message: message.trim(),
		date:
			today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear(),
		products: listProduct,
	};
};

const postBillToServer = async () => {
	const bill = createNewBill();
	try {
		await myLibary.postBillApi(bill);
		updateProductAfterBuy();
		myLibary.clearCartLocal();
		notify("SUCCESS");
	} catch (error) {
		console.error(error);
		notify("ERROR");
	}
};

const updateProductAfterReturn = (bill) => {
	const listProductLocal = myLibary.getListSpFromLocalstorage();
	const productUpdate = listProductLocal.map((product) => {
		let productBill = bill.products.find((item) => product.id === item.id);
		if (productBill) {
			return {
				id: product.id,
				name: product.name,
				image: product.image,
				quanlity: product.quanlity + productBill.quanlity,
				price: product.price,
			};
		}
		return product;
	});
	myLibary.saveListDataToLocalstorage(productUpdate);
};

const returnBill = async (idBill) => {
	let comfirmReturn = confirm("Bạn muốn trả hàng ?");
	if (comfirmReturn) {
		try {
			const bill = await myLibary.getBillById(idBill);
			updateProductAfterReturn(bill);
			await myLibary.deleteBillApi(idBill);
			notify("RETURN");
		} catch {
			console.error(error);
			notify("ERROR");
		}
	}
};

const renderBillItem = async () => {
	try {
		const bills = await myLibary.getBills();
		const billItems = bills.map((bill) => {
			let productMap = bill.products.calculatePriceProduct();
			return `<tr>
				<td class="bill__code">
					${bill.id}
					<button class="bill__detail__btn">Detail <span><i class="fa-solid fa-caret-down"></i></button>
					<div class="bill__detail bill__detail--hidden">
						<div class="bill__detail__customer">
							<h3>Thông tin khách hàng</h3>
							<p>Họ và tên: ${bill.fullName}</p>
							<p>Số điện thoại: ${bill.phone}</p>
							<p>Địa chỉ: ${bill.address}</p>
							<p>Số nhà: ${bill.houseNumber}</p>
							<p>Ghi chú: ${bill.message ? bill.message : "..."}</p>
						</div>
						<div class="bill__detail__product">
							<h3>Thông tin sản phẩm</h3>
							<div>
								${bill.products
									.map((product) => {
										return `<div class="bill__detail__item">
											<img
												src="${product.image}"
												alt="bill detail">
											<p>
												<span>${product.name}</span>
												<span>Quanlity: ${product.quanlity}</span>
											</p>
										</div>`;
									})
									.join("")}
							</div>
						</div>
					</div>
				</td>
				<td>${bill.fullName}</td>
				<td>${bill.date}</td>
				<td>${bill.products.length}</td>
				<td>${productMap.get("totalQuanlity")}</td>
				<td>${formatPrice(productMap.get("totalPrice"))}</td>
				<td class="bill__return">
					<button type="button" 
					onclick="returnBill('${bill.id}')">
					<i class="fa-regular fa-rectangle-xmark"></i>
					</button>
				</td>
			</tr>`;
		});

		renderBillUI(billItems);
	} catch (error) {
		console.error(error);
		notify("ERROR");
	}
};

const renderBillUI = (billItems) => {
	const billBox = document.querySelector(".bill");

	const billHtml = (function () {
		if (Array.isArray(billItems) && billItems.length > 0) {
			return `<table>
					<thead>
						<tr>
							<th scope="col">Code</th>
							<th scope="col">Customer Name</th>
							<th scope="col">Date</th>
							<th scope="col">Items Number</th>
							<th scope="col">Total Quanlity</th>
							<th scope="col">Total Price</th>
							<th scope="col">Return</th>
						</tr>
					</thead>
					<tbody class="bill__body">
						${billItems.join("")}
					</tbody>
				</table>`;
		} else if (billItems.length === 0) {
			return `<div class="bill__empty">
					<img src="https://i.pinimg.com/originals/ae/8a/c2/ae8ac2fa217d23aadcc913989fcc34a2.png" alt="bill empty">
					<button type="button"><a href="./index.html">Back to shopping</a></button>
				</div>`;
		}
	})();

	billBox.innerHTML = billHtml;

	const billDetailBtns = document.querySelectorAll(".bill__detail__btn");
	if (billDetailBtns) {
		billDetailBtns.forEach((btn) => {
			btn.addEventListener("click", () => {
				btn.nextElementSibling.classList.toggle("bill__detail--hidden");
			});
			document.addEventListener("click", (event) => {
				if (event.target !== btn && event.target !== btn.nextElementSibling) {
					btn.nextElementSibling.classList.add("bill__detail--hidden");
				}
			});
		});
	}
};

(function () {
	const btnBuySubmit = document.querySelector("#btnBuySubmit");
	if (btnBuySubmit) {
		btnBuySubmit.addEventListener("click", () => {
			if (btnBuySubmit.classList.contains("btn__Submit--disable")) {
				notify("BANBUY");
			} else {
				postBillToServer();
			}
		});
	}

	const billBox = document.querySelector(".bill");
	if (billBox) {
		renderBillUI(renderBillItem());
	}
})();
