import { __ } from "@wordpress/i18n";
import { InnerBlocks, RichText, useBlockProps } from "@wordpress/block-editor";
import Background from "./background";

const Save = (props) => {
	const { attributes, className } = props;
	const {
		typeHero,
		colorText,
		overlay,
		scrollAnchor,
	} = attributes;

	const blockProps = useBlockProps.save({
		className: [
			"hero-block",
			`hero-type-${typeHero}`,
			`${overlay ? "hero-overlay" : ""}`,
			className,
		].join(" "),
	});

	return (
		<div {...blockProps}>
			<Background {...props} />
			<div className="container">
				<div className="hero-block-content">
					

					
				</div>
			</div>
		</div>
	);
};

export default Save;
