export default {
	init() {
		const triggers = document.querySelectorAll(".popup-trigger-btn[data-popup-target]");
		if (!triggers.length) return;

		// Move all popups to <body> to escape stacking-context issues
		document.querySelectorAll(".popup-overlay").forEach((overlay) => {
			document.body.appendChild(overlay);
			// Remove the HTML 'hidden' attribute — visibility is managed by CSS class
			overlay.removeAttribute("hidden");
		});

		// ── Open ────────────────────────────────────────────────────────────────
		triggers.forEach((btn) => {
			btn.addEventListener("click", () => openPopup(btn.dataset.popupTarget));

			btn.addEventListener("keydown", (e) => {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault();
					openPopup(btn.dataset.popupTarget);
				}
			});
		});

		// ── Close: overlay backdrop click ────────────────────────────────────────
		document.addEventListener("click", (e) => {
			const overlay = e.target.closest(".popup-overlay");
			if (overlay && overlay.classList.contains("is-active")) {
				if (!e.target.closest(".popup-panel")) {
					closeAll();
				}
			}
		});

		// ── Close: close button click ─────────────────────────────────────────────
		document.addEventListener("click", (e) => {
			if (e.target.closest(".popup-close")) closeAll();
		});

		// ── Close: Escape key ─────────────────────────────────────────────────────
		document.addEventListener("keydown", (e) => {
			if (e.key === "Escape") closeAll();
		});

		// ── Helpers ───────────────────────────────────────────────────────────────
		function openPopup(id) {
			const overlay = document.getElementById(`popup-${id}`);
			if (!overlay) return;

			closeAll(false);

			overlay.classList.add("is-active");

			// Reset scroll to top
			const panel = overlay.querySelector(".popup-panel");
			if (panel) panel.scrollTop = 0;

			// Lock background scroll
			document.body.style.overflow = "hidden";
			if (window.lenis) window.lenis.stop();

			// Focus first focusable element inside panel for accessibility
			requestAnimationFrame(() => {
				const focusable = overlay.querySelector(
					'.popup-close, button, [href], input, [tabindex]:not([tabindex="-1"])'
				);
				focusable?.focus();
			});

			// Trap focus within popup
			overlay.addEventListener("keydown", trapFocus);
		}

		function closeAll(restoreScroll = true) {
			document.querySelectorAll(".popup-overlay.is-active").forEach((overlay) => {
				overlay.classList.remove("is-active");
				overlay.removeEventListener("keydown", trapFocus);
			});

			if (restoreScroll) {
				document.body.style.overflow = "";
				if (window.lenis) window.lenis.start();
			}
		}

		function trapFocus(e) {
			if (e.key !== "Tab") return;

			const overlay = e.currentTarget;
			const focusableEls = Array.from(
				overlay.querySelectorAll(
					'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
				)
			).filter((el) => !el.disabled && el.offsetParent !== null);

			if (!focusableEls.length) return;

			const first = focusableEls[0];
			const last = focusableEls[focusableEls.length - 1];

			if (e.shiftKey) {
				if (document.activeElement === first) {
					e.preventDefault();
					last.focus();
				}
			} else {
				if (document.activeElement === last) {
					e.preventDefault();
					first.focus();
				}
			}
		}
	},
};
