import { useBlockProps } from "@wordpress/block-editor";

export default function Save({ attributes, className }) {
	const { items, titleImageUrl, contentText1, contentText2 } = attributes;

	const blockProps = useBlockProps.save({
		className: ["flip-content-media", className].filter(Boolean).join(" "),
	});

	return (
		<div {...blockProps}>
			{/* TITLE IMAGE */}
			{titleImageUrl && (
				<div className="block-title-wrap">
					<img src={titleImageUrl} className="block-title-img" alt="" />
				</div>
			)}

			<div className="inner-wrap">
				<div className="left">
					<div className="thumb-list">
						<div className="active-indicator"></div>

						{items?.map((item, index) => (
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

					<div className="left-text-wrap">
						<p className="left-text left-text-1">{contentText1}</p>
						<p className="left-text left-text-2">{contentText2}</p>
					</div>
				</div>

				<div className="right">
					{items?.[0]?.mediaUrl && (
						<img src={items[0].mediaUrl} className="main-image" alt="" />
					)}
				</div>
			</div>
		</div>
	);
}
