import { __ } from "@wordpress/i18n";
import { Fragment } from "@wordpress/element";
import Inspector from "./inspector";
import { ToolbarGroup, ToolbarButton } from "@wordpress/components";
import {
	useBlockProps,
	MediaPlaceholder,
	BlockControls,
	MediaUpload,
	MediaUploadCheck,
} from "@wordpress/block-editor";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

const Edit = (props) => {
	const { attributes, setAttributes, className } = props;
	const { items, spaceBetween, speed } = attributes;

	const blockProps = useBlockProps({
		className: ["block-gallery-carousel", className].join(" "),
	});

	const onSelectMedia = (media) => {
		const newItems = media.map((item) => ({
			id: item.id,
			url: item.url,
			alt: item.alt,
		}));

		setAttributes({
			items: newItems,
		});
	};

	const clonedItems = items ? Array(5).fill(items).flat() : [];

	return (
		<Fragment>
			<BlockControls>
				<ToolbarGroup>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={onSelectMedia}
							allowedTypes={["image"]}
							multiple
							gallery
							value={items.map((item) => item.id)}
							render={({ open }) => (
								<ToolbarButton
									icon="format-gallery"
									label={__("Add image", "flip-blocks")}
									onClick={open}
								/>
							)}
						/>
					</MediaUploadCheck>
				</ToolbarGroup>
			</BlockControls>
			<Inspector {...props} />
			<div {...blockProps}>
				{items.length === 0 && (
					<MediaPlaceholder
						icon="format-image"
						labels={{
							title: __("Image", "flip-blocks"),
							instructions: __(
								"Click or drag images here to add",
								"flip-blocks"
							),
						}}
						value={items.map((item) => item.id)}
						onSelect={onSelectMedia}
						accept="image/*"
						allowedTypes={["image"]}
						multiple
					/>
				)}

				{items.length > 0 && (
					<Swiper
						className="block-gallery-carousel__inner"
						modules={[Autoplay]}
						spaceBetween={spaceBetween}
						slidesPerView="auto"
						centeredSlides={true}
						key={`${speed}-${items.length}`}
						loop={true}
						speed={speed}
						allowTouchMove={false}
						autoplay={{
							delay: 0,
							disableOnInteraction: false,
						}}
					>
						{clonedItems.map((item, index) => (
							<SwiperSlide key={index}>
								<div className="block-gallery-carousel__inner--image">
									<img src={item.url} alt={item.alt} />
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				)}
			</div>
		</Fragment>
	);
};

export default Edit;
