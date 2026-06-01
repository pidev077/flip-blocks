import "./styles/style.scss";
import "./styles/editor.scss";

import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";

import Edit from "./components/edit";
import Save from "./components/save";

registerBlockType("flip-blocks/about-tamya", {
	apiVersion: 3,
	title: __("About Tamya"),
	icon: "building",
	category: "flip-blocks",

	attributes: {
		titleImageUrl: {
			type: "string",
			default: "",
		},
		watermarkImageUrl: {
			type: "string",
			default: "",
		},
		heroImageUrl: {
			type: "string",
			default: "",
		},
	},

	supports: {
		anchor: true,
	},

	edit: Edit,
	save: Save,
});
