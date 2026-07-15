import Swiper from "swiper";
import { Navigation } from "swiper/modules";

export default {
	init() {
		const blocks = document.querySelectorAll(".block-team-experts");
		if (!blocks.length) return;

		blocks.forEach((block) => initTeamExpertsBlock(block));
	},
};

function initTeamExpertsBlock(block) {
	const tabs = block.querySelectorAll(".block-team-experts__tab");
	const panels = block.querySelectorAll(".block-team-experts__panel");
	const swipers = new Map();

	function initPanelSwiper(panel) {
		if (swipers.has(panel)) return;

		const swiperEl = panel.querySelector(".block-team-experts__swiper");
		if (!swiperEl) return;

		const nextEl = panel.querySelector(".block-team-experts__next");
		const slidesCount = swiperEl.querySelectorAll(".swiper-slide").length;

		const swiper = new Swiper(swiperEl, {
			modules: [Navigation],
			slidesPerView: 1.15,
			spaceBetween: 20,
			loop: slidesCount > 2,
			navigation: nextEl ? { nextEl } : false,
			breakpoints: {
				576: { slidesPerView: 2, spaceBetween: 20 },
			},
		});

		swipers.set(panel, swiper);
	}

	function showPanel(panel) {
		panels.forEach((p) => p.classList.remove("is-active"));
		panel.classList.add("is-active");

		initPanelSwiper(panel);
		swipers.get(panel)?.update();
	}

	const activePanel = block.querySelector(".block-team-experts__panel.is-active");
	if (activePanel) initPanelSwiper(activePanel);

	tabs.forEach((tab) => {
		tab.addEventListener("click", () => {
			const targetPanel = block.querySelector(`#${tab.dataset.target}`);
			if (!targetPanel) return;

			tabs.forEach((t) => {
				t.classList.remove("is-active");
				t.setAttribute("aria-selected", "false");
			});
			tab.classList.add("is-active");
			tab.setAttribute("aria-selected", "true");

			showPanel(targetPanel);
		});
	});
}
