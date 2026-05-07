//import style
import "./styles/style.scss";
import "./styles/editor.scss";

import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";

import Edit from "./components/edit";
import Save from "./components/save";

const BlockAttrs = {
	posts_per_page: {
		type: "number",
		default: -1,
	},
	order: {
		type: "string",
		default: "desc",
	},
	orderBy: {
		type: "string",
		default: "date",
	},
	link: {
		type: "object",
	},
	showProject: {
		type: "boolean",
		default: true,
	},
	anchor: {
		type: "string",
		default: "",
	},
};

export default registerBlockType("flip-blocks/block-sectors-list", {
	apiVersion: 3,
	title: __("List Sectors"),
	icon: "list-view",
	category: "flip-blocks",
	keywords: [__("list"), __("sectors")],
	attributes: BlockAttrs,
	supports: {
		anchor: true,
	},
	/* Render the block in the editor. */
	edit: (props) => {
		return <Edit {...props} />;
	},

	/* Save the block markup. */
	save: (props) => {
		return <Save {...props} />;
	},
});
