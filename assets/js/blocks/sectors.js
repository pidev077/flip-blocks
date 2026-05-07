export default {
	init() {
		if (window.innerWidth < 768) return;
		const items = document.querySelectorAll(".sector-item");
		const floating = document.querySelector(".sector-floating-media");
		const img = floating?.querySelector("img");

		if (!items.length || !floating) return;

		items[0].classList.add("is-active");

		if (items[0].dataset.img) {
			img.src = items[0].dataset.img;
		}

		moveToItem(items[0]);

		items.forEach((item) => {
			item.addEventListener("mouseenter", () => {
				items.forEach((i) => i.classList.remove("is-active"));
				item.classList.add("is-active");

				if (item.dataset.img) {
					img.src = item.dataset.img;
				}

				moveToItem(item);
			});
		});

		function moveToItem(item) {
			const itemOffset = item.offsetTop;
			const itemHeight = item.offsetHeight;
			const topPosition = itemOffset + itemHeight / 2;

			floating.style.transform = `translate(-50%, ${topPosition}px) translateY(-50%)`;
		}
	},
};
