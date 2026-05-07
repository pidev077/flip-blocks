import { useBlockProps } from "@wordpress/block-editor";

const Save = (props) => {
	let { attributes, className } = props;
	const { colorBg, fullwidth, alignBlock } = attributes;

	const blockProps = useBlockProps.save({
		className: [
			"flip-separator-blocks",
			fullwidth ? "separator-fullwidth" : "",
			`separator-${alignBlock}`,
			className,
		].join(" "),
	});

	return (
		<div {...blockProps}>
			<div className="separators" style={{ background: colorBg }}></div>
		</div>
	);
};

export default Save;
