function getByIdSP(id) {
	const listDataLocal = myLibary.getListSpFromLocalstorage();
	const findProduct = listDataLocal.find((product) => {
		return product.id === id;
	});

	return findProduct;
}

function addSP(idSp, quanlity) {
	const dataCartLocal = myLibary.getItemCartFromLocalstorage();
	if (dataCartLocal) {
		let arr = dataCartLocal;
		let isItemCartExist = false;

		for (let i = 0; i < arr.length; i++) {
			if (arr[i].id === idSp) {
				let product = getByIdSP(arr[i].id);
				if (product.quanlity > arr[i].quanlity) {
					arr[i].quanlity += quanlity;
					notify("INFOR");
				} else {
					notify("QUANLITY");
				}
				isItemCartExist = true;
				break;
			}
		}

		if (!isItemCartExist) {
			let product = getByIdSP(idSp);
			if (product.quanlity > 0) {
				let newCartItem = { id: idSp, quanlity: quanlity };
				arr.push(newCartItem);
				notify("INFOR");
			} else {
				notify("QUANLITY");
			}
		}

		myLibary.saveItemCartFromLocalstorage(arr);
	} else {
		let product = getByIdSP(idSp);
		if (product.quanlity > 0) {
			let newCart = [{ id: idSp, quanlity: quanlity }];
			myLibary.saveItemCartFromLocalstorage(newCart);
			notify("INFOR");
		} else {
			notify("QUANLITY");
		}
	}
	renderCartQuanlityHeader();
}

function deleteSp(id) {
	const dataCartLocal = myLibary.getItemCartFromLocalstorage();
	let comfirmDetete = confirm("Bạn muốn xóa sản phẩm này khỏi giỏ hàng ?");
	if (dataCartLocal && comfirmDetete) {
		const cartAfterDelete = dataCartLocal.filter((product) => {
			return product.id !== id;
		});
		myLibary.saveItemCartFromLocalstorage(cartAfterDelete);
		renderCartTable(renderCartItem());
		renderCartQuanlityHeader();
		notify("DELETE");
	}
}

function changeQuanlityProductCart(id, maxQuanlity, quanlity) {
	const dataCartLocal = myLibary.getItemCartFromLocalstorage();

	if (dataCartLocal) {
		const cartItem = dataCartLocal.find((item) => item.id === id);
		let newQuanlity = cartItem.quanlity + quanlity;
		if (newQuanlity > 0 && newQuanlity <= maxQuanlity) {
			cartItem.quanlity = newQuanlity;
		}
		if (newQuanlity > maxQuanlity) {
			notify("QUANLITY");
		}

		if (newQuanlity < 1) {
			deleteSp(id);
		} else {
			const newCartLocal = dataCartLocal.map((item) => {
				if (item.id === id) {
					return cartItem;
				}
				return item;
			});
			myLibary.saveItemCartFromLocalstorage(newCartLocal);
			renderCartTable(renderCartItem());
		}
	}
}

function renderCartItem() {
	const cartItemLocal = myLibary.getItemCartFromLocalstorage();
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
					<button type="button"><i class="fa-solid fa-minus" 
						onclick="changeQuanlityProductCart(${item.id},${product.quanlity},-1)"></i>
					</button>
					<span>${item.quanlity}</span>
					<button type="button"
						onclick="changeQuanlityProductCart(${item.id},${
				product.quanlity
			},1)"><i class="fa-solid fa-plus"></i>
					</button>
				</div>
			</td>
			<td>
				${formatPrice(product.price)}
			</td>
			<td class="cart__table__item--price">${formatPrice(
				product.price * item.quanlity
			)}</td>
			<td class="cart__table__item--clear">
				<button onclick="deleteSp(${
					item.id
				})"><i class="fa-regular fa-circle-xmark"></i></button>
			</td>
		</tr>
		`;
		});

		return cartItemHtml;
	}
}

function renderCartTable(cartItem) {
	const cartBox = document.querySelector(".cart");
	const cartBtnAction = document.querySelector(".cart__BtnAction");
	const dataCartItem = myLibary.getItemCartFromLocalstorage();
	if (dataCartItem && dataCartItem.length > 0) {
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
          <span>Total: ${formatPrice(totalMap.get("totalPrice"))}</span>
        </p>
      </div>`;
		cartBox.innerHTML = cartTableHtml;
		cartBtnAction.classList.remove("cart__BtnAction--hidden");
	} else {
		cartBox.innerHTML = `<div class="cart__empty">
			<img src="https://assets.materialup.com/uploads/16e7d0ed-140b-4f86-9b7e-d9d1c04edb2b/preview.png" alt="cart">
			<button><a href="./index.html">Back to shoping</a></button>
		</div>`;
		cartBtnAction.classList.add("cart__BtnAction--hidden");
	}
}

function renderCartQuanlityHeader() {
	const cartHeader = document.querySelector("#cart__quanlity");
	const dataCartLocal = myLibary.getItemCartFromLocalstorage();
	if (dataCartLocal) {
		cartHeader.innerHTML = dataCartLocal.length;
	} else {
		cartHeader.innerHTML = "0";
	}
}

(function () {
	const cart = document.querySelector(".cart");
	if (cart) {
		renderCartTable(renderCartItem());

		const buyDialog = document.querySelector(".buyDialog");
		const btnOpenDialog = document.querySelector("#btnOpenDialog");
		btnOpenDialog.addEventListener("click", () => {
			buyDialog.classList.add("buyDialog--active");
		});

		const btnCloseDialog = document.querySelectorAll(".btnCloseDialog");
		btnCloseDialog.forEach((btn) => {
			btn.addEventListener("click", () => {
				buyDialog.classList.remove("buyDialog--active");
			});
		});

		updateProvinces();
	}

	renderCartQuanlityHeader();
})();
