import { useBlockProps } from "@wordpress/block-editor";

const chunk = (arr, size) => {
	const chunks = [];
	for (let i = 0; i < arr.length; i += size) {
		chunks.push(arr.slice(i, i + size));
	}
	return chunks;
};

const Save = (props) => {
	const { attributes, className } = props;
	const {
		items,
		beforeLabel,
		afterLabel,
		spaceBetween,
		rowGap,
		speed,
		autoplay,
		autoplayDelay,
	} = attributes;

	const blockProps = useBlockProps.save({
		className: ["block-before-after-carousel", className].join(" "),
	});

	const carouselData = JSON.stringify({
		spaceBetween,
		speed,
		autoplay,
		autoplayDelay,
	});

	const renderTile = (label, url, alt) => (
		<div className="block-before-after-carousel__tile">
			{label && (
				<span className="block-before-after-carousel__badge">{label}</span>
			)}
			<img src={url} alt={alt || label} />
		</div>
	);

	const cards = items && items.length > 0 ? chunk(items, 2) : [];

	return (
		<div {...blockProps}>
			<div className="block-before-after-carousel__wrap">
				<button
					type="button"
					className="block-before-after-carousel__nav block-before-after-carousel__nav--prev"
					aria-label="Previous"
				></button>

				<div
					className="swiper block-before-after-carousel__inner"
					data-carousel={carouselData}
				>
					{cards.length > 0 && (
						<div className="swiper-wrapper">
							{cards.map((card, cardIndex) => (
								<div key={cardIndex} className="swiper-slide">
									<div
										className="block-before-after-carousel__card"
										style={{ gap: `${rowGap}px` }}
									>
										{card.map((item, pairIndex) => (
											<div
												key={pairIndex}
												className="block-before-after-carousel__pair"
											>
												{renderTile(beforeLabel, item.beforeUrl, item.beforeAlt)}
												{renderTile(afterLabel, item.afterUrl, item.afterAlt)}
											</div>
										))}
									</div>
								</div>
							))}
						</div>
					)}
				</div>

				<button
					type="button"
					className="block-before-after-carousel__nav block-before-after-carousel__nav--next"
					aria-label="Next"
				></button>
			</div>
		</div>
	);
};

export default Save;
