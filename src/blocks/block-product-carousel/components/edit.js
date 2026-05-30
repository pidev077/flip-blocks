import { __ } from "@wordpress/i18n";
import { Fragment } from "@wordpress/element";
import { useBlockProps, RichText } from "@wordpress/block-editor";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Inspector from "./inspector";

const Edit = (props) => {
	const { attributes, setAttributes, className } = props;
	const { items, slidesPerView, spaceBetween, speed, loop, title, titleColor, backgroundColor } = attributes;

	const blockProps = useBlockProps({
		className: ["block-product-carousel", className].join(" "),
		style: { backgroundColor },
	});

	return (
		<Fragment>
			<Inspector {...props} />
			<div {...blockProps}>
				{title && (
					<div className="block-product-carousel__title-wrap">
						<RichText
							tagName="h2"
							className="block-product-carousel__title"
							style={{ color: titleColor }}
							value={title}
							onChange={(value) => setAttributes({ title: value })}
							placeholder={__("Our Product", "flip-blocks")}
							allowedFormats={[]}
						/>
					</div>
				)}
				<div className="image-container">
					<div className="fade-image type01"></div>
					<div className="fade-image type02"></div>
				</div>
				<div className="container">
					{items.length === 0 ? (
						<div className="block-product-carousel__placeholder">
							<span className="dashicons dashicons-format-gallery"></span>
							<p>
								{__(
									"Add products via the sidebar to get started.",
									"flip-blocks"
								)}
							</p>
						</div>
					) : (
						<Swiper
							className="block-product-carousel__swiper"
							modules={[Navigation]}
							slidesPerView={slidesPerView}
							spaceBetween={spaceBetween}
							speed={speed}
							loop={loop && items.length > slidesPerView}
							navigation={true}
							key={`${slidesPerView}-${spaceBetween}-${speed}-${items.length}`}
						>
							{items.map((item, index) => (
								<SwiperSlide key={index}>
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
								</SwiperSlide>
							))}
						</Swiper>
					)}
				</div>
			</div>
		</Fragment>
	);
};

export default Edit;
