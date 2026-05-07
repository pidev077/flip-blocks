import { useBlockProps } from "@wordpress/block-editor";
import { Fragment } from "@wordpress/element";
import Inspector from "./inspector";

const Edit = (props) => {
	const { attributes, className } = props;
	const { colorBg, fullwidth, alignBlock } = attributes;

	const blockProps = useBlockProps({
		className: [
			"flip-separator-blocks",
			fullwidth ? "separator-fullwidth" : "",
			`separator-${alignBlock}`,
			className,
		].join(" "),
	});

	return (
		<Fragment>
			<Inspector {...props} />
			<div {...blockProps}>
				<div className="separators" style={{ background: colorBg }}></div>
			</div>
		</Fragment>
	);
};

export default Edit;
