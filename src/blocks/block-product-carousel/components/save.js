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

	const renderItem = (item, index) => {
		const inner = (
			<>
				<div className="block-product-carousel__img-wrap">
					<img
						src={item.url}
						alt={item.alt || item.name || `Product ${index + 1}`}
					/>
				</div>
				{(item.brand || item.name) && (
					<div className="block-product-carousel__info">
						{item.brand && (
							<span className="block-product-carousel__brand">{item.brand}</span>
						)}
						{item.name && (
							<h3 className="block-product-carousel__name">{item.name}</h3>
						)}
					</div>
				)}
			</>
		);

		return (
			<div key={index} className="swiper-slide">
				{item.link ? (
					<a
						href={item.link}
						target={item.linkTarget || "_self"}
						rel={item.linkTarget === "_blank" ? "noopener noreferrer" : undefined}
						className="block-product-carousel__item"
					>
						{inner}
					</a>
				) : (
					<div className="block-product-carousel__item">{inner}</div>
				)}
			</div>
		);
	};

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
							{items.map((item, index) => renderItem(item, index))}
						</div>
					)}

					<div className="swiper-pagination"></div>
					<div className="swiper-button-prev"></div>
					<div className="swiper-button-next"></div>
				</div>
			</div>
		</div>
	);
};

export default Save;
