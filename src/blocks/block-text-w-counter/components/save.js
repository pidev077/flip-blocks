import { __ } from "@wordpress/i18n";
import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";
import Counters from "./counters";
const Save = (props) => {
	const { attributes, className } = props;
	const { bgColor } = attributes;

	const blockProps = useBlockProps.save({
		className: ["block-text-w-counters", className].join(" "),
		style: { background: bgColor },
	});

	return (
		<div {...blockProps}>
			<div className="block-text-w-counters-inner">

				<Counters {...props} />
			</div>
		</div>
	);
};

export default Save;
