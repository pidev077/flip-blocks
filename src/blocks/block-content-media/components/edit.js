import { useState, useEffect } from "@wordpress/element";
import { RichText, useBlockProps } from "@wordpress/block-editor";
import Inspector from "./inspector";

export default function Edit({ attributes, setAttributes, className }) {
	const { items = [], contentTitle, contentText } = attributes;
	const [active, setActive] = useState(0);

	useEffect(() => {
		if (!items[active]) setActive(0);
	}, [items]);

	const activeItem = items[active];

	const blockProps = useBlockProps({
		className: ["flip-content-media", className].filter(Boolean).join(" "),
	});

	return (
		<>
			<Inspector items={items} setAttributes={setAttributes} />

			<div {...blockProps}>
				{/* TITLE TRÊN CÙNG */}
				<RichText
					tagName="h3"
					className="block-title"
					value={contentTitle}
					onChange={(v) => setAttributes({ contentTitle: v })}
					placeholder="Title..."
				/>

				<div className="inner-wrap">
					{/* LEFT */}
					<div className="left">
						<div className="thumb-list">
							<div className="active-indicator"></div>

							{items.map((item, i) => (
								<div
									key={item.id}
									className={`content-item ${
										i === active ? "is-active" : ""
									}`}
									onClick={() => setActive(i)}
								>
									{item.mediaUrl ? (
										<img
											src={item.mediaUrl}
											className="thumb-image"
										/>
									) : (
										<span>No Image</span>
									)}
								</div>
							))}
						</div>
						<RichText
							tagName="p"
							className="left-text"
							value={contentText}
							onChange={(v) => setAttributes({ contentText: v })}
							placeholder="Description..."
						/>
					</div>

					{/* RIGHT */}
					<div className="right">
						{activeItem?.mediaUrl && (
							<img src={activeItem.mediaUrl} className="main-image" />
						)}
					</div>
				</div>
			</div>
		</>
	);
}
