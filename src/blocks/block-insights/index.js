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
		default: 9,
	},
	order: {
		type: "string",
		default: "desc",
	},
	orderBy: {
		type: "string",
		default: "date",
	},
	anchor: {
		type: "string",
	},
};

export default registerBlockType("flip-blocks/block-insights", {
	apiVersion: 3,
	title: __("Insights"),
	icon: "text-page",
	category: "flip-blocks",
	keywords: [__("insight"), __("blog"), __("post")],
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
