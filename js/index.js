import {
	getListSpFromLocalstorage,
	saveListDataToLocalstorage,
	getItemCartFromLocalstorage,
} from "./localStorage.mjs";
import listData from "./data.mjs";

function addSP(idSp, quanlity) {
	const dataCartLocal = getItemCartFromLocalstorage();
	if (dataCartLocal) {
		let arr = dataCartLocal;
		let isItemCartExist = false;

		for (let i = 0; i < arr.length; i++) {
			if (arr[i].id === idSp) {
				arr[i].quanlity += quanlity;
				isItemCartExist = true;
				break;
			}
		}

		if (!isItemCartExist) {
			let newCartItem = { id: idSp, quanlity: quanlity };
			arr.push(newCartItem);
		}

		saveItemCartFromLocalstorage(arr);
	} else {
		let newCart = [{ id: idSp, quanlity: quanlity }];
		saveItemCartFromLocalstorage(newCart);
	}
}

function renderListProduct(listProduct) {
	const productBox = document.querySelector(".products");
	const listProductHtml = listProduct.map((product) => {
		return `<div class="products__item">
      <div class="products__item__img">
        <img src="${product.image}"
             alt="product">
        <button class="btn" type="button" onclick="addSP(${product.id},1)"><i class="fa-solid fa-cart-plus"></i></button>
      </div>
      <div class="products__item__content">
        <h3>${product.name}</h3>
        <p>
          <span>$${product.price}</span>
          <span>Quanlity: ${product.quanlity}</span>
        </p>
      </div>
    </div>`;
	});
	if (productBox) {
		productBox.innerHTML = listProductHtml.join("");
		// const listButon = document.querySelectorAll(".btn");
		// listButon.forEach((item) => {
		// 	item.addEventListener("click", addSP(idSp, quanlity))
		// })
	}
}

// (function () {

// })();

saveListDataToLocalstorage(listData);
let listProduct = getListSpFromLocalstorage();
renderListProduct(listProduct);
