import Swiper from "swiper";
import { Navigation } from "swiper/modules";

/**
 * Wires up the category tabs + Swiper carousel for a single
 * ".block-team-experts" root element. Shared between the frontend
 * bundle (assets/js/blocks/team-experts.js) and the block editor
 * preview (src/blocks/block-team-experts/components/edit.js) so the
 * two stay in sync.
 */
export function initTeamExpertsBlock(block) {
	// Guard against re-running on the same DOM node: Swiper's own loop mode
	// clones slides into the wrapper, which can retrigger a MutationObserver
	// (used to catch the block editor's ServerSideRender preview mounting).
	// Without this, re-init would double-bind tab click handlers and try to
	// re-create an already-initialized Swiper instance.
	if (block.dataset.teamExpertsInit === "true") return;
	block.dataset.teamExpertsInit = "true";

	const tabs = block.querySelectorAll(".block-team-experts__tab");
	const panels = block.querySelectorAll(".block-team-experts__panel");

	function initPanelSwiper(panel) {
		const swiperEl = panel.querySelector(".block-team-experts__swiper");
		if (!swiperEl || swiperEl.swiper) return;

		const nextEl = panel.querySelector(".block-team-experts__next");
		const slidesCount = swiperEl.querySelectorAll(".swiper-slide").length;

		new Swiper(swiperEl, {
			modules: [Navigation],
			slidesPerView: 2,
			spaceBetween: 12,
			loop: slidesCount > 2,
			navigation: nextEl ? { nextEl } : false,
			breakpoints: {
				576: { spaceBetween: 20 },
			},
		});
	}

	function showPanel(panel) {
		panels.forEach((p) => p.classList.remove("is-active"));
		panel.classList.add("is-active");

		initPanelSwiper(panel);
		panel.querySelector(".block-team-experts__swiper")?.swiper?.update();
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

export default {
	init() {
		const blocks = document.querySelectorAll(".block-team-experts");
		if (!blocks.length) return;

		blocks.forEach((block) => initTeamExpertsBlock(block));
	},
};
