const { __ } = wp.i18n;
import {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
} from "@wordpress/block-editor";
import {
	Button,
	PanelBody,
	SelectControl,
	FocalPointPicker,
	TextControl,
	ToggleControl,
} from "@wordpress/components";

const ALLOWED_MEDIA_TYPES = ["image"];
const instructions = (
	<p>To edit the image, you need permission to upload media.</p>
);

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
		imgID,
		imgUrl,
		focalPoint,
		typeHero,
		videoURL,
		videoTitle,
		videoID,
		colorText,
		overlay,
		posterID,
		posterUrl,
		videoFormat,
		scrollAnchor,
	} = attributes;

	const onSelectMedia = (media) => {
		setAttributes({
			imgID: parseInt(media.id),
			imgUrl: media.url,
			imgAlt: media.alt,
		});
	};

	const onSelectPoster = (media) => {
		setAttributes({
			posterID: parseInt(media.id),
			posterUrl: media.url,
		});
	};

	const loadLocalVideo = (video) => {
		setAttributes({
			videoURL: video.url,
			videoID: video.id,
			videoTitle: video.title,
		});
		document.querySelector("video").load();
	};

	const onRemoveVideo = () => {
		setAttributes({
			videoURL: null,
			videoID: null,
			videoTitle: null,
		});
	};

	return (
		<InspectorControls>
			<PanelBody title="General">
				<SelectControl
					label={__("Hero Type", "flip-blocks")}
					value={typeHero}
					options={[
						{ label: "Image", value: "image" },
						{ label: "Video", value: "video" },
					]}
					__next40pxDefaultSize
					__nextHasNoMarginBottom
					onChange={(newValue) => setAttributes({ typeHero: newValue })}
				/>

				<ToggleControl
					label="Enable overlay"
					help={
						overlay
							? "Enabled overlay background."
							: "Disabled overlay background."
					}
					checked={overlay}
					onChange={() => setAttributes({ overlay: !overlay })}
				/>
				<TextControl
					__next40pxDefaultSize
					label="Anchor Link"
					value={scrollAnchor}
					onChange={(vl) => setAttributes({ scrollAnchor: vl })}
				/>
			</PanelBody>

			{typeHero == "video" && (
				<PanelBody title="Video">
					<SelectControl
						label={__("Video format", "flip-blocks")}
						value={videoFormat}
						options={[
							{ label: "MP4", value: "video/mp4" },
							{ label: "Webm", value: "video/webm" },
						]}
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						onChange={(newValue) =>
							setAttributes({ videoFormat: newValue })
						}
					/>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							marginBottom: "10px",
						}}
					>
						<span
							style={{
								width: "25px",
								height: "25px",
								margin: "-1px 5px 0",
							}}
						>
							{videoHostIcon}
						</span>
						<span id="title-video">
							{videoTitle || "Not selected yet."}
						</span>
					</div>
					<MediaUpload
						allowedTypes={["video"]}
						value={videoID}
						onSelect={(video) => loadLocalVideo(video)}
						render={({ open }) => (
							<>
								<Button
									className="button button-large is-primary"
									variant="primary"
									onClick={open}
									style={{ marginRight: "5px" }}
								>
									{__("Choose video", "flip-blocks")}
								</Button>
								{videoURL && !!videoURL.length && (
									<Button
										className="flip-container-inspector-media"
										variant="secondary"
										isDestructive
										label={__("Remove Video", "flip-blocks")}
										onClick={onRemoveVideo}
									>
										{__("Remove", "flip-blocks")}
									</Button>
								)}
							</>
						)}
					/>
					<hr />
					<div className="components-placeholder__fieldset">
						<MediaUploadCheck fallback={instructions}>
							<MediaUpload
								title="Poster"
								onSelect={onSelectPoster}
								allowedTypes={ALLOWED_MEDIA_TYPES}
								value={posterID}
								render={({ open }) => (
									<Button
										className={
											!posterID
												? "editor-post-featured-image__toggle"
												: "editor-post-featured-image__preview"
										}
										onClick={open}
									>
										{!posterID && "Add Poster"}
										{!!posterID && <img src={posterUrl} alt="img" />}
									</Button>
								)}
							/>
						</MediaUploadCheck>

						{!!posterID && (
							<MediaUploadCheck>
								<MediaUpload
									onSelect={(media) => {
										setAttributes({
											posterID: parseInt(media.id),
											posterUrl: media.url,
										});
									}}
									allowedTypes={ALLOWED_MEDIA_TYPES}
									value={posterID}
									render={({ open }) => (
										<Button onClick={open} variant="primary">
											{"Replace Poster"}
										</Button>
									)}
								/>
							</MediaUploadCheck>
						)}

						{!!posterID && (
							<MediaUploadCheck>
								<Button
									onClick={() => {
										setAttributes({
											posterID: 0,
											posterUrl: "",
										});
									}}
									variant="secondary"
									isDestructive
								>
									{"Remove Poster"}
								</Button>
							</MediaUploadCheck>
						)}
					</div>
				</PanelBody>
			)}

			{typeHero == "image" && (
				<PanelBody title="Image">
					<div className="components-placeholder__fieldset">
						<MediaUploadCheck fallback={instructions}>
							<MediaUpload
								title="Main Image"
								onSelect={onSelectMedia}
								allowedTypes={ALLOWED_MEDIA_TYPES}
								value={imgID}
								render={({ open }) => (
									<Button
										className={
											!imgID
												? "editor-post-featured-image__toggle"
												: "editor-post-featured-image__preview"
										}
										onClick={open}
									>
										{!imgID && "Change Image"}
										{!!imgID && <img src={imgUrl} alt="img" />}
									</Button>
								)}
							/>
						</MediaUploadCheck>

						{!!imgID && (
							<MediaUploadCheck>
								<MediaUpload
									onSelect={(media) => {
										setAttributes({
											imgID: parseInt(media.id),
											imgUrl: media.url,
											imgAlt: media.alt,
										});
									}}
									allowedTypes={ALLOWED_MEDIA_TYPES}
									value={imgID}
									render={({ open }) => (
										<Button onClick={open} isSecondary>
											{"Replace Image"}
										</Button>
									)}
								/>
							</MediaUploadCheck>
						)}

						{!!imgID && (
							<MediaUploadCheck>
								<Button
									onClick={() => {
										setAttributes({
											imgID: 0,
											imgUrl: "",
											imgAlt: "",
										});
									}}
									isDestructive
								>
									{"Remove Image"}
								</Button>
							</MediaUploadCheck>
						)}

						{!!imgUrl && (
							<FocalPointPicker
								label={__("Focal Point", "flip-blocks")}
								url={imgUrl}
								value={focalPoint}
								onChange={(newFocalPoint) =>
									setAttributes({ focalPoint: newFocalPoint })
								}
							/>
						)}
					</div>
				</PanelBody>
			)}

			<PanelColorGradientSettings
				title="Color Settings"
				settings={[
					{
						colorValue: colorText,
						label: __("Color Text"),
						onColorChange: (newValue) =>
							setAttributes({ colorText: newValue }),
					},
				]}
			/>
		</InspectorControls>
	);
};

export default Inspector;
