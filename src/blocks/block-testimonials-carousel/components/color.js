const { __ } = wp.i18n;
import { __experimentalPanelColorGradientSettings as PanelColorGradientSettings } from "@wordpress/block-editor";
const ColorSettings = ({ attributes, setAttributes }) => {
	const { bgColor, contentColor, headingColor } = attributes;
	return (
		<PanelColorGradientSettings
			title={__("Color Controls")}
			settings={[
				{
					colorValue: bgColor,
					label: __("Background Color"),
					onColorChange: (newValue) =>
						setAttributes({ bgColor: newValue }),
				},
				{
					colorValue: headingColor,
					label: __("Heading Color"),
					onColorChange: (newValue) =>
						setAttributes({ headingColor: newValue }),
				},
				{
					colorValue: contentColor,
					label: __("Testimonials Color"),
					onColorChange: (newValue) =>
						setAttributes({ contentColor: newValue }),
				},
			]}
		/>
	);
};

export default ColorSettings;
