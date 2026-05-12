import "./styles/style.scss";
import "./styles/editor.scss";

import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";

import Edit from "./components/edit";
import Save from "./components/save";

registerBlockType("flip-blocks/block-products-list", {
	apiVersion: 3,
	title: __("Danh sách sản phẩm", "flip-blocks"),
	description: __("Hiển thị danh sách sản phẩm với popup chi tiết.", "flip-blocks"),
	icon: "products",
	category: "flip-blocks",
	keywords: [__("sản phẩm"), __("products"), __("popup")],
	attributes: {
		selectedIds: {
			type: "array",
			default: [],
			items: { type: "number" },
		},
		columns: {
			type: "number",
			default: 4,
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
