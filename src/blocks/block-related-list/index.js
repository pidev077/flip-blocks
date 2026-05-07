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
		default: 3,
	},
	order: {
		type: "string",
		default: "desc",
	},
	orderBy: {
		type: "string",
		default: "date",
	},

	taxonomy: {
		type: "string",
		default: "case-study-sectors",
	},

	termId: {
		type: "number",
		default: 0,
	},
	showTaxonomyButtons: {
		type: "boolean",
		default: true,
	},
};

export default registerBlockType("flip-blocks/block-related-list", {
	apiVersion: 3,
	title: __("Related List Case Studies"),
	icon: "editor-ul",
	category: "flip-blocks",
	keywords: [__("list"), __("related"), __("case studies")],
	attributes: BlockAttrs,
	supports: {
		align: ["full"],
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
