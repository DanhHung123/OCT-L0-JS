function renderListProduct(listProduct) {
	const productBox = document.querySelector(".products");
	const listProductHtml = listProduct.map((product) => {
		return `<div class="products__item">
      <div class="products__item__img">
        <img src="${product.image}"
             alt="product">
        <button class="btn" type="button" onclick="addSP(${
					product.id
				},1)"><i class="fa-solid fa-cart-plus"></i></button>
      </div>
      <div class="products__item__content">
        <h3>${product.name}</h3>
        <p>
          <span>${formatPrice(product.price)}</span>
          <span>Quanlity: ${product.quanlity}</span>
        </p>
      </div>
    </div>`;
	});
	if (productBox) {
		productBox.innerHTML = listProductHtml.join("");
	}
}

(function () {
	const listProductLocal = myLibary.getListSpFromLocalstorage();
	if (!listProductLocal) {
		myLibary.saveListDataToLocalstorage(listData);
	}
	let listProduct = myLibary.getListSpFromLocalstorage();
	renderListProduct(listProduct);
})();
