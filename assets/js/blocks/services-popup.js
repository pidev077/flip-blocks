export default {
	init() {
		const cards  = document.querySelectorAll(".service-card");
		const popups = document.querySelectorAll(".service-popup");

		if (!cards.length || !popups.length) return;

		/* ── Open ────────────────────────────────────── */
		cards.forEach((card) => {
			card.addEventListener("click", () => openPopup(card.dataset.serviceId));

			card.addEventListener("keydown", (e) => {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault();
					openPopup(card.dataset.serviceId);
				}
			});
		});

		/* ── Close: click close button ──────────────── */
		popups.forEach((popup) => {
			popup
				.querySelector(".service-popup__close")
				?.addEventListener("click", closeAll);

			/* Click on popup background (outside panel) */
			popup.addEventListener("click", (e) => {
				if (!e.target.closest(".service-popup__panel")) closeAll();
			});
		});

		/* ── Close: Escape key ───────────────────────── */
		document.addEventListener("keydown", (e) => {
			if (e.key === "Escape") closeAll();
		});

		/* ── Helpers ────────────────────────────────── */
		function openPopup(id) {
			const target = document.querySelector(`.service-popup[data-id="${id}"]`);
			if (!target) return;

			closeAll(false);

			target.classList.add("is-active");

			// reset panel scroll to top (scroll is on the panel, not the wrapper)
			const panel = target.querySelector(".service-popup__panel");
			if (panel) panel.scrollTop = 0;

			// lock background page scroll without stopping Lenis entirely
			document.body.style.overflow = "hidden";

			// focus first focusable inside panel
			const firstFocusable = target.querySelector(
				'button, [href], input, [tabindex]:not([tabindex="-1"])'
			);
			firstFocusable?.focus();
		}

		function closeAll(restoreScroll = true) {
			popups.forEach((p) => p.classList.remove("is-active"));

			if (restoreScroll) {
				document.body.style.overflow = "";
				if (window.lenis) window.lenis.start();
			}
		}
	},
};
