import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { Fragment } from '@wordpress/element';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { createHigherOrderComponent } from '@wordpress/compose';
import { InspectorControls } from '@wordpress/block-editor';

const VISIBILITY_ATTRIBUTES = {
	hideOnDesktop: { type: 'boolean', default: false },
	hideOnTablet: { type: 'boolean', default: false },
	hideOnMobile: { type: 'boolean', default: false },
};

const addImageVisibilityAttributes = (settings) => {
	if (settings.name !== 'core/image') {
		return settings;
	}

	return {
		...settings,
		attributes: {
			...settings.attributes,
			...VISIBILITY_ATTRIBUTES,
		},
	};
};

addFilter('blocks.registerBlockType', 'flip-blocks/add-image-visibility-attributes', addImageVisibilityAttributes);

const withImageVisibilityControls = createHigherOrderComponent((BlockEdit) => {
	return (props) => {
		if (props.name !== 'core/image') {
			return <BlockEdit {...props} />;
		}

		const { attributes, setAttributes } = props;
		const { hideOnDesktop, hideOnTablet, hideOnMobile } = attributes;

		return (
			<Fragment>
				<BlockEdit {...props} />
				<InspectorControls>
					<PanelBody title={__('Responsive Visibility', 'flip-blocks')} initialOpen={false}>
						<ToggleControl
							label={__('Hide on Desktop', 'flip-blocks')}
							checked={!!hideOnDesktop}
							onChange={(value) => setAttributes({ hideOnDesktop: value })}
							__nextHasNoMarginBottom
						/>
						<ToggleControl
							label={__('Hide on Tablet', 'flip-blocks')}
							checked={!!hideOnTablet}
							onChange={(value) => setAttributes({ hideOnTablet: value })}
							__nextHasNoMarginBottom
						/>
						<ToggleControl
							label={__('Hide on Mobile', 'flip-blocks')}
							checked={!!hideOnMobile}
							onChange={(value) => setAttributes({ hideOnMobile: value })}
							__nextHasNoMarginBottom
						/>
					</PanelBody>
				</InspectorControls>
			</Fragment>
		);
	};
}, 'withImageVisibilityControls');

addFilter('editor.BlockEdit', 'flip-blocks/add-image-visibility-controls', withImageVisibilityControls);

// Visually flag hidden-on-X images in the editor without touching the block's own markup.
const withImageVisibilityIndicator = createHigherOrderComponent((BlockListBlock) => {
	return (props) => {
		if (props.name !== 'core/image') {
			return <BlockListBlock {...props} />;
		}

		const { hideOnDesktop, hideOnTablet, hideOnMobile } = props.attributes;
		const hiddenDevices = [
			hideOnDesktop && __('Desktop', 'flip-blocks'),
			hideOnTablet && __('Tablet', 'flip-blocks'),
			hideOnMobile && __('Mobile', 'flip-blocks'),
		].filter(Boolean);

		if (!hiddenDevices.length) {
			return <BlockListBlock {...props} />;
		}

		return (
			<BlockListBlock
				{...props}
				wrapperProps={{
					...props.wrapperProps,
					className: `${props.wrapperProps?.className || ''} flip-image-hidden-preview`.trim(),
					'data-flip-hidden-devices': hiddenDevices.join(', '),
				}}
			/>
		);
	};
}, 'withImageVisibilityIndicator');

addFilter('editor.BlockListBlock', 'flip-blocks/add-image-visibility-indicator', withImageVisibilityIndicator);

const applyImageVisibilityClass = (extraProps, blockType, attributes) => {
	if (blockType.name !== 'core/image') {
		return extraProps;
	}

	const { hideOnDesktop, hideOnTablet, hideOnMobile } = attributes;
	const classes = [
		hideOnDesktop && 'flip-hide-desktop',
		hideOnTablet && 'flip-hide-tablet',
		hideOnMobile && 'flip-hide-mobile',
	].filter(Boolean);

	if (!classes.length) {
		return extraProps;
	}

	extraProps.className = `${extraProps.className || ''} ${classes.join(' ')}`.trim();

	return extraProps;
};

addFilter('blocks.getSaveContent.extraProps', 'flip-blocks/apply-image-visibility-class', applyImageVisibilityClass);
