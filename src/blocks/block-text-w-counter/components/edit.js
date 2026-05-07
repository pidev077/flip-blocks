import { __ } from "@wordpress/i18n";
import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";
import { Fragment } from "@wordpress/element";
import Inspector from "./inspector";
import Counters from "./counters";

const MY_TEMPLATE = [
	[
		"core/heading",
		{
			content: "We’re the anvil at the hand of a blacksmith or a jeweller",
			level: 2,
			className: "h3",
		},
	],
	[
		"core/spacer",
		{
			height: "16px",
		},
	],
	[
		"core/paragraph",
		{
			content:
				"It’s our job to create a useful and beautiful solution for you. We mould integrated communications solutions through a rigorous process of strategic planning, creative-concept development and polished technical execution.",
		},
	],
	[
		"core/spacer",
		{
			height: "16px",
		},
	],
	[
		"core/buttons",
		{},
		[
			[
				"core/button",
				{
					text: `About us`,
				},
			],
		],
	],
];

const Edit = (props) => {
	const { attributes, className } = props;
	const { bgColor } = attributes;

	const blockProps = useBlockProps({
		className: ["block-text-w-counters", className].join(" "),
		style: { background: bgColor },
	});

	return (
		<Fragment>
			<Inspector {...props} />
			<div {...blockProps}>
				<div className="block-text-w-counters-inner">

					<Counters {...props} />
				</div>
			</div>
		</Fragment>
	);
};

export default Edit;
