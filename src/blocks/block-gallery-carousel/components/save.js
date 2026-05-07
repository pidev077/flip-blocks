import { useBlockProps } from "@wordpress/block-editor";

const Save = (props) => {
	let { attributes, className } = props;

	const { items, spaceBetween, speed } = attributes;

	const blockProps = useBlockProps.save({
		className: ["block-gallery-carousel", className].join(" "),
	});

	const clonedItems = items ? Array(5).fill(items).flat() : [];

	return (
		<div {...blockProps}>
			<div
				className="swiper block-gallery-carousel__inner"
				data-speed={speed}
				data-spaceBetween={spaceBetween}
			>
				{clonedItems && clonedItems.length > 0 && (
					<div class="swiper-wrapper">
						{clonedItems.map((image, index) => (
							<div key={index} class="swiper-slide" lazy="true">
								<div className="block-gallery-carousel__inner--image">
									<img
										loading="lazy"
										key={index}
										src={image.url}
										alt={image.alt || `Image ${index + 1}`}
									/>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default Save;
