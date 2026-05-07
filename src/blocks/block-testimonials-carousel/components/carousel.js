const { __ } = wp.i18n;
import {
	PanelBody,
	__experimentalNumberControl as NumberControl,
	ToggleControl,
} from "@wordpress/components";

const CarouselSettings = ({ attributes, setAttributes }) => {
	const { speed, autoplaySpeed, arrows, dots, autoplay, infinite } =
		attributes;

	return (
		<PanelBody title={__("Carousel Setting")}>
			<NumberControl
				label="Speed"
				isShiftStepEnabled={true}
				onChange={(vl) => setAttributes({ speed: parseInt(vl) })}
				shiftStep={10}
				step={10}
				value={speed}
			/>
			<NumberControl
				label="Autoplay Speed"
				isShiftStepEnabled={true}
				onChange={(vl) => setAttributes({ autoplaySpeed: parseInt(vl) })}
				shiftStep={10}
				step={10}
				value={autoplaySpeed}
			/>
			<ToggleControl
				label="Arrows"
				help={arrows ? "Enable arrows." : "Disable arrows."}
				checked={arrows}
				onChange={() => setAttributes({ arrows: !arrows })}
			/>
			<ToggleControl
				label="Infinite"
				help={infinite ? "Enable infinite." : "Disable infinite."}
				checked={infinite}
				onChange={() => setAttributes({ infinite: !infinite })}
			/>
			<ToggleControl
				label="Autoplay"
				help={autoplay ? "Enable autoplay." : "Disable autoplay."}
				checked={autoplay}
				onChange={() => setAttributes({ autoplay: !autoplay })}
			/>
		</PanelBody>
	);
};

export default CarouselSettings;
