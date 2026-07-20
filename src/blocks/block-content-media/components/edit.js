import { useState, useEffect } from "@wordpress/element";
import {
	useBlockProps,
	MediaUpload,
	MediaUploadCheck,
} from "@wordpress/block-editor";
import { Button } from "@wordpress/components";
import Inspector from "./inspector";

export default function Edit({ attributes, setAttributes, className }) {
	const { items = [], titleImageUrl, contentText1, contentText2 } =
		attributes;
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
			<Inspector
				items={items}
				titleImageUrl={titleImageUrl}
				contentText1={contentText1}
				contentText2={contentText2}
				setAttributes={setAttributes}
			/>

			<div {...blockProps}>
				{/* TITLE IMAGE */}
				<div className="block-title-wrap">
					<MediaUploadCheck>
						<MediaUpload
							allowedTypes={["image"]}
							value={titleImageUrl}
							onSelect={(media) =>
								setAttributes({ titleImageUrl: media.url })
							}
							render={({ open }) =>
								titleImageUrl ? (
									<img
										src={titleImageUrl}
										className="block-title-img"
										onClick={open}
										alt=""
									/>
								) : (
									<Button
										variant="secondary"
										onClick={open}
										className="block-title-upload-btn"
									>
										+ Upload title image
									</Button>
								)
							}
						/>
					</MediaUploadCheck>
				</div>

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
						<div className="left-text-wrap">
							<p className="left-text left-text-1">
								{contentText1 || (
									<em className="left-text-placeholder">
										Nhập đoạn 1 (in đậm) ở sidebar →
									</em>
								)}
							</p>
							<p className="left-text left-text-2">
								{contentText2 || (
									<em className="left-text-placeholder">
										Nhập đoạn 2 ở sidebar →
									</em>
								)}
							</p>
						</div>
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
