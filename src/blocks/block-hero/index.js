import "./styles/style.scss";
import "./styles/editor.scss";

import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";
import Edit from "./components/edit";
import Save from "./components/save";

const attr = {

	scrollAnchor: {
		type: "string",
	},

	videoFormat: {
		type: "string",
		default: "mp4",
	},
	videoURL: {
		type: "string",
	},
	videoTitle: {
		type: "string",
	},
	videoID: {
		type: "number",
	},
	posterID: {
		type: "number",
	},
	posterUrl: {
		type: "string",
	},
	imgID: {
		type: "number",
		default: 0,
	},
	imgUrl: {
		type: "string",
		default: "https://picsum.photos/1920/1200?1",
	},
	imgAlt: {
		type: "string",
		default: "Hero Block",
	},
	focalPoint: {
		type: "object",
		default: { x: 0.5, y: 0.5 },
	},
	colorText: {
		type: "string",
		default: "#FFF5D2",
	},
	typeHero: {
		type: "string",
		default: "image",
	},
	overlay: {
		type: "boolean",
		default: true,
	},
};

registerBlockType("flip-blocks/hero", {
	apiVersion: 3,
	title: __("Hero"),
	category: "flip-blocks",
	keywords: [__("section"), __("hero")],
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
});
