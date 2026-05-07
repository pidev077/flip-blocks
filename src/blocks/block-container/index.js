/**
 * BLOCK: Container
 */

import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";

// Import block dependencies and components
import Edit from "./components/edit";
import Save from "./components/save";

// Import CSS
import "./styles/style.scss";
import "./styles/editor.scss";

const blockAttributes = {
	borderRadiusTop: {
		type: "boolean",
		default: false,
	},
	borderRadiusBottom: {
		type: "boolean",
		default: false,
	},
	containerPaddingTop: {
		type: "Object",
		default: {
			default: "10vh",
			laptop: "10vh",
			tablet: "10vh",
			mobile: "10vh",
			sync: true,
		},
	},
	containerPaddingBottom: {
		type: "Object",
		default: {
			default: "10vh",
			laptop: "10vh",
			tablet: "10vh",
			mobile: "10vh",
			sync: true,
		},
	},
	containerMaxWidth: {
		type: "string",
		default: "",
	},
	containerBgColor: {
		type: "string",
	},
	containerImgURL: {
		type: "string",
		source: "attribute",
		attribute: "src",
		selector: "img",
	},
	containerImgID: {
		type: "number",
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
	containerImgAlt: {
		type: "string",
		source: "attribute",
		attribute: "alt",
		selector: "img",
	},
	focalPoint: {
		type: "object",
		default: { x: 0.5, y: 0.5 },
	},
	zIndex: {
		type: "number",
		default: 1,
	},
	textAlign: {
		type: "string",
		default: "left",
	},
	overflowHidden: {
		type: "boolean",
		default: false,
	},
};

// Register the block
registerBlockType("flip-blocks/flip-container", {
	apiVersion: 3,
	title: "Container",
	description: __(
		"Add a container block to wrap several blocks in a parent container.",
		"flip-blocks"
	),
	icon: "editor-table",
	category: "flip-blocks",
	keywords: [__("container", "flip-blocks"), __("section", "flip-blocks")],
	supports: {
		anchor: true,
	},

	attributes: blockAttributes,

	/* Edit the block markup. */
	edit: (props) => {
		return <Edit {...props} />;
	},

	/* Save the block markup. */
	save: (props) => {
		return <Save {...props} />;
	},
});
