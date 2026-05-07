/**
 * Inspector Controls
 */

/**
 * Internal dependencies.
 */

// Setup the block
const { __ } = wp.i18n;

// Import block components
import {
	InspectorControls,
	MediaUpload,
	__experimentalColorGradientControl as ColorGradientControl,
} from "@wordpress/block-editor";

// Import Inspector components
import {
	Button,
	Icon,
	PanelBody,
	ToggleControl,
	TextControl,
	FocalPointPicker,
	RangeControl,
} from "@wordpress/components";
/**
 * Create an Inspector Controls wrapper Component
 */
const videoHostIcon = (
	<svg
		height="25"
		id="Layer_1"
		version="1.1"
		viewBox="0 0 24 24"
		width="25"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			clipRule="evenodd"
			d="M22.506,21v0.016L17,15.511V19c0,1.105-0.896,2-2,2h-1.5H3H2c-1.104,0-2-0.895-2-2  v-1l0,0V6l0,0V5c0-1.104,0.896-1.999,2-1.999h1l0,0h10.5l0,0H15c1.104,0,2,0.895,2,1.999v3.516l5.5-5.5V3.001  c0.828,0,1.5,0.671,1.5,1.499v15C24,20.327,23.331,20.996,22.506,21z"
			fillRule="evenodd"
		/>
	</svg>
);
const Inspector = (props) => {
	const { attributes, setAttributes } = props;
	const {
		containerPaddingTop,
		containerPaddingBottom,
		containerMaxWidth,
		focalPoint,
		containerBgColor,
		containerImgURL,
		containerImgID,
		videoURL,
		videoTitle,
		videoID,
		zIndex,
		borderRadiusTop,
		borderRadiusBottom,
		overflowHidden,
	} = attributes;

	const onSelectImage = (img) => {
		setAttributes({
			containerImgID: img.id,
			containerImgURL: img.url,
			containerImgAlt: img.alt,
		});
	};

	const onRemoveImage = () => {
		setAttributes({
			containerImgID: null,
			containerImgURL: null,
			containerImgAlt: null,
		});
	};

	const onRemoveVideo = () => {
		setAttributes({
			videoURL: null,
			videoID: null,
			videoTitle: null,
		});
	};

	const onChangeSize = (position, value, screen) => {
		if (position === "top") {
			const newSize = { ...containerPaddingTop };
			newSize[screen] = value;
			if (screen == "default" && containerPaddingTop.sync == true) {
				newSize.tablet = value;
				newSize.laptop = value;
				newSize.mobile = value;
			}

			setAttributes({ containerPaddingTop: newSize });
		} else {
			const newSize = { ...containerPaddingBottom };
			newSize[screen] = value;
			if (screen == "default" && containerPaddingBottom.sync == true) {
				newSize.tablet = value;
				newSize.laptop = value;
				newSize.mobile = value;
			}

			setAttributes({ containerPaddingBottom: newSize });
		}
	};

	const onChangeSizeResponsiveTop = (value) => {
		let newSize = { ...containerPaddingTop };
		newSize.sync = value;
		setAttributes({ containerPaddingTop: newSize });
	};

	const onChangeSizeResponsiveBottom = (value) => {
		let newSize = { ...containerPaddingBottom };
		newSize.sync = value;
		setAttributes({ containerPaddingBottom: newSize });
	};

	const loadLocalVideo = (video) => {
		setAttributes({
			videoURL: video.url,
			videoID: video.id,
			videoTitle: video.title,
		});
		document.querySelector("video").load();
	};

	return (
		<>
			<InspectorControls key="settings" group="settings">
				<PanelBody title={__("General", "flip-blocks")} initialOpen={true}>
					<ToggleControl
						label={__("Border Radius Top", "flip-blocks")}
						help={__("Enable BorderRadius Top", "flip-blocks")}
						checked={borderRadiusTop}
						onChange={() =>
							setAttributes({ borderRadiusTop: !borderRadiusTop })
						}
					/>

					<ToggleControl
						label={__("Border Radius Bottom", "flip-blocks")}
						help={__("Enable BorderRadius Bottom", "flip-blocks")}
						checked={borderRadiusBottom}
						onChange={() =>
							setAttributes({ borderRadiusBottom: !borderRadiusBottom })
						}
					/>
					<ToggleControl
						label={__("Overflow Hidden", "flip-blocks")}
						checked={overflowHidden}
						onChange={() =>
							setAttributes({ overflowHidden: !overflowHidden })
						}
					/>
					<RangeControl
						value={zIndex}
						label="Z Index"
						onChange={(value) => setAttributes({ zIndex: value })}
						__nextHasNoMarginBottom
						min={0}
						max={999}
						step={1}
					/>
				</PanelBody>

				<PanelBody title={__("Padding", "flip-blocks")} initialOpen={true}>
					<TextControl
						label={__("Padding Top")}
						value={containerPaddingTop.default}
						help="Set unit px, vh, %"
						__next40pxDefaultSize
						onChange={(value) => {
							onChangeSize("top", value, "default");
						}}
					/>

					<ToggleControl
						label={__("Sync Padding Top")}
						help={__(
							"Disable to custom padding top for each screen (Desktop, Laptop, Tablet, Mobile)"
						)}
						checked={containerPaddingTop.sync}
						onChange={onChangeSizeResponsiveTop}
					/>

					{!containerPaddingTop.sync && (
						<div>
							<TextControl
								label={__("on Laptop (≦1440px)")}
								help={__("Set padding top for laptop")}
								value={containerPaddingTop.laptop}
								__next40pxDefaultSize
								onChange={(value) => {
									onChangeSize("top", value, "laptop");
								}}
							/>

							<TextControl
								label={__("on Tablet (≦1024px)")}
								help={__("Set padding top for tablet")}
								value={containerPaddingTop.tablet}
								__next40pxDefaultSize
								onChange={(value) => {
									onChangeSize("top", value, "tablet");
								}}
							/>
							<TextControl
								label={__("on Mobile (≦767px)")}
								help={__("Set padding top for mobile")}
								value={containerPaddingTop.mobile}
								__next40pxDefaultSize
								onChange={(value) => {
									onChangeSize("top", value, "mobile");
								}}
							/>
						</div>
					)}
					<hr />

					<TextControl
						label={__("Padding Bottom")}
						value={containerPaddingBottom.default}
						help="Set unit px, vh, %"
						__next40pxDefaultSize
						onChange={(value) => {
							onChangeSize("bottom", value, "default");
						}}
					/>

					<ToggleControl
						label={__("Sync Padding Bottom")}
						help={__(
							"Disable to custom padding bottom for each screen (Desktop, Laptop, Tablet, Mobile)"
						)}
						checked={containerPaddingBottom.sync}
						__next40pxDefaultSize
						onChange={onChangeSizeResponsiveBottom}
					/>

					{!containerPaddingBottom.sync && (
						<div>
							<TextControl
								label={__("on Laptop (≦1440px)")}
								help={__("Set padding bottom for laptop")}
								value={containerPaddingBottom.laptop}
								__next40pxDefaultSize
								onChange={(value) => {
									onChangeSize("bottom", value, "laptop");
								}}
							/>

							<TextControl
								label={__("on Tablet (≦1024px)")}
								help={__("Set padding bottom for tablet")}
								value={containerPaddingBottom.tablet}
								__next40pxDefaultSize
								onChange={(value) => {
									onChangeSize("bottom", value, "tablet");
								}}
							/>
							<TextControl
								label={__("on Mobile (≦767px)")}
								help={__("Set padding bottom for mobile")}
								value={containerPaddingBottom.mobile}
								__next40pxDefaultSize
								onChange={(value) => {
									onChangeSize("bottom", value, "mobile");
								}}
							/>
						</div>
					)}
					<hr />

					<TextControl
						label={__("Inside Container Max Width (px)", "flip-blocks")}
						value={containerMaxWidth}
						help="Set unit px, vw, %"
						__next40pxDefaultSize
						onChange={(value) =>
							setAttributes({ containerMaxWidth: value })
						}
					/>
				</PanelBody>
			</InspectorControls>
			<InspectorControls key="styles" group="styles">
				<PanelBody title={__("Background Image", "flip-blocks")}>
					<p>{__("Select a background image:", "flip-blocks")}</p>
					<MediaUpload
						onSelect={onSelectImage}
						type="image"
						value={containerImgID}
						render={({ open }) => (
							<div>
								<Button
									className="flip-container-inspector-media"
									label={__("Edit image", "flip-blocks")}
									onClick={open}
								>
									<Icon icon="format-image" />
									{__("Select Image", "flip-blocks")}
								</Button>

								{containerImgURL && !!containerImgURL.length && (
									<Button
										className="flip-container-inspector-media"
										label={__("Remove Image", "flip-blocks")}
										onClick={onRemoveImage}
									>
										<Icon icon="dismiss" />
										{__("Remove", "flip-blocks")}
									</Button>
								)}
							</div>
						)}
					/>
				</PanelBody>
				{containerImgURL && !!containerImgURL.length && (
					<PanelBody title="Background Position">
						<FocalPointPicker
							label="Focal Point Picker"
							url={containerImgURL}
							value={focalPoint}
							onChange={(value) => setAttributes({ focalPoint: value })}
						/>
					</PanelBody>
				)}

				<PanelBody title="Background Video">
					<MediaUpload
						allowedTypes={["video"]}
						value={videoID}
						onSelect={(video) => loadLocalVideo(video)}
						render={({ open }) => (
							<>
								<Button
									className="button button-large is-primary"
									onClick={open}
									style={{ marginLeft: "5px" }}
								>
									Choose video
								</Button>
								{videoURL && !!videoURL.length && (
									<Button
										className="flip-container-inspector-media"
										label={__("Remove Video", "flip-blocks")}
										onClick={onRemoveVideo}
									>
										<Icon icon="dismiss" />
										{__("Remove", "flip-blocks")}
									</Button>
								)}
							</>
						)}
					/>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							marginTop: "10px",
						}}
					>
						<span
							style={{
								width: "25px",
								height: "25px",
								margin: "-1px 5px 0",
							}}
						>
							{" "}
							{videoHostIcon}{" "}
						</span>
						<span id="title-video">
							{videoTitle || "Not selected yet."}
						</span>
					</div>
				</PanelBody>

				<PanelBody title={__("Background Color", "flip-blocks")}>
					<ColorGradientControl
						colorValue={containerBgColor}
						label={__("Choose a color")}
						onColorChange={(newValue) =>
							setAttributes({ containerBgColor: newValue })
						}
					/>
				</PanelBody>
			</InspectorControls>
		</>
	);
};

export default Inspector;
