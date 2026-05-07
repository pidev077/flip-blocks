import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, RangeControl } from "@wordpress/components";

const Inspector = (props) => {
	const { attributes, setAttributes } = props;
	const { spaceBetween, speed } = attributes;

	return (
		<InspectorControls>
			<PanelBody title="Settings">
				<RangeControl
					label="Space Between (px)"
					value={spaceBetween}
					onChange={(value) => setAttributes({ spaceBetween: value })}
					min={0}
					max={150}
				/>
				<RangeControl
					label="Speed (ms)"
					value={speed}
					onChange={(value) => setAttributes({ speed: value })}
					min={100}
					max={10000}
				/>
			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;
