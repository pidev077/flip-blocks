import { useBlockProps } from "@wordpress/block-editor";

const Save = (props) => {
	const { attributes, className } = props;
	const {
		items,
		slidesPerView,
		spaceBetween,
		speed,
		loop,
		autoplay,
		autoplayDelay,
	} = attributes;

	const blockProps = useBlockProps.save({
		className: ["block-product-carousel", className].join(" "),
	});

	const carouselData = JSON.stringify({
		slidesPerView,
		spaceBetween,
		speed,
		loop,
		autoplay,
		autoplayDelay,
	});

	return (
		<div {...blockProps}>
			<div className="image-container">
				<div className="fade-image type01"></div>
				<div className="fade-image type02"></div>
			</div>
			<div className="container">
				<div
					className="swiper block-product-carousel__inner"
					data-carousel={carouselData}
				>
					{items && items.length > 0 && (
						<div className="swiper-wrapper">
							{items.map((item, index) =>
								item.link ? (
									<div key={index} className="swiper-slide">
										<a
											href={item.link}
											target={item.linkTarget || "_self"}
											rel={
												item.linkTarget === "_blank"
													? "noopener noreferrer"
													: undefined
											}
											className="block-product-carousel__item"
										>
											<img
												src={item.url}
												alt={item.alt || item.name || `Product ${index + 1}`}
											/>
											{item.name && (
												<div className="block-product-carousel__name">
													{item.name}
												</div>
											)}
										</a>
									</div>
								) : (
									<div key={index} className="swiper-slide">
										<div className="block-product-carousel__item">
											<img
												src={item.url}
												alt={item.alt || item.name || `Product ${index + 1}`}
											/>
											{item.name && (
												<div className="block-product-carousel__name">
													{item.name}
												</div>
											)}
										</div>
									</div>
								)
							)}
						</div>
					)}
					<div className="swiper-button-prev"></div>
					<div className="swiper-button-next"></div>
				</div>
			</div>
		</div>
	);
};

export default Save;
