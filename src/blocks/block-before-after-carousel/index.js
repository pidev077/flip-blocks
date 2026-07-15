import "./styles/style.scss";
import "./styles/editor.scss";

import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";

import Edit from "./components/edit";
import Save from "./components/save";

const attributes = {
	items: {
		type: "array",
		default: [],
		// each item: { beforeId, beforeUrl, beforeAlt, afterId, afterUrl, afterAlt }
	},
	beforeLabel: {
		type: "string",
		default: "TRƯỚC",
	},
	afterLabel: {
		type: "string",
		default: "SAU",
	},
	spaceBetween: {
		type: "number",
		default: 24,
	},
	rowGap: {
		type: "number",
		default: 16,
	},
	speed: {
		type: "number",
		default: 500,
	},
	autoplay: {
		type: "boolean",
		default: false,
	},
	autoplayDelay: {
		type: "number",
		default: 4000,
	},
};

export default registerBlockType("flip-blocks/before-after-carousel", {
	apiVersion: 3,
	title: __("Before / After Carousel", "flip-blocks"),
	description: __(
		"Carousel of before/after image pairs. Shows 2 pairs per view on desktop and 1 on mobile.",
		"flip-blocks"
	),
	icon: "images-alt2",
	category: "flip-blocks",
	keywords: ["before", "after", "carousel", "compare", "trước", "sau"],
	attributes,
	supports: {
		anchor: true,
		align: ["full", "wide"],
	},
	edit: (props) => <Edit {...props} />,
	save: (props) => <Save {...props} />,
});
