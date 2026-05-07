//add style global
import './styles/style.scss';
import './styles/editor.scss';

import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { Fragment, useEffect } from '@wordpress/element';
import { PanelBody, RangeControl } from '@wordpress/components';
import { createHigherOrderComponent } from '@wordpress/compose';
import { InspectorControls } from '@wordpress/block-editor';

const addHeightControl = createHigherOrderComponent((BlockEdit) => {
    return (props) => {
        if (props.name !== 'core/media-text') {
            return <BlockEdit {...props} />;
        }

        const { attributes, setAttributes, clientId } = props;
        const { heightMedia, gap } = attributes;

        useEffect(() => {
            const styleId = `media-text-style-${clientId}`;
            let styleEl = document.getElementById(styleId);

            if (!heightMedia && !gap && styleEl) {
                styleEl.parentNode.removeChild(styleEl);
                return;
            }

            if (heightMedia || gap) {
                if (!styleEl) {
                    styleEl = document.createElement('style');
                    styleEl.id = styleId;
                    document.head.appendChild(styleEl);
                }

                styleEl.innerHTML = `
                    .wp-block-media-text[data-block="${clientId}"] {
                        ${heightMedia ? `--minHeightMedia: ${heightMedia}%;` : ''}
                        ${gap ? `gap: ${gap}px;` : ''}
                    }
                `;
            }
        }, [heightMedia, gap]);

        return (
            <Fragment>
                <BlockEdit {...props} />
                <InspectorControls>
                    <PanelBody title={__('Media Height', 'flip-blocks')} initialOpen={true}>
                        <RangeControl
                            label={__('Height (%)', 'flip-blocks')}
                            value={heightMedia}
                            onChange={(newHeight) => setAttributes({ heightMedia: newHeight })}
                            __nextHasNoMarginBottom
                            min={0}
                            max={100}
                        />

                        <RangeControl
                            label={__('Gap (px)', 'flip-blocks')}
                            value={gap}
                            onChange={(newGap) => setAttributes({ gap: newGap })}
                            __nextHasNoMarginBottom
                            min={0}
                            max={200}
                        />
                    </PanelBody>
                </InspectorControls>
            </Fragment>
        );
    };
}, 'addHeightControl');

addFilter('editor.BlockEdit', 'flip-blocks/add-height-control', addHeightControl);

const addHeightAttribute = (settings) => {
    if (settings.name !== 'core/media-text') {
        return settings;
    }

    return {
        ...settings,
        attributes: {
            ...settings.attributes,
            heightMedia: {
                type: 'number',
                default: 30,
            },
            gap: {
                type: 'number',
                default: 32,
            }
        },
    };
};

addFilter('blocks.registerBlockType', 'flip-blocks/add-height-media-attribute', addHeightAttribute);

const applyHeightMediaStyle = (extraProps, blockType, attributes) => {
    if (blockType.name !== 'core/media-text') {
        return extraProps;
    }

    const { heightMedia, gap } = attributes;

    if (heightMedia) {
        extraProps.style = {
            ...extraProps.style,
            '--minHeightMedia': `${heightMedia}%`,
            gap: gap ? `${gap}px` : undefined,
        };
    }

    return extraProps;
};

addFilter('blocks.getSaveContent.extraProps', 'flip-blocks/apply-height-media-style', applyHeightMediaStyle);