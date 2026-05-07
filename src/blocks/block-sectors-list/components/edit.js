import Inspector from "./inspector";
import ServerSideRender from "@wordpress/server-side-render";
import { useBlockProps } from "@wordpress/block-editor";

const Edit = (props) => {
	const { attributes } = props;

	const blockProps = useBlockProps();

	return (
		<div {...blockProps}>
			<Inspector {...props} />
			<ServerSideRender
				className="block-server-render"
				block="flip-blocks/block-sectors-list"
				attributes={attributes}
			/>
		</div>
	);
};

export default Edit;
