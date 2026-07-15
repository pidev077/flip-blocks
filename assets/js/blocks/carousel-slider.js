import Swiper from "swiper";
import {
	Navigation,
	Pagination,
	Scrollbar,
	EffectFade,
	Autoplay,
	EffectCube,
	EffectCoverflow,
	EffectFlip,
} from "swiper/modules";

export default {
	init() {
		heroCarousel();
		testimonialsCarousel();
		logoCarousel();
		galleryCarousel();
		productCarousel();
		beforeAfterCarousel();
	},
};

const heroCarousel = () => {
	const $blocks = document.querySelectorAll(".hero-block");
	if (!$blocks.length) return;

	$blocks.forEach(($block) => {
		const swiperEl = $block.querySelector(".hero-block__swiper");
		if (!swiperEl) return;

		const dataStr = swiperEl.getAttribute("data-carousel");
		const data = dataStr ? JSON.parse(dataStr) : {};
		const paginationEl = $block.querySelector(".swiper-pagination");

		const totalSlides = swiperEl.querySelectorAll(
			".swiper-wrapper > .hero-block__slide"
		).length;

		// Floor the speed so the fade always has enough time to read as a
		// smooth cross-dissolve instead of an abrupt cut, even for hero
		// blocks saved before this default was raised.
		const speed = Math.max(data.speed ?? 1100, 1000);

		const swiper = new Swiper(swiperEl, {
			modules: [Pagination, EffectFade],
			slidesPerView: 1,
			effect: "fade",
			fadeEffect: { crossFade: true },
			speed,
			// Swiper's `loop:true` clones the first/last slides into the DOM
			// so the translate-based "slide" effect can wrap continuously.
			// effect:"fade" never needs that continuity (it can cross-fade
			// directly between any two indices), and mid-transition it would
			// swap the real slide out for its clone, which is what read as a
			// flash/flicker right before the next image settled in. `rewind`
			// gives the same "go back to slide 1 after the last one" result
			// for manual/keyboard navigation without cloning anything, so
			// there's nothing for the fade to glitch on.
			rewind: data.loop !== false,
			keyboard: true,
			grabCursor: true,
			pagination: {
				el: paginationEl,
				// Handled manually below via slideTo() so bullet clicks map
				// 1:1 to real slide indices.
				clickable: false,
			},
			// Driven manually below instead of the built-in Autoplay module
			// so the interval logic stays identical regardless of Swiper's
			// internal transition bookkeeping.
			autoplay: false,
		});

		paginationEl?.addEventListener("click", (e) => {
			const bulletEl = e.target.closest(".swiper-pagination-bullet");
			if (!bulletEl) return;
			const index = [...paginationEl.querySelectorAll(".swiper-pagination-bullet")].indexOf(bulletEl);
			if (index > -1) swiper.slideTo(index);
		});

		if (data.autoplay && totalSlides > 1) {
			const delay = data.autoplaySpeed ?? 6000;
			setInterval(() => {
				swiper.slideTo((swiper.activeIndex + 1) % totalSlides);
			}, delay);
		}
	});
};

const testimonialsCarousel = () => {
	const $blocks = document.querySelectorAll(".block-testimonials-carousel");
	if (!$blocks.length) return;

	$blocks.forEach(($block, index) => {
		const swiperEl = $block.querySelector(".testimonials-carousel");
		const sliderDataStr = swiperEl.getAttribute("data-carousel");
		const sliderData = JSON.parse(sliderDataStr);
		const navContainer = $block.querySelector(
			".block-testimonials-carousel__nav"
		);

		const swiper = new Swiper(swiperEl, {
			modules: [Pagination, Autoplay, EffectFade, Navigation],
			slidesPerView: 1.1,
			spaceBetween: 20,
			loop: sliderData.infinite || false,
			speed: sliderData.speed ?? 500,
			keyboard: true,
			slideToClickedSlide: false,
			grabCursor: true,
			parallax: true,
			folowFinger: false,
			autoplay: sliderData.autoplay
				? {
						delay: sliderData.autoplaySpeed ?? 3000,
						disableOnInteraction: false,
				  }
				: false,
			navigation: {
				nextEl: navContainer?.querySelector(".swiper-button-next"),
				prevEl: navContainer?.querySelector(".swiper-button-prev"),
			},
			breakpoints: {
				1200: {
					slidesPerView: "auto",
				},
				1023: {
					slidesPerView: 1.5,
				},
				768: {
					slidesPerView: 1.25,
				},
			},
		});
	});
};

function logoCarousel() {
	const carousel = document.querySelector(".block-logo-carousel .swiper");
	if (!carousel) return;

	const speed = parseInt(carousel.dataset.speed) || 5000;
	const spaceBetween = parseInt(carousel.dataset.spacebetween) || 100;

	const swiper = new Swiper(carousel, {
		modules: [Autoplay],
		loop: true,
		slidesPerView: "auto",
		spaceBetween: 48,
		centeredSlides: true,
		speed: speed,
		autoplay: {
			delay: 0,
			disableOnInteraction: false,
		},
		allowTouchMove: false,
		breakpoints: {
			768: {
				spaceBetween: 80,
			},
			1024: {
				spaceBetween: spaceBetween,
			},
		},
	});
}

function galleryCarousel() {
	const carousel = document.querySelector(".block-gallery-carousel .swiper");
	if (!carousel) return;

	const speed = parseInt(carousel.dataset.speed) || 5000;
	const spaceBetween = parseInt(carousel.dataset.spacebetween) || 20;

	const swiper = new Swiper(carousel, {
		modules: [Autoplay],
		loop: true,
		slidesPerView: "auto",
		spaceBetween: spaceBetween,
		centeredSlides: true,
		speed: speed,
		autoplay: {
			delay: 0,
			disableOnInteraction: false,
		},
		allowTouchMove: false,
	});
}

function productCarousel() {
	const $blocks = document.querySelectorAll(".block-product-carousel");
	if (!$blocks.length) return;

	$blocks.forEach(($block) => {
		const swiperEl = $block.querySelector(".swiper");
		if (!swiperEl) return;

		const dataStr = swiperEl.getAttribute("data-carousel");
		const data = dataStr ? JSON.parse(dataStr) : {};

		const slidesPerView = data.slidesPerView || 3;

		new Swiper(swiperEl, {
			modules: [Navigation, Pagination, Autoplay],
			slidesPerView: slidesPerView,
			spaceBetween: data.spaceBetween || 30,
			speed: data.speed || 500,
			loop: data.loop !== false,
			grabCursor: true,
			navigation: {
				nextEl: swiperEl.querySelector(".swiper-button-next"),
				prevEl: swiperEl.querySelector(".swiper-button-prev"),
			},
			pagination: {
				el: swiperEl.querySelector(".swiper-pagination"),
				clickable: true,
				type: "bullets",
			},
			autoplay: data.autoplay
				? { delay: data.autoplayDelay || 3000, disableOnInteraction: false }
				: false,
			breakpoints: {
				0:    { slidesPerView: 1, spaceBetween: 0, centeredSlides: true },
				640:  { slidesPerView: 2, spaceBetween: 20, centeredSlides: false },
				1024: { slidesPerView: slidesPerView, spaceBetween: data.spaceBetween || 30, centeredSlides: false },
			},
		});
	});
}

function beforeAfterCarousel() {
	const $blocks = document.querySelectorAll(".block-before-after-carousel");
	if (!$blocks.length) return;

	$blocks.forEach(($block) => {
		const swiperEl = $block.querySelector(".block-before-after-carousel__inner");
		if (!swiperEl) return;

		const dataStr = swiperEl.getAttribute("data-carousel");
		const data = dataStr ? JSON.parse(dataStr) : {};

		new Swiper(swiperEl, {
			modules: [Navigation, Autoplay],
			slidesPerView: 2,
			spaceBetween: data.spaceBetween || 24,
			speed: data.speed || 500,
			loop: false,
			grabCursor: true,
			navigation: {
				nextEl: $block.querySelector(".block-before-after-carousel__nav--next"),
				prevEl: $block.querySelector(".block-before-after-carousel__nav--prev"),
			},
			autoplay: data.autoplay
				? { delay: data.autoplayDelay || 4000, disableOnInteraction: false }
				: false,
			breakpoints: {
				0:    { slidesPerView: 1, spaceBetween: data.spaceBetween || 16 },
				640:  { slidesPerView: 2, spaceBetween: data.spaceBetween || 24 },
			},
		});
	});
}
