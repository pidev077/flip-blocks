import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl } from '@wordpress/components';
import { Fragment } from '@wordpress/element';

const generateRandomString = () => {
    return Math.random().toString(36).substr(2, 16);
};

function addCustomAttributes(settings, name) {
    if (name === 'core/spacer') {
        settings.attributes = Object.assign(settings.attributes, {
            tabletHeight: { type: 'number', default: null },
            mobileHeight: { type: 'number', default: null },
            customClass: { type: 'string', default: '' },
        });
    }
    return settings;
}
addFilter('blocks.registerBlockType', 'custom-spacer-height/attributes', addCustomAttributes);


const withCustomInspectorControls = createHigherOrderComponent((BlockEdit) => {
    return (props) => {
        if (props.name !== 'core/spacer') {
            return <BlockEdit {...props} />;
        }

        const { attributes, setAttributes } = props;
        const { tabletHeight, mobileHeight, customClass } = attributes;

        if (!customClass) {
            setAttributes({ customClass: `wp-block-spacer-${generateRandomString()}` });
        }

        return (
            <Fragment>
                <BlockEdit {...props} />
                <InspectorControls>
                    <PanelBody title="Responsive Height" initialOpen={true}>
                        <RangeControl
                            label="Tablet Height (px)"
                            value={tabletHeight}
                            onChange={(value) => setAttributes({ tabletHeight: value })}
                            __nextHasNoMarginBottom
                            min={0}
                            max={1000}
                        />
                        <RangeControl
                            label="Mobile Height (px)"
                            value={mobileHeight}
                            onChange={(value) => setAttributes({ mobileHeight: value })}
                            __nextHasNoMarginBottom
                            min={0}
                            max={1000}
                        />
                    </PanelBody>
                </InspectorControls>
            </Fragment>
        );
    };
}, 'withCustomInspectorControls');
addFilter('editor.BlockEdit', 'custom-spacer-height/controls', withCustomInspectorControls);


const addCustomStyle = (extraProps, blockType, attributes) => {
    if (blockType.name === 'core/spacer') {
        const { tabletHeight, mobileHeight, customClass } = attributes;
        let customStyle = '';

        if (tabletHeight) {
            customStyle += `@media (max-width: 1024px) { .${customClass} { height: ${tabletHeight}px !important; } }`;
        }
        if (mobileHeight) {
            customStyle += `@media (max-width: 767px) { .${customClass} { height: ${mobileHeight}px !important; } }`;
        }

        if (customStyle) {
            extraProps.dangerouslySetInnerHTML = {
                __html: `<style>${customStyle}</style>`,
            };
        }

        // Ensure the block has the unique class
        extraProps.className = `${extraProps.className || ''} ${customClass}`.trim();
    }
    return extraProps;
};
addFilter('blocks.getSaveContent.extraProps', 'custom-spacer-height/style', addCustomStyle);
