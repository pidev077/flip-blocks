import "./styles/style.scss";
import "./styles/editor.scss";

import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";
import Edit from "./components/edit";
import Save from "./components/save";

const attr = {
	heading: {
		type: "string",
		default: "FROM OUR PARTNERS",
	},
	testimonials: {
		type: "array",
		default: [
			{
				quote: "The great thing about Anvil Media is that they really understand farmers and they understand the grains industry. And that’s what you need to get the message across.",
				name: "Peter Newman",
				position:
					"Australian Herbicide Resistance Initiative (Geraldton, WA)",
				logo: "",
				avatar: "",
			},
			{
				quote: "The great thing about Anvil Media is that they really understand farmers and they understand the grains industry. And that’s what you need to get the message across.",
				name: "Sonia Bellon Rico",
				position:
					"Australian Herbicide Resistance Initiative (Geraldton, WA)",
				logo: "",
				avatar: "",
			},
			{
				quote: "The great thing about Anvil Media is that they really understand farmers and they understand the grains industry. And that’s what you need to get the message across.",
				name: "Peter Newman",
				position:
					"Australian Herbicide Resistance Initiative (Geraldton, WA)",
				logo: "",
				avatar: "",
			},
		],
	},
	infinite: {
		type: "boolean",
		default: false,
	},
	arrows: {
		type: "boolean",
		default: true,
	},
	slidesToShow: {
		type: "number",
		default: 1,
	},
	speed: {
		type: "number",
		default: 300,
	},
	autoplaySpeed: {
		type: "number",
		default: 5000,
	},
	dots: {
		type: "boolean",
		default: false,
	},
	autoplay: {
		type: "boolean",
		default: true,
	},
	contentColor: {
		type: "string",
		default: "#120A00",
	},
	headingColor: {
		type: "string",
		default: "#120A00",
	},
	bgColor: {
		type: "string",
		default: "#F2E9C8",
	},
	align: {
		type: "string",
	},
};

registerBlockType("flip-blocks/block-testimonials-carousel", {
	apiVersion: 3,
	title: __("Testimonials Carousel"),
	category: "flip-blocks",
	keywords: [__("quote"), __("carousel"), __("testimonials")],
	icon: "testimonial",
	attributes: attr,
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
