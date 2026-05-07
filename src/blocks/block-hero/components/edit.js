import { __ } from "@wordpress/i18n";
import { InnerBlocks, RichText, useBlockProps } from "@wordpress/block-editor";
import { Fragment } from "@wordpress/element";
import Inspector from "./inspector";
import Background from "./background";

const MY_TEMPLATE = [
	[
		"core/heading",
		{
			content: "ANVIL MEDIA",
			level: 1,
			style: { color: { text: "#FFE071" } },
		},
	],
];

const Edit = (props) => {
	const { attributes, setAttributes, className } = props;
	const { typeHero, colorText, overlay } = attributes;

	const blockProps = useBlockProps({
		className: [
			"hero-block",
			`hero-type-${typeHero}`,
			`${overlay ? "hero-overlay" : ""}`,
			className,
		].join(" "),
	});

	return (
		<Fragment>
			<Inspector {...props} />
			<div {...blockProps}>
				<Background {...props} />
				<div className="container">
					<div className="hero-block-content">
						
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default Edit;
