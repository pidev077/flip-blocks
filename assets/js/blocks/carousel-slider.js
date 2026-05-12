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
		testimonialsCarousel();
		logoCarousel();
		galleryCarousel();
		productCarousel();
	},
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
				0:    { slidesPerView: 1.2, spaceBetween: 16 },
				640:  { slidesPerView: 2,   spaceBetween: 20 },
				1024: { slidesPerView: slidesPerView, spaceBetween: data.spaceBetween || 30 },
			},
		});
	});
}
