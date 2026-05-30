import { RichText, useBlockProps } from "@wordpress/block-editor";

export default function Save({ attributes, className }) {
	const { items, contentTitle, contentText } = attributes;

	if (!items?.length) return null;

	const blockProps = useBlockProps.save({
		className: ["flip-content-media", className].filter(Boolean).join(" "),
	});

	return (
		<div {...blockProps}>
			{/* TITLE */}
			<RichText.Content
				tagName="h3"
				className="block-title"
				value={contentTitle}
			/>

			<div className="inner-wrap">
				<div className="left">
					<div className="thumb-list">
						<div className="active-indicator"></div>

						{items.map((item, index) => (
							<div
								key={index}
								className={`content-item ${
									index === 0 ? "is-active" : ""
								}`}
								data-media={item.mediaUrl}
							>
								<img
									src={item.mediaUrl}
									className="thumb-image"
									alt=""
								/>
							</div>
						))}
					</div>

					<RichText.Content
						tagName="p"
						className="left-text"
						value={contentText}
					/>
				</div>

				<div className="right">
					{items[0]?.mediaUrl && (
						<img src={items[0].mediaUrl} className="main-image" alt="" />
					)}
				</div>
			</div>
		</div>
	);
}
