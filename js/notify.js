function notify(type) {
	const notifyBox = document.querySelector(".notify");

	const listType = {
		INFOR: {
			icon: "<i class='fa-solid fa-circle-exclamation'></i>",
			message: "Thêm sản phẩm vào giỏ hàng thành công!",
			class: "notify--infor",
		},
		DELETE: {
			icon: "<i class='fa-solid fa-trash-can'></i>",
			message: "Xóa sản phẩm thành công !",
			class: "notify--delete",
		},
		QUANLITY: {
			icon: "<i class='fa-solid fa-ban'></i>",
			message: "Số lượng sản phẩm đạt tới giới hạn!",
			class: "notify--delete",
		},
		ERROR: {
			icon: "<i class='fa-solid fa-triangle-exclamation'></i>",
			message: "Lỗi! Hãy thử lại sau!",
			class: "notify--delete",
		},
		SUCCESS: {
			icon: "<i class='fa-solid fa-circle-check'></i>",
			message: "Đặt hàng thành công !",
			class: "notify--success",
		},
		RETURN: {
			icon: "<i class='fa-solid fa-right-left'></i>",
			message: "Trả hàng thành công !",
			class: "notify--delete",
		},
		BANBUY: {
			icon: "<i class='fa-solid fa-ban'></i>",
			message: "Vui lòng nhập thông tin đúng theo yêu cầu!",
			class: "notify--delete",
		},
	};

	let notifyItem = document.createElement("div");

	const autoRemoveNotifyId = setTimeout(() => {
		notifyBox.removeChild(notifyItem);
	}, 2000);

	notifyItem.onclick = (event) => {
		if (event.target.closest(".notify__button")) {
			notifyBox.removeChild(notifyItem);
			clearTimeout(autoRemoveNotifyId);
		}
	};

	notifyItem.classList.add("notify__item", listType[type].class);
	notifyItem.innerHTML = `<div class="notify__icon">
    <span>${listType[type].icon}</span>
  </div>
  <div class="notify__message">
    <p>${listType[type].message}</p>
  </div>
  <div class="notify__button">
    <button type="button"><i class='fa-solid fa-xmark'></i></button>
  </div>`;

	notifyBox.appendChild(notifyItem);
}
