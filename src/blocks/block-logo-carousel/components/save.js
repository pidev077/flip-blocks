import { useBlockProps } from "@wordpress/block-editor";

const Save = (props) => {
	let { attributes, className } = props;

	const { items, spaceBetween, speed } = attributes;

	const blockProps = useBlockProps.save({
		className: ["block-logo-carousel", className].join(" "),
	});

	const clonedItems = items ? Array(6).fill(items).flat() : [];

	return (
		<div {...blockProps}>
			<div
				className="swiper block-logo-carousel__inner"
				data-speed={speed}
				data-spaceBetween={spaceBetween}
			>
				{clonedItems && clonedItems.length > 0 && (
					<div className="swiper-wrapper">
						{clonedItems.map((image, index) => (
							<div key={index} className="swiper-slide" lazy="true">
								<img
									key={index}
									src={image.url}
									alt={image.alt || `Image ${index + 1}`}
								/>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default Save;
