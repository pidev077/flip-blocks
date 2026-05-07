import "./styles/style.scss";
import "./styles/editor.scss";

import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";
import Edit from "./components/edit";
import Save from "./components/save";

const attr = {
	counters: {
		type: "array",
		default: [
			{
				heading: "Projects completed",
				number: "50+",
			},
			{
				heading: "Years in operation",
				number: "20+",
			},
			{
				heading: "Awards won",
				number: "8+",
			},
		],
	},
	countersColor: {
		type: "string",
		default: "#120A00",
	},
	bgColor: {
		type: "string",
		default: "#97ECFF",
	},
};

registerBlockType("flip-blocks/block-text-w-counter", {
	apiVersion: 3,
	title: __("Text with Counter"),
	category: "flip-blocks",
	keywords: [__("text"), __("counter")],
	icon: "editor-ol-rtl",
	attributes: attr,
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
