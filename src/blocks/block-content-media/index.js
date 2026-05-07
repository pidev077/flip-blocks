import "./styles/style.scss";
import "./styles/editor.scss";

import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";

import Edit from "./components/edit";
import Save from "./components/save";

registerBlockType("flip-blocks/content-media", {
	apiVersion: 3,
	title: __("Content Media"),
	icon: "images-alt2",
	category: "flip-blocks",

	attributes: {
		items: {
			type: "array",
			default: [],
		},
		contentTitle: {
			type: "string",
			default: "Về Tamya Clinic",
		},
		contentText: {
			type: "string",
			default: "Nội dung mô tả ở đây...",
		},
	},

	supports: {
		anchor: true,
	},

	edit: Edit,
	save: Save,
});
