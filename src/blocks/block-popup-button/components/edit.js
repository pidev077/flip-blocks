import { useEffect } from "@wordpress/element";
import {
	RichText,
	useBlockProps,
	MediaUpload,
	MediaUploadCheck,
	InspectorControls,
} from "@wordpress/block-editor";
import { PanelBody, RangeControl, ColorPicker, Button } from "@wordpress/components";

export default function Edit({ attributes, setAttributes, clientId }) {
	const { blockId, buttonText, fontSize, bgColor, textColor, imgUrl } = attributes;

	useEffect(() => {
		if (!blockId) setAttributes({ blockId: clientId });
	}, []);

	const blockProps = useBlockProps({ className: "popup-btn-block" });

	const btnStyle = { fontSize: fontSize + "px", background: bgColor, color: textColor };

	return (
		<>
			<InspectorControls>
				<PanelBody title="Nút" initialOpen={true}>
					<RangeControl
						label="Cỡ chữ (px)"
						value={fontSize}
						min={10}
						max={36}
						onChange={(v) => setAttributes({ fontSize: v })}
					/>
					<p style={{ marginBottom: 4, fontSize: 11, fontWeight: 600 }}>Màu nền</p>
					<ColorPicker
						color={bgColor}
						onChange={(v) => setAttributes({ bgColor: v })}
						enableAlpha
					/>
					<p style={{ marginBottom: 4, fontSize: 11, fontWeight: 600 }}>Màu chữ</p>
					<ColorPicker
						color={textColor}
						onChange={(v) => setAttributes({ textColor: v })}
						enableAlpha
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<RichText
					tagName="span"
					className="popup-trigger-btn"
					style={btnStyle}
					value={buttonText}
					onChange={(v) => setAttributes({ buttonText: v })}
					placeholder="Text nút..."
					allowedFormats={[]}
				/>

				<div className="popup-btn-block__img-picker">
					<MediaUploadCheck>
						<MediaUpload
							allowedTypes={["image"]}
							value={attributes.imgId}
							onSelect={(media) =>
								setAttributes({ imgId: media.id, imgUrl: media.url, imgAlt: media.alt || "" })
							}
							render={({ open }) =>
								imgUrl ? (
									<div className="popup-btn-block__preview">
										<img src={imgUrl} alt="" />
										<div className="popup-btn-block__preview-actions">
											<Button variant="secondary" onClick={open}>Đổi ảnh</Button>
											<Button variant="link" isDestructive
												onClick={() => setAttributes({ imgId: 0, imgUrl: "", imgAlt: "" })}>
												Xoá
											</Button>
										</div>
									</div>
								) : (
									<Button variant="secondary" onClick={open} className="popup-btn-block__upload-btn">
										+ Chọn ảnh popup
									</Button>
								)
							}
						/>
					</MediaUploadCheck>
				</div>
			</div>
		</>
	);
}
