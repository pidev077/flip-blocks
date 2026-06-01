import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";

export default function Save({ attributes }) {
	const { titleImageUrl, watermarkImageUrl, heroImageUrl } = attributes;

	const blockProps = useBlockProps.save({
		className: "about-tamya-block",
	});

	return (
		<div {...blockProps}>
			{/* TITLE + TEXT — inside container */}
			<div className="at-upper-section">
				<div className="container">
					{titleImageUrl && (
						<div className="at-title-wrap">
							<img src={titleImageUrl} className="at-title-img" alt="" />
						</div>
					)}

					<div className="at-innerblocks-wrap">
						<InnerBlocks.Content />
					</div>
				</div>

				{/* WATERMARK — absolute, bắc cầu sang hero */}
				{watermarkImageUrl && (
					<div className="at-watermark-wrap">
						<img src={watermarkImageUrl} className="at-watermark-img" alt="" />
					</div>
				)}
			</div>

			{/* HERO IMAGE — full width, dưới watermark */}
			{heroImageUrl && (
				<div className="at-hero-wrap">
					<img src={heroImageUrl} className="at-hero-img" alt="" />
				</div>
			)}
		</div>
	);
}
