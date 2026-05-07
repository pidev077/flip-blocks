import "./styles/style.scss";
import "./styles/editor.scss";

import { registerBlockType } from "@wordpress/blocks";

import Edit from "./components/edit";
import Save from "./components/save";

const attributes = {
	items: {
		type: "array",
		default: [],
	},
	spaceBetween: {
		type: "number",
		default: 130,
	},
	speed: {
		type: "number",
		default: 5000,
	},
};

export default registerBlockType("flip-blocks/logo-carousel", {
	apiVersion: 3,
	title: "Logo Carousel",
	description: "Display a carousel logo auto play as marquee.",
	icon: "images-alt",
	category: "flip-blocks",
	keywords: ["logo", "carousel"],
	attributes,
	supports: {
		anchor: true,
		align: ["full"],
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
