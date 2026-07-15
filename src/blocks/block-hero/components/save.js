import { useBlockProps } from "@wordpress/block-editor";
import Background from "./background";

const Save = (props) => {
	const { attributes, className } = props;
	const {
		overlay,
		scrollAnchor,
		autoplay,
		autoplaySpeed,
		speed,
		loop,
		heightVh,
		slides = [],
	} = attributes;

	const blockProps = useBlockProps.save({
		id: scrollAnchor || undefined,
		className: [
			"hero-block",
			`${overlay ? "hero-overlay" : ""}`,
			className,
		].join(" "),
		style: { "--hero-vh": heightVh },
	});

	const carouselData = { autoplay, autoplaySpeed, speed, loop };

	return (
		<div {...blockProps}>
			<div
				className="hero-block__swiper swiper"
				data-carousel={JSON.stringify(carouselData)}
			>
				<div className="swiper-wrapper">
					{slides.map((slide, index) => (
						<div
							className="swiper-slide hero-block__slide"
							key={slide.id || index}
						>
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
										{slide.title}
									</h1>

									{!!slide.description && (
										<p className="hero-block__desc">
											{slide.description}
										</p>
									)}

									{!!slide.buttonText && (
										<div className="hero-block__actions">
											<a
												href={slide.buttonLink?.url || "#"}
												target={
													slide.buttonLink?.opensInNewTab
														? "_blank"
														: undefined
												}
												rel={
													slide.buttonLink?.opensInNewTab
														? "noopener noreferrer"
														: undefined
												}
												className="hero-block__btn"
											>
												{slide.buttonText}
											</a>
										</div>
									)}
								</div>
							</div>
						</div>
					))}
				</div>

				{slides.length > 1 && (
					<div className="container hero-block__nav-wrap">
						<div className="hero-block__pagination swiper-pagination"></div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Save;
