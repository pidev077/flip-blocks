const { __ } = wp.i18n;
import { useState } from "@wordpress/element";
import {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	__experimentalLinkControl as LinkControl,
} from "@wordpress/block-editor";
import {
	Button,
	PanelBody,
	SelectControl,
	FocalPointPicker,
	TextControl,
	TextareaControl,
	ToggleControl,
	ColorPalette,
	__experimentalNumberControl as NumberControl,
} from "@wordpress/components";

const ALLOWED_MEDIA_TYPES = ["image"];

const TEXT_COLOR_PALETTE = [
	{ name: "Cream", color: "#FFF5D2" },
	{ name: "Gold", color: "#FFE071" },
	{ name: "White", color: "#FFFFFF" },
	{ name: "Dark", color: "#120A00" },
];

const emptySlide = () => ({
	id: Date.now(),
	typeHero: "image",
	imgID: 0,
	imgUrl: "",
	imgAlt: "",
	focalPoint: { x: 0.5, y: 0.5 },
	videoURL: "",
	videoID: 0,
	videoTitle: "",
	videoFormat: "video/mp4",
	posterID: 0,
	posterUrl: "",
	colorText: "#FFF5D2",
	titleColor: "#FFF5D2",
	labelColor: "#A67C00",
	label: "",
	title: "",
	description: "",
	buttonText: "Đặt lịch tư vấn",
	buttonLink: { url: "", title: "", opensInNewTab: false },
});

const Inspector = ({ attributes, setAttributes, active, setActive }) => {
	const {
		overlay,
		scrollAnchor,
		autoplay,
		autoplaySpeed,
		speed,
		loop,
		heightVh,
		slides = [],
	} = attributes;

	const [dragIndex, setDragIndex] = useState(null);

	const updateSlide = (index, changes) => {
		const newSlides = [...slides];
		newSlides[index] = { ...newSlides[index], ...changes };
		setAttributes({ slides: newSlides });
	};

	const addSlide = () => {
		setAttributes({ slides: [...slides, emptySlide()] });
		setActive(slides.length);
	};

	const removeSlide = (index) => {
		if (slides.length <= 1) return;
		if (!confirm(__("Are you sure you want to remove this slide?", "flip-blocks")))
			return;
		const newSlides = slides.filter((_, i) => i !== index);
		setAttributes({ slides: newSlides });
		setActive(0);
	};

	const moveSlide = (from, to) => {
		if (from === to || from == null || to == null) return;
		const newSlides = [...slides];
		const [moved] = newSlides.splice(from, 1);
		newSlides.splice(to, 0, moved);
		setAttributes({ slides: newSlides });
		setActive(to);
	};

	return (
		<InspectorControls>
			<PanelBody title={__("General", "flip-blocks")}>
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
				<NumberControl
					label={__("Chiều cao (vh)", "flip-blocks")}
					help={__(
						"Chiều cao khối hero theo % chiều cao màn hình. Mặc định 100 = full màn hình. Trên mobile chiều cao vẫn giữ cố định để dễ đọc.",
						"flip-blocks"
					)}
					value={heightVh}
					min={40}
					max={150}
					step={5}
					onChange={(vl) =>
						setAttributes({ heightVh: parseInt(vl) || 100 })
					}
				/>
			</PanelBody>

			<PanelBody title={__("Carousel Settings", "flip-blocks")}>
				<ToggleControl
					label="Autoplay"
					help={autoplay ? "Enable autoplay." : "Disable autoplay."}
					checked={autoplay}
					onChange={() => setAttributes({ autoplay: !autoplay })}
				/>
				{autoplay && (
					<NumberControl
						label="Autoplay Speed (ms)"
						value={autoplaySpeed}
						onChange={(vl) =>
							setAttributes({ autoplaySpeed: parseInt(vl) || 0 })
						}
						step={500}
					/>
				)}
				<NumberControl
					label="Transition Speed (ms)"
					value={speed}
					onChange={(vl) => setAttributes({ speed: parseInt(vl) || 0 })}
					step={100}
				/>
				<ToggleControl
					label="Loop"
					help={loop ? "Enable loop." : "Disable loop."}
					checked={loop}
					onChange={() => setAttributes({ loop: !loop })}
				/>
			</PanelBody>

			<PanelBody title={__("Slides", "flip-blocks")} initialOpen={true}>
				<p className="drag-instruction">
					{__(
						"Kéo để sắp xếp lại. Mở một slide bên dưới để chỉnh sửa nội dung.",
						"flip-blocks"
					)}
				</p>

				{slides.map((slide, index) => (
					<div
						key={slide.id || index}
						draggable
						onDragStart={() => setDragIndex(index)}
						onDragOver={(e) => e.preventDefault()}
						onDrop={() => {
							moveSlide(dragIndex, index);
							setDragIndex(null);
						}}
					>
						<PanelBody
							title={`${index === active ? "● " : ""}Slide ${index + 1}${
								slide.title ? " — " + slide.title : ""
							}`}
							initialOpen={index === active}
							onToggle={(isOpened) => {
								if (isOpened) setActive(index);
							}}
						>
							<TextControl
								label={__("Nhãn nhỏ (Label)", "flip-blocks")}
								placeholder={__("VD: LỘ TRÌNH CHỮA LÀNH · 01", "flip-blocks")}
								value={slide.label}
								onChange={(value) => updateSlide(index, { label: value })}
							/>

							<TextControl
								label={__("Tiêu đề (Title)", "flip-blocks")}
								placeholder={__("Tiêu đề", "flip-blocks")}
								value={slide.title}
								onChange={(value) => updateSlide(index, { title: value })}
							/>

							<TextareaControl
								label={__("Mô tả (Description)", "flip-blocks")}
								placeholder={__("Mô tả ngắn cho slide này...", "flip-blocks")}
								value={slide.description}
								onChange={(value) =>
									updateSlide(index, { description: value })
								}
							/>

							<TextControl
								label={__("Nội dung nút (Button text)", "flip-blocks")}
								placeholder={__("Đặt lịch tư vấn", "flip-blocks")}
								value={slide.buttonText}
								onChange={(value) =>
									updateSlide(index, { buttonText: value })
								}
							/>

							<hr />

							<SelectControl
								label={__("Hero Type", "flip-blocks")}
								value={slide.typeHero}
								options={[
									{ label: "Image", value: "image" },
									{ label: "Video", value: "video" },
								]}
								onChange={(newValue) =>
									updateSlide(index, { typeHero: newValue })
								}
							/>

							{slide.typeHero === "image" && (
								<div className="components-placeholder__fieldset">
									<MediaUploadCheck>
										<MediaUpload
											allowedTypes={ALLOWED_MEDIA_TYPES}
											value={slide.imgID}
											onSelect={(media) =>
												updateSlide(index, {
													imgID: parseInt(media.id),
													imgUrl: media.url,
													imgAlt: media.alt,
												})
											}
											render={({ open }) => (
												<Button
													className={
														!slide.imgID
															? "editor-post-featured-image__toggle"
															: "editor-post-featured-image__preview"
													}
													onClick={open}
												>
													{!slide.imgID && "Change Image"}
													{!!slide.imgID && (
														<img src={slide.imgUrl} alt="img" />
													)}
												</Button>
											)}
										/>
									</MediaUploadCheck>

									{!!slide.imgUrl && (
										<FocalPointPicker
											label={__("Focal Point", "flip-blocks")}
											url={slide.imgUrl}
											value={slide.focalPoint}
											onChange={(newFocalPoint) =>
												updateSlide(index, { focalPoint: newFocalPoint })
											}
										/>
									)}
								</div>
							)}

							{slide.typeHero === "video" && (
								<div className="components-placeholder__fieldset">
									<SelectControl
										label={__("Video format", "flip-blocks")}
										value={slide.videoFormat}
										options={[
											{ label: "MP4", value: "video/mp4" },
											{ label: "Webm", value: "video/webm" },
										]}
										onChange={(newValue) =>
											updateSlide(index, { videoFormat: newValue })
										}
									/>

									<MediaUpload
										allowedTypes={["video"]}
										value={slide.videoID}
										onSelect={(video) =>
											updateSlide(index, {
												videoURL: video.url,
												videoID: video.id,
												videoTitle: video.title,
											})
										}
										render={({ open }) => (
											<Button
												variant="primary"
												onClick={open}
												style={{ marginRight: "5px" }}
											>
												{__("Choose video", "flip-blocks")}
											</Button>
										)}
									/>

									<hr />

									<MediaUploadCheck>
										<MediaUpload
											title="Poster"
											onSelect={(media) =>
												updateSlide(index, {
													posterID: parseInt(media.id),
													posterUrl: media.url,
												})
											}
											allowedTypes={ALLOWED_MEDIA_TYPES}
											value={slide.posterID}
											render={({ open }) => (
												<Button
													className={
														!slide.posterID
															? "editor-post-featured-image__toggle"
															: "editor-post-featured-image__preview"
													}
													onClick={open}
												>
													{!slide.posterID && "Add Poster"}
													{!!slide.posterID && (
														<img src={slide.posterUrl} alt="img" />
													)}
												</Button>
											)}
										/>
									</MediaUploadCheck>
								</div>
							)}

							<div style={{ marginTop: "16px" }}>
								<label className="components-base-control__label">
									{__("Label Color", "flip-blocks")}
								</label>
								<ColorPalette
									colors={TEXT_COLOR_PALETTE}
									value={slide.labelColor}
									onChange={(color) =>
										updateSlide(index, { labelColor: color || "#A67C00" })
									}
								/>
							</div>

							<div style={{ marginTop: "16px" }}>
								<label className="components-base-control__label">
									{__("Title Color", "flip-blocks")}
								</label>
								<ColorPalette
									colors={TEXT_COLOR_PALETTE}
									value={slide.titleColor}
									onChange={(color) =>
										updateSlide(index, { titleColor: color || "#FFF5D2" })
									}
								/>
							</div>

							<div style={{ marginTop: "16px" }}>
								<label className="components-base-control__label">
									{__("Description Color", "flip-blocks")}
								</label>
								<ColorPalette
									colors={TEXT_COLOR_PALETTE}
									value={slide.colorText}
									onChange={(color) =>
										updateSlide(index, { colorText: color || "#FFF5D2" })
									}
								/>
							</div>

							<div style={{ marginTop: "16px" }}>
								<label className="components-base-control__label">
									{__("Button Link", "flip-blocks")}
								</label>
								<LinkControl
									searchInputPlaceholder="Search here..."
									value={slide.buttonLink}
									settings={[
										{ id: "opensInNewTab", title: __("Open in new tab") },
									]}
									onChange={(value) =>
										updateSlide(index, { buttonLink: value })
									}
									withCreateSuggestion={true}
									createSuggestion={(inputValue) =>
										updateSlide(index, {
											buttonLink: {
												...slide.buttonLink,
												title: inputValue,
												type: "custom-url",
												id: Date.now(),
												url: inputValue,
											},
										})
									}
									createSuggestionButtonText={(newValue) =>
										`New: ${newValue}`
									}
								/>
							</div>

							<Button
								variant="link"
								isDestructive
								disabled={slides.length <= 1}
								onClick={() => removeSlide(index)}
								style={{ marginTop: "16px" }}
							>
								{__("Remove slide", "flip-blocks")}
							</Button>
						</PanelBody>
					</div>
				))}

				<Button
					variant="primary"
					onClick={addSlide}
					style={{ marginTop: "12px" }}
				>
					{__("+ Add slide", "flip-blocks")}
				</Button>
			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;
