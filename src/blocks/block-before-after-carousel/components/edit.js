import { __ } from "@wordpress/i18n";
import { Fragment, useState } from "@wordpress/element";
import { useBlockProps } from "@wordpress/block-editor";
import { Swiper, SwiperSlide } from "swiper/react";
import Inspector from "./inspector";

const chunk = (arr, size) => {
	const chunks = [];
	for (let i = 0; i < arr.length; i += size) {
		chunks.push(arr.slice(i, i + size));
	}
	return chunks;
};

const Edit = (props) => {
	const { attributes, className } = props;
	const { items, beforeLabel, afterLabel, spaceBetween, rowGap, speed } =
		attributes;
	const [swiperInstance, setSwiperInstance] = useState(null);

	const blockProps = useBlockProps({
		className: ["block-before-after-carousel", className].join(" "),
	});

	const renderTile = (label, url, alt) => (
		<div className="block-before-after-carousel__tile">
			{label && (
				<span className="block-before-after-carousel__badge">{label}</span>
			)}
			{url ? (
				<img src={url} alt={alt || label} />
			) : (
				<div className="block-before-after-carousel__placeholder">
					<span className="dashicons dashicons-format-image" />
				</div>
			)}
		</div>
	);

	const cards = chunk(items, 2);

	return (
		<Fragment>
			<Inspector {...props} />
			<div {...blockProps}>
				{items.length === 0 ? (
					<div className="block-before-after-carousel__empty">
						<span className="dashicons dashicons-images-alt2"></span>
						<p>
							{__(
								"Add before/after image pairs via the sidebar to get started.",
								"flip-blocks"
							)}
						</p>
					</div>
				) : (
					<div className="block-before-after-carousel__wrap">
						<button
							type="button"
							className="block-before-after-carousel__nav block-before-after-carousel__nav--prev"
							aria-label="Previous"
							onClick={() => swiperInstance?.slidePrev()}
						></button>

						<Swiper
							className="block-before-after-carousel__inner"
							slidesPerView={2}
							spaceBetween={spaceBetween}
							speed={speed}
							onSwiper={setSwiperInstance}
							key={`${spaceBetween}-${speed}-${items.length}`}
						>
							{cards.map((card, cardIndex) => (
								<SwiperSlide key={cardIndex}>
									<div
										className="block-before-after-carousel__card"
										style={{ gap: rowGap }}
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
								</SwiperSlide>
							))}
						</Swiper>

						<button
							type="button"
							className="block-before-after-carousel__nav block-before-after-carousel__nav--next"
							aria-label="Next"
							onClick={() => swiperInstance?.slideNext()}
						></button>
					</div>
				)}
			</div>
		</Fragment>
	);
};

export default Edit;
