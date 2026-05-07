import "./styles/style.scss";
import "./styles/editor.scss";

import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";
import Edit from "./components/edit";

const attr = {
	className: {
		type: "string",
		default: "",
	},
	anchor: {
		type: "string",
		default: "",
	},
};

registerBlockType("flip-blocks/client-block", {
	apiVersion: 3,
	title: __("Client"),
	category: "flip-blocks",
	icon: "networking",
	attributes: attr,
	edit: Edit,
	save: () => null,
});
