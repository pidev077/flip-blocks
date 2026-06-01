import "./styles/style.scss";
import "./styles/editor.scss";

import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import Edit from "./components/edit";
import Save from "./components/save";

registerBlockType("flip-blocks/popup-button", {
	apiVersion: 3,
	title: __("Popup Button"),
	icon: "external",
	category: "flip-blocks",
	keywords: [__("popup"), __("modal"), __("button"), __("image")],

	attributes: {
		blockId:    { type: "string",  default: "" },
		buttonText: { type: "string",  default: "Xem thông điệp" },
		fontSize:   { type: "number",  default: 14 },
		bgColor:    { type: "string",  default: "#1D4D3B" },
		textColor:  { type: "string",  default: "#ffffff" },
		imgId:      { type: "number",  default: 0 },
		imgUrl:     { type: "string",  default: "" },
		imgAlt:     { type: "string",  default: "" },
	},

	edit: Edit,
	save: Save,
});
