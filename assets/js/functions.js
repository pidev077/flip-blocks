import { gsap } from "gsap";
import SplitText from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(SplitText, ScrollTrigger);

export default {
	init() {
		hanldeTeamItem();
		initAnimationFadeInText();
		initTextBottomToUpAnim();
		scrollpi();
	},
};

function hanldeTeamItem() {
	const teamList = document.querySelector(".block-teams__list");
	if (!teamList) return;

	teamList.addEventListener("mousemove", (e) => {
		const _t = e.target.closest(".team-card");
		if (!_t) return;

		let r = _t.getBoundingClientRect(),
			x = e.clientX - r.x,
			y = e.clientY - r.y;

		_t.style.setProperty("--x", `${x}px`);
		_t.style.setProperty("--y", `${y}px`);

		updateMedia(_t);
	});

	teamList.addEventListener(
		"mouseleave",
		(e) => {
			const item = e.target.closest(".team-card");
			if (!item) return;

			resetVideo(item);
		},
		true,
	);

	function updateMedia(item) {
		if (item.dataset.loaded === "true") return;

		const type = item.dataset.mediaType;
		const media = item.dataset.media;
		if (!type || !media) return;

		if (type === "image") {
			const img = item.querySelector(".team-item-media img");
			if (img) {
				img.src = media;
			}
		}

		if (type === "video") {
			const video = item.querySelector("video");
			if (!video) return;

			const source = video.querySelector("source");
			if (source) {
				source.src = media;
				video.load();
			}

			video.play?.();
		}

		item.dataset.loaded = "true";
	}

	function resetVideo(item) {
		const video = item.querySelector("video");
		if (!video) return;

		video.pause();
		video.currentTime = 0;

		item.dataset.loaded = "false";
	}
}

function scrollpi() {
	const images = document.querySelectorAll(".wp-block-image img");

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("is-visible");
					observer.unobserve(entry.target);
				}
			});
		},
		{
			threshold: 0.2,
		},
	);

	images.forEach((img) => observer.observe(img));
}

function initAnimationFadeInText() {
	const elements = document.querySelectorAll(
		".wp-block-heading-stagger-random",
	);
	if (!elements.length) return;

	const delay = 0;
	const duration = 1;

	elements.forEach((el) => {
		gsap.set(el, { opacity: 0, y: 40 });

		gsap.to(el, {
			opacity: 1,
			y: 0,
			duration: duration,
			ease: "power3.out",
			delay: delay,
			scrollTrigger: {
				trigger: el,
				start: "top 80%",
				once: true,
			},
		});
	});
}

function initTextBottomToUpAnim() {
	const elements = document.querySelectorAll(".wp-block-heading-fadein-chars");
	if (!elements.length) return;

	const delay = 0;
	const duration = 1;

	elements.forEach((el) => {
		gsap.set(el, { opacity: 0, y: 40 });

		gsap.to(el, {
			opacity: 1,
			y: 0,
			duration: duration,
			ease: "power3.out",
			delay: delay,
			scrollTrigger: {
				trigger: el,
				start: "top 85%",
				once: true,
			},
		});
	});
}
