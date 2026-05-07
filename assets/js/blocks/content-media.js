export default {
	init() {
		const initBlock = (wrapper) => {
			const left = wrapper.querySelector(".thumb-list");
			const indicator = left?.querySelector(".active-indicator");
			const activeItem = wrapper.querySelector(".content-item.is-active");
			const mainImage = wrapper.querySelector(".main-image");

			if (!left || !indicator || !activeItem || !mainImage) return;

			// SET IMAGE BAN ĐẦU
			const url = activeItem.getAttribute("data-media");
			if (url) mainImage.src = url;

			// MOVE INDICATOR
			const itemRect = activeItem.getBoundingClientRect();
			const leftRect = left.getBoundingClientRect();

			indicator.style.height = `${itemRect.height}px`;
			indicator.style.transform = `translateY(${
				itemRect.top - leftRect.top
			}px)`;
		};

		// ======================
		// CLICK EVENT
		// ======================
		document.addEventListener("click", (e) => {
			const item = e.target.closest(".flip-content-media .content-item");
			if (!item) return;

			const wrapper = item.closest(".flip-content-media");
			if (!wrapper) return;

			const left = wrapper.querySelector(".thumb-list");
			const indicator = left?.querySelector(".active-indicator");
			const mainImage = wrapper.querySelector(".main-image");

			if (!indicator || !left || !mainImage) return;

			// ACTIVE
			wrapper
				.querySelectorAll(".content-item")
				.forEach((el) => el.classList.remove("is-active"));
			item.classList.add("is-active");

			// MOVE INDICATOR
			const itemRect = item.getBoundingClientRect();
			const leftRect = left.getBoundingClientRect();

			indicator.style.height = `${itemRect.height}px`;
			indicator.style.transform = `translateY(${
				itemRect.top - leftRect.top
			}px)`;

			// SWAP IMAGE
			const url = item.getAttribute("data-media");
			if (url) mainImage.src = url;
		});

		// ======================
		// INIT ON LOAD
		// ======================
		window.addEventListener("load", () => {
			document
				.querySelectorAll(".flip-content-media")
				.forEach((wrapper) => initBlock(wrapper));
		});
	},
};