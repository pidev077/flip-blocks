import { InspectorControls } from "@wordpress/block-editor";
import {
	ToggleControl,
	PanelBody,
	RangeControl,
	SelectControl,
	ColorPicker,
} from "@wordpress/components";

const Inspector = (props) => {
	const { attributes, setAttributes } = props;
	const { colorBg, fullwidth, alignBlock } = attributes;

	return (
		<InspectorControls>
			<PanelBody title="Settings">
				<ToggleControl
					label="Fullwidth"
					checked={fullwidth}
					onChange={() => setAttributes({ fullwidth: !fullwidth })}
				/>
				{!fullwidth && (
					<SelectControl
						label="Alignment"
						value={alignBlock}
						options={[
							{ label: "Left", value: "left" },
							{ label: "Center", value: "center" },
							{ label: "Right", value: "right" },
						]}
						onChange={(value) => setAttributes({ alignBlock: value })}
					/>
				)}
			</PanelBody>
			<PanelBody initialOpen={false} title="Color">
				<ColorPicker
					color={colorBg}
					onChange={(value) => setAttributes({ colorBg: value })}
					enableAlpha
				/>
			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;
