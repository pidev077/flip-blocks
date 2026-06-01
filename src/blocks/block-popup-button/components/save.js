import { RichText, useBlockProps } from "@wordpress/block-editor";

export default function Save({ attributes }) {
	const { blockId, buttonText, fontSize, bgColor, textColor, imgUrl, imgAlt } = attributes;
	const id = blockId || "popup";

	const blockProps = useBlockProps.save({ className: "popup-btn-block" });

	const btnStyle = `font-size:${fontSize}px;background:${bgColor};color:${textColor}`;

	return (
		<div {...blockProps}>
			<button
				type="button"
				className="popup-trigger-btn"
				style={btnStyle}
				data-popup-target={id}
			>
				<RichText.Content value={buttonText} />
			</button>

			<div className="popup-overlay" id={`popup-${id}`} hidden>
				<div className="popup-panel">
					<button type="button" className="popup-close" aria-label="Đóng">
						&times;
					</button>
					{imgUrl && <img src={imgUrl} alt={imgAlt} className="popup-img" />}
				</div>
			</div>
		</div>
	);
}
