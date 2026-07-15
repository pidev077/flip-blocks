import { __ } from "@wordpress/i18n";
import { useBlockProps } from "@wordpress/block-editor";
import { Fragment, useState, useEffect, useRef } from "@wordpress/element";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectFade, Autoplay } from "swiper/modules";
import Inspector from "./inspector";
import Background from "./background";

const Edit = (props) => {
	const { attributes, className } = props;
	const {
		overlay,
		speed,
		loop,
		autoplay,
		autoplaySpeed,
		heightVh,
		slides = [],
	} = attributes;
	const [active, setActive] = useState(0);
	const paginationRef = useRef(null);

	// Mirror the frontend's speed floor (assets/js/blocks/carousel-slider.js)
	// so the fade reads the same in the editor preview as on the live site.
	const effectiveSpeed = Math.max(speed ?? 1100, 1000);

	useEffect(() => {
		if (!slides[active]) setActive(0);
	}, [slides]);

	const blockProps = useBlockProps({
		className: [
			"hero-block",
			`${overlay ? "hero-overlay" : ""}`,
			className,
		].join(" "),
		style: { "--hero-vh": heightVh },
	});

	const hasMultipleSlides = slides.length > 1;

	return (
		<Fragment>
			<Inspector {...props} active={active} setActive={setActive} />
			<div {...blockProps}>
				<Swiper
					className="hero-block__swiper"
					modules={[Pagination, EffectFade, Autoplay]}
					effect="fade"
					fadeEffect={{ crossFade: true }}
					speed={effectiveSpeed}
					// `loop` was replaced with `rewind` on the frontend (same
					// "go back to slide 1 after the last one" result without
					// the DOM-cloning that caused a flash with effect:"fade");
					// mirrored here so editor and frontend navigate the same way.
					rewind={loop && hasMultipleSlides}
					grabCursor
					autoplay={
						autoplay && hasMultipleSlides
							? { delay: autoplaySpeed ?? 6000, disableOnInteraction: false }
							: false
					}
					pagination={
						hasMultipleSlides
							? { el: paginationRef.current, clickable: true }
							: false
					}
					onBeforeInit={(swiper) => {
						if (!hasMultipleSlides) return;
						swiper.params.pagination.el = paginationRef.current;
					}}
					onSlideChange={(swiper) => setActive(swiper.realIndex)}
					key={slides.length}
				>
					{slides.map((slide, index) => (
						<SwiperSlide className="hero-block__slide" key={slide.id || index}>
							<Background slide={slide} />

							<div className="container">
								<div
									className="hero-block-content"
									style={{ color: slide.colorText }}
								>
									{!!slide.label && (
										<span
											className="hero-block__label"
											style={slide.labelColor ? { color: slide.labelColor } : undefined}
										>
											{slide.label}
										</span>
									)}

									<h1
										className="hero-block__title"
										style={{ color: slide.titleColor }}
									>
										{slide.title || __("Tiêu đề (nhập ở sidebar)", "flip-blocks")}
									</h1>

									{!!slide.description && (
										<p className="hero-block__desc">
											{slide.description}
										</p>
									)}

									{!!slide.buttonText && (
										<div className="hero-block__actions">
											<span className="hero-block__btn">
												{slide.buttonText}
											</span>
										</div>
									)}
								</div>
							</div>
						</SwiperSlide>
					))}

					{hasMultipleSlides && (
						<div className="container hero-block__nav-wrap">
							<div
								className="hero-block__pagination swiper-pagination"
								ref={paginationRef}
							></div>
						</div>
					)}
				</Swiper>
			</div>
		</Fragment>
	);
};

export default Edit;
