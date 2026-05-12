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
		// each item: { id, url, alt, brand, name, subtitle, link, linkTarget }
	},
	slidesPerView: {
		type: "number",
		default: 3,
	},
	spaceBetween: {
		type: "number",
		default: 20,
	},
	speed: {
		type: "number",
		default: 500,
	},
	loop: {
		type: "boolean",
		default: true,
	},
	autoplay: {
		type: "boolean",
		default: false,
	},
	autoplayDelay: {
		type: "number",
		default: 3000,
	},
};

export default registerBlockType("flip-blocks/product-carousel", {
	apiVersion: 3,
	title: __("Product Carousel", "flip-blocks"),
	description: __("Display a product image carousel with links.", "flip-blocks"),
	icon: "images-alt2",
	category: "flip-blocks",
	keywords: ["product", "carousel", "slider"],
	attributes,
	supports: {
		anchor: true,
		align: ["full", "wide"],
	},
	edit: (props) => <Edit {...props} />,
	save: (props) => <Save {...props} />,
});
