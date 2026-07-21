/**
 * BLOCK: Advanced Columns.
 */

/**
 * Components and dependencies.
 */
import Edit from "./components/edit";
import Save from "./components/save";
import BackgroundAttributes from "../../utils/components/background-image/attributes";

/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Register advanced columns block InnerBlocks.
 */
registerBlockType("flip-blocks/flip-columns", {
	apiVersion: 3,
	title: __("Advanced Columns", "flip-blocks"),
	description: __("Add a pre-defined column layout.", "flip-blocks"),
	icon: "editor-table",
	category: "flip-blocks",
	keywords: [
		__("column", "flip-blocks"),
		__("grid", "flip-blocks"),
		__("row", "flip-blocks"),
	],
	attributes: {
		...BackgroundAttributes,
		columns: {
			type: "number",
		},
		layout: {
			type: "string",
		},
		columnsGap: {
			type: "number",
			default: 24,
		},
		rowGap: {
			type: "number",
			default: 24,
		},
		align: {
			type: "string",
		},
		responsiveToggle: {
			type: "boolean",
			default: true,
		},
		mobileColumns: {
			type: "number",
			default: 1,
		},
		reverseOnMB: {
			type: "boolean",
			default: false,
		},
		marginSync: {
			type: "boolean",
			default: false,
		},
		margin: {
			type: "number",
			default: 0,
		},
		marginTop: {
			type: "number",
			default: 0,
		},
		marginBottom: {
			type: "number",
			default: 0,
		},
		marginUnit: {
			type: "string",
			default: "px",
		},
		paddingSync: {
			type: "boolean",
			default: false,
		},
		padding: {
			type: "number",
			default: 0,
		},
		paddingTop: {
			type: "number",
			default: 0,
		},
		paddingRight: {
			type: "number",
			default: 0,
		},
		paddingBottom: {
			type: "number",
			default: 0,
		},
		paddingLeft: {
			type: "number",
			default: 0,
		},
		paddingUnit: {
			type: "string",
			default: "px",
		},
		backgroundColor: {
			type: "string",
		},
		columnMaxWidth: {
			type: "number",
		},
	},

	/* Add alignment to block wrapper. */
	getEditWrapperProps({ align }) {
		if (
			"left" === align ||
			"right" === align ||
			"full" === align ||
			"wide" === align
		) {
			return { "data-align": align };
		}
	},

	/* Render the block components. */
	edit: (props) => {
		return <Edit {...props} />;
	},

	/* Save the block markup. */
	save: (props) => {
		return <Save {...props} />;
	},
});
