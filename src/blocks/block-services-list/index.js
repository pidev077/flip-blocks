import "./styles/style.scss";
import "./styles/editor.scss";

import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";

import Edit from "./components/edit";
import Save from "./components/save";

registerBlockType("flip-blocks/block-services-list", {
	apiVersion: 3,
	title: __("Danh sách dịch vụ", "flip-blocks"),
	description: __("Hiển thị danh sách dịch vụ với popup chi tiết.", "flip-blocks"),
	icon: "heart",
	category: "flip-blocks",
	keywords: [__("dịch vụ"), __("services"), __("popup")],
	attributes: {
		selectedIds: {
			type: "array",
			default: [],
			items: { type: "number" },
		},
		columns: {
			type: "number",
			default: 3,
		},
		gap: {
			type: "number",
			default: 24,
		},
		anchor: {
			type: "string",
			default: "",
		},
	},
	supports: {
		anchor: true,
	},
	edit: (props) => <Edit {...props} />,
	save: () => null,
});
