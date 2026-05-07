import ServerSideRender from "@wordpress/server-side-render";
import { useBlockProps } from "@wordpress/block-editor";

const Edit = (props) => {
	const { attributes } = props;

	const blockProps = useBlockProps();

	return (
		<div {...blockProps}>
			<ServerSideRender
				block="flip-blocks/client-block"
				attributes={attributes}
				className="client-block-editor"
			/>
		</div>
	);
};

export default Edit;
