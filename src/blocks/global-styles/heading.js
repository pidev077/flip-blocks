import classnames from "classnames";
import { __ } from "@wordpress/i18n";
import { addFilter } from "@wordpress/hooks";
import { Fragment } from "@wordpress/element";
import { createHigherOrderComponent } from "@wordpress/compose";
import {
	SelectControl,
	ToggleControl,
	PanelBody,
	__experimentalUnitControl as UnitControl,
} from "@wordpress/components";
import { InspectorControls } from "@wordpress/block-editor";

const allowedBlocks = ["core/heading", "core/paragraph", "core/list"];

const addAttributes = (settings) => {
	if (allowedBlocks.includes(settings.name)) {
		settings.attributes = Object.assign(settings.attributes, {
			fontFamily: { type: "string" },
			enableAnimation: { type: "boolean", default: false },
			typeAnimation: { type: "string", default: "fadein-chars" },
			marginBottom: { type: "string", default: "" },
		});
	}
	return settings;
};

const withAdvancedControls = createHigherOrderComponent(
	(BlockEdit) => (props) => {
		const {
			name,
			attributes: { fontFamily, enableAnimation, typeAnimation, marginBottom },
			setAttributes,
		} = props;

		return (
			<Fragment>
				<BlockEdit {...props} />
				{allowedBlocks.includes(name) && (
					<InspectorControls group="settings" priority={10}>
						<PanelBody
							title={__("General", "flip-blocks")}
							initialOpen={true}
						>
							<SelectControl
								label="Select Font Family"
								value={fontFamily}
								options={[
									{ label: "--Select--", value: "" },
									{ label: "SVN-Ogg", value: "svn-ogg" },
									{ label: "be-vietnam-pro", value: "be-vietnam-pro" },
								]}
								onChange={(vl) => setAttributes({ fontFamily: vl })}
							/>
							<ToggleControl
								label="Enable Animation"
								checked={enableAnimation}
								onChange={() =>
									setAttributes({
										enableAnimation: !enableAnimation,
									})
								}
							/>
							<UnitControl
								label={__("Margin Bottom", "flip-blocks")}
								value={marginBottom}
								onChange={(vl) => setAttributes({ marginBottom: vl })}
								units={[
									{ value: "px", label: "px" },
									{ value: "em", label: "em" },
									{ value: "rem", label: "rem" },
									{ value: "%", label: "%" },
								]}
							/>
							{enableAnimation && (
								<SelectControl
									label="Select Animation"
									value={typeAnimation}
									options={[
										{ label: "Fade In Chars", value: "fadein-chars" },
										{
											label: "Stagger Random",
											value: "stagger-random",
										},
									]}
									onChange={(vl) =>
										setAttributes({ typeAnimation: vl })
									}
								/>
							)}
						</PanelBody>
					</InspectorControls>
				)}
			</Fragment>
		);
	},
	"withAdvancedControls"
);

const getFontClass = (fontFamily) =>
	fontFamily ? `has-${fontFamily}-font-family` : "";

const applyExtraClass = (
	extraProps,
	blockType,
	{ fontFamily, enableAnimation, typeAnimation, marginBottom }
) => {
	if (!allowedBlocks.includes(blockType.name)) {
		return extraProps;
	}

	extraProps.className = classnames(
		extraProps.className,
		getFontClass(fontFamily),
		enableAnimation ? `wp-block-heading-${typeAnimation}` : ""
	);

	if (marginBottom) {
		extraProps.style = {
			...extraProps.style,
			marginBottom,
		};
	}

	return extraProps;
};

const withEditorClass = createHigherOrderComponent(
	(BlockListBlock) => (props) => {
		if (!allowedBlocks.includes(props.name)) {
			return <BlockListBlock {...props} />;
		}

		const { fontFamily, enableAnimation, typeAnimation, marginBottom } =
			props.attributes;

		const wrapperProps = {
			...props.wrapperProps,
			className: classnames(
				props.wrapperProps?.className,
				getFontClass(fontFamily),
				enableAnimation ? `wp-block-heading-${typeAnimation}` : ""
			),
			style: {
				...props.wrapperProps?.style,
				...(marginBottom ? { marginBottom } : {}),
			},
		};

		return <BlockListBlock {...props} wrapperProps={wrapperProps} />;
	},
	"withEditorClass"
);

// Add filters
addFilter(
	"blocks.registerBlockType",
	"editorskit/custom-attributes",
	addAttributes
);
addFilter(
	"editor.BlockEdit",
	"editorskit/custom-advanced-control",
	withAdvancedControls
);
addFilter(
	"editor.BlockListBlock",
	"editorskit/with-editor-class",
	withEditorClass
);
addFilter(
	"blocks.getSaveContent.extraProps",
	"editorskit/applyExtraClass",
	applyExtraClass
);
