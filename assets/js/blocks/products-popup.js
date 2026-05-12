export default {
	init() {
		const cards  = document.querySelectorAll(".product-card");
		const popups = document.querySelectorAll(".product-popup");

		if (!cards.length || !popups.length) return;

		/* ── Open ────────────────────────────────────── */
		cards.forEach((card) => {
			card.addEventListener("click", () => openPopup(card.dataset.productId));

			card.addEventListener("keydown", (e) => {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault();
					openPopup(card.dataset.productId);
				}
			});
		});

		/* ── Close: overlay click or close button ─────── */
		popups.forEach((popup) => {
			popup
				.querySelector(".product-popup__close")
				?.addEventListener("click", closeAll);

			popup.addEventListener("click", (e) => {
				if (!e.target.closest(".product-popup__panel")) closeAll();
			});

			initGallery(popup);
		});

		/* ── Close: Escape ───────────────────────────── */
		document.addEventListener("keydown", (e) => {
			if (e.key === "Escape") closeAll();
		});

		/* ── Helpers ─────────────────────────────────── */
		function openPopup(id) {
			const target = document.querySelector(`.product-popup[data-id="${id}"]`);
			if (!target) return;

			closeAll(false);
			target.classList.add("is-active");

			const panel = target.querySelector(".product-popup__panel");
			if (panel) panel.scrollTop = 0;

			document.body.style.overflow = "hidden";

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

		/* ── Gallery carousel ────────────────────────── */
		function initGallery(popup) {
			const gallery = popup.querySelector(".product-popup__gallery");
			if (!gallery) return;

			const slides  = Array.from(gallery.querySelectorAll(".product-popup__gallery-slide"));
			const dots    = Array.from(gallery.querySelectorAll(".product-popup__gallery-dot"));
			const prevBtn = gallery.querySelector(".product-popup__gallery-nav--prev");
			const nextBtn = gallery.querySelector(".product-popup__gallery-nav--next");

			if (slides.length <= 1) return;

			let current = 0;

			function goTo(index) {
				slides[current].classList.remove("is-active");
				dots[current]?.classList.remove("is-active");
				current = (index + slides.length) % slides.length;
				slides[current].classList.add("is-active");
				dots[current]?.classList.add("is-active");
			}

			prevBtn?.addEventListener("click", (e) => { e.stopPropagation(); goTo(current - 1); });
			nextBtn?.addEventListener("click", (e) => { e.stopPropagation(); goTo(current + 1); });
			dots.forEach((dot, i) => dot.addEventListener("click", (e) => { e.stopPropagation(); goTo(i); }));

			/* reset to slide 0 when popup opens */
			popup.addEventListener("transitionend", () => {
				if (!popup.classList.contains("is-active")) goTo(0);
			}, { passive: true });
		}
	},
};
