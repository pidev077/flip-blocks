import "./styles/style.scss";
import "./styles/editor.scss";

import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";
import { useBlockProps } from "@wordpress/block-editor";
import Edit from "./components/edit";
import Save from "./components/save";
import Background from "./components/background";

const attr = {
	scrollAnchor: {
		type: "string",
	},

	overlay: {
		type: "boolean",
		default: true,
	},

	heightVh: {
		type: "number",
		default: 100,
	},

	autoplay: {
		type: "boolean",
		default: true,
	},
	autoplaySpeed: {
		type: "number",
		default: 6000,
	},
	speed: {
		type: "number",
		default: 1100,
	},
	loop: {
		type: "boolean",
		default: true,
	},

	slides: {
		type: "array",
		default: [
			{
				id: 1,
				typeHero: "image",
				imgID: 0,
				imgUrl: "https://picsum.photos/1920/1200?1",
				imgAlt: "Hero slide",
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
				label: "LỘ TRÌNH CHỮA LÀNH · 01",
				title: "Phác đồ chuẩn y khoa",
				description:
					"Mỗi làn da một phác đồ riêng — đúng hoạt chất, đúng nồng độ, đúng thời điểm.",
				buttonText: "Đặt lịch tư vấn",
				buttonLink: { url: "", title: "", opensInNewTab: false },
			},
		],
	},
};

// Pre-"heightVh" markup (wrapper div had no style attribute). Kept so
// hero blocks saved before that setting was added still validate instead
// of showing a block-recovery error when reopened in the editor.
const SaveWithoutHeightStyle = (props) => {
	const { attributes, className } = props;
	const { overlay, scrollAnchor, autoplay, autoplaySpeed, speed, loop, slides = [] } =
		attributes;

	const blockProps = useBlockProps.save({
		id: scrollAnchor || undefined,
		className: ["hero-block", `${overlay ? "hero-overlay" : ""}`, className].join(" "),
	});

	const carouselData = { autoplay, autoplaySpeed, speed, loop };

	return (
		<div {...blockProps}>
			<div
				className="hero-block__swiper swiper"
				data-carousel={JSON.stringify(carouselData)}
			>
				<div className="swiper-wrapper">
					{slides.map((slide, index) => (
						<div className="swiper-slide hero-block__slide" key={slide.id || index}>
							<Background slide={slide} />

							<div className="container">
								<div className="hero-block-content" style={{ color: slide.colorText }}>
									{!!slide.label && (
										<span className="hero-block__label">{slide.label}</span>
									)}

									<h1 className="hero-block__title" style={{ color: slide.titleColor }}>
										{slide.title}
									</h1>

									{!!slide.description && (
										<p className="hero-block__desc">{slide.description}</p>
									)}

									{!!slide.buttonText && (
										<div className="hero-block__actions">
											<a
												href={slide.buttonLink?.url || "#"}
												target={slide.buttonLink?.opensInNewTab ? "_blank" : undefined}
												rel={slide.buttonLink?.opensInNewTab ? "noopener noreferrer" : undefined}
												className="hero-block__btn"
											>
												{slide.buttonText}
											</a>
										</div>
									)}
								</div>
							</div>
						</div>
					))}
				</div>

				{slides.length > 1 && (
					<div className="container hero-block__nav-wrap">
						<div className="hero-block__pagination swiper-pagination"></div>
					</div>
				)}
			</div>
		</div>
	);
};

registerBlockType("flip-blocks/hero", {
	apiVersion: 3,
	title: __("Hero"),
	category: "flip-blocks",
	keywords: [__("section"), __("hero"), __("carousel"), __("slider")],
	icon: "format-video",
	attributes: attr,
	/* Render the block in the editor. */
	edit: (props) => {
		return <Edit {...props} />;
	},

	/* Save the block markup. */
	save: (props) => {
		return <Save {...props} />;
	},

	deprecated: [
		{
			attributes: attr,
			save: SaveWithoutHeightStyle,
		},
	],
});
