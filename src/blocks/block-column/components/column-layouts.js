/**
 * Column layouts available for each column option.
 */

import icons from "./icons";

const { __ } = wp.i18n;

const columnLayouts = {
	/* 1 column layout. */
	1: [
		{
			name: __("1 Column", "flip-blocks"),
			key: "flip-1-col-equal",
			col: 1,
			icon: icons.oneEqual,
		},
	],

	/* 2 column layouts. */
	2: [
		{
			name: __("2 Columns - 50/50", "flip-blocks"),
			key: "flip-2-col-equal",
			col: 2,
			icon: icons.twoEqual,
		},
		{
			name: __("2 Columns - 55/45", "flip-blocks"),
			key: "flip-2-col-wideleft",
			col: 2,
			icon: icons.twoLeftWide,
		},
		{
			name: __("2 Columns - 45/55", "flip-blocks"),
			key: "flip-2-col-wideright",
			col: 2,
			icon: icons.twoRightWide,
		},
		{
			name: __("2 Columns - 60/40", "flip-blocks"),
			key: "flip-2-col-wideleft-60-40",
			col: 2,
			icon: icons.twoLeftWide,
		},
		{
			name: __("2 Columns - 40/60", "flip-blocks"),
			key: "flip-2-col-wideright-60-40",
			col: 2,
			icon: icons.twoRightWide,
		},
		{
			name: __("2 Columns - 70/30", "flip-blocks"),
			key: "flip-2-col-wideleft-70-30",
			col: 2,
			icon: icons.twoLeftWide,
		},
		{
			name: __("2 Columns - 30/70", "flip-blocks"),
			key: "flip-2-col-wideright-70-30",
			col: 2,
			icon: icons.twoRightWide,
		},
		{
			name: __("2 Columns - 66/33", "flip-blocks"),
			key: "flip-2-col-wideleft-66-33",
			col: 2,
			icon: icons.twoLeftWide,
		},
		{
			name: __("2 Columns - 33/66", "flip-blocks"),
			key: "flip-2-col-wideright-66-33",
			col: 2,
			icon: icons.twoRightWide,
		},
		{
			name: __("2 Columns - 75/25", "flip-blocks"),
			key: "flip-2-col-wideleft-75-25",
			col: 2,
			icon: icons.twoLeftWide,
		},
		{
			name: __("2 Columns - 25/75", "flip-blocks"),
			key: "flip-2-col-wideright-25-75",
			col: 2,
			icon: icons.twoRightWide,
		},
	],

	/* 3 column layouts. */
	3: [
		{
			name: __("3 Columns - 33/33/33", "flip-blocks"),
			key: "flip-3-col-equal",
			col: 3,
			icon: icons.threeEqual,
		},
		{
			name: __("3 Columns - 25/50/25", "flip-blocks"),
			key: "flip-3-col-widecenter",
			col: 3,
			icon: icons.threeWideCenter,
		},
		{
			name: __("3 Columns - 40/20/40", "flip-blocks"),
			key: "flip-3-col-smallcenter",
			col: 3,
			icon: icons.threeSmallCenter,
		},
		{
			name: __("3 Columns - 50/25/25", "flip-blocks"),
			key: "flip-3-col-wideleft",
			col: 3,
			icon: icons.threeWideLeft,
		},
		{
			name: __("3 Columns - 25/25/50", "flip-blocks"),
			key: "flip-3-col-wideright",
			col: 3,
			icon: icons.threeWideRight,
		},
	],

	/* 4 column layouts. */
	4: [
		{
			name: __("4 Columns - 25/25/25/25", "flip-blocks"),
			key: "flip-4-col-equal",
			col: 4,
			icon: icons.fourEqual,
		},
		{
			name: __("4 Columns - 40/20/20/20", "flip-blocks"),
			key: "flip-4-col-wideleft",
			col: 4,
			icon: icons.fourLeft,
		},
		{
			name: __("4 Columns - 20/20/20/40", "flip-blocks"),
			key: "flip-4-col-wideright",
			col: 4,
			icon: icons.fourRight,
		},
	],

	/* 5 column layouts. */
	5: [
		{
			name: __("5 Columns", "flip-blocks"),
			key: "flip-5-col-equal",
			col: 5,
			icon: icons.fiveEqual,
		},
	],

	/* 6 column layouts. */
	6: [
		{
			name: __("6 Columns", "flip-blocks"),
			key: "flip-6-col-equal",
			col: 6,
			icon: icons.sixEqual,
		},
	],
};

export default columnLayouts;
