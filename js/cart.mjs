import {
	getDistrictsByProvinceID,
	getWardsByDistrictsID,
	getProvincesFromApi,
} from "./address.mjs";
import {
	getItemCartFromLocalstorage,
	saveItemCartFromLocalstorage,
	getListSpFromLocalstorage,
} from "./localStorage.mjs";

import calculatePriceProduct from "./arrayPrototype.mjs";

function getByIdSP(id) {
	const listDataLocal = getListSpFromLocalstorage();
	const findProduct = listDataLocal.find((product) => {
		return product.id === id;
	});

	return findProduct;
}

function renderCartItem() {
	const cartItemLocal = getItemCartFromLocalstorage();
	if (cartItemLocal) {
		const dataCartItem = cartItemLocal;

		const cartItemHtml = dataCartItem.map((item) => {
			const product = getByIdSP(item.id);
			return `<tr class="cart__table__item">
			<td>
				<div class="cart__table__imgProduct">
					<img src="${product.image}"
							 alt="product cart">
					<p>
						<span>${product.name}</span>
						<span>Quanlity: ${product.quanlity}</span>
					</p>
				</div>
			</td>
			<td>
				<div class="cart__table__item--quanlity">
					<button type="button"><i class="fa-solid fa-minus"></i></button>
					<span>${item.quanlity}</span>
					<button type="button"><i class="fa-solid fa-plus"></i></button>
				</div>
			</td>
			<td>
				$${product.price}
			</td>
			<td>$${product.price * item.quanlity}</td>
			<td class="cart__table__item--clear">
				<button><i class="fa-regular fa-circle-xmark"></i></button>
			</td>
		</tr>
		`;
		});

		return cartItemHtml;
	} else {
		return `<div class="cart__empty">
      <img src="https://assets.materialup.com/uploads/16e7d0ed-140b-4f86-9b7e-d9d1c04edb2b/preview.png" alt="cart">
      <button><a href="./index.html">Back to shoping</a></button>
    </div>`;
	}
}

function renderCartTable(cartItem) {
	const cartBox = document.querySelector(".cart");
	const dataCartItem = getItemCartFromLocalstorage();
	if (dataCartItem) {
		const cartFillterFromLocal = dataCartItem.map((item) => {
			let product = getByIdSP(item.id);
			return {
				quanlity: item.quanlity,
				price: product.price,
			};
		});
		const totalMap = cartFillterFromLocal.calculatePriceProduct();
		const cartTableHtml = `<table class="cart__table">
        <thead class="cart__table__head">
          <tr>
            <th scope="col">Product name</th>
            <th scope="col">Quanlity</th>
            <th scope="col">Subtotal</th>
            <th scope="col">Total</th>
            <th scope="col">Clear cart</th>
          </tr>
        </thead>
        <tbody class="cart__table__body">
          ${cartItem.join("")}
        </tbody>
      </table>
      <div class="cart__total">
        <p>
          <span>Quanlity: ${totalMap.get("totalQuanlity")}</span>
          <span>Total: $${totalMap.get("totalPrice")}</span>
        </p>
      </div>`;
		if (cartBox) {
			cartBox.innerHTML = cartTableHtml;
		}
	}
}

function updateSelectAddressUI(data, selector) {
	const selectTag = document.querySelector(selector);
	if (selectTag) {
		data.forEach((element) => {
			let optionTag = document.createElement("option");
			optionTag.setAttribute("value", element.code);
			optionTag.textContent = element.name;
			selectTag.appendChild(optionTag);
		});
	}
}

(function () {
	let cartItem = renderCartItem();
	renderCartTable(cartItem);

	// const btnOpenDialog = document.querySelector("#btnOpenDialog");
	// btnOpenDialog.addEventListener("click", () => {
	// 	const buyDialog = document.querySelector(".buyDialog");
	// 	buyDialog.classList.add("buyDialog--active");
	// });

	// const btnCloseDialog = document.querySelectorAll(".btnCloseDialog");
})();
