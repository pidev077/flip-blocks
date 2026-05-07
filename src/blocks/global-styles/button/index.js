const { addFilter } = wp.hooks;
const { __ } = wp.i18n;
const { PanelColorSettings, InspectorControls } = wp.blockEditor;
const { Fragment, useEffect  } = wp.element;
const { createHigherOrderComponent } = wp.compose;

import './style.scss';
import './editor.scss';

// Add custom attribute for hover color
const addCustomAttributes = (settings) => {
    if (settings.name !== 'core/button') {
        return settings;
    }

    return {
        ...settings,
        attributes: {
            ...settings.attributes,
            hoverColor: {
                type: 'string',
                default: '', // Default hover color
            },
            hoverBgColor: {
                type: 'string',
                default: '', // Default hover bg color
            },
        },
    };
};

addFilter('blocks.registerBlockType', 'custom/custom-button-attributes', addCustomAttributes);

// Add Hover Color Picker Control
const withInspectorControls = createHigherOrderComponent((BlockEdit) => {
    return (props) => {
        if (props.name !== 'core/button') {
            return <BlockEdit {...props} />;
        }

        const { attributes, setAttributes, clientId  } = props;
        const { hoverColor, hoverBgColor } = attributes;

        useEffect(() => {
            const blockEl = document.querySelector(`[data-block="${clientId}"]`);
            if (blockEl) {
                blockEl.style.setProperty('--hover-color', hoverColor || '');
                blockEl.style.setProperty('--hover-bg-color', hoverBgColor || '');
            }
        }, [hoverColor, hoverBgColor, clientId]);

        return (
            <Fragment>
                <BlockEdit {...props} />
                <InspectorControls group="styles">
                    <PanelColorSettings
                        title={__('Hover Color Settings', 'flip-blocks')}
                        initialOpen={true}
                        colorSettings={[
                            {
                                value: hoverColor,
                                onChange: (color) => setAttributes({ hoverColor: color }),
                                label: __('Hover Color', 'flip-blocks'),
                            },
                            {
                                value: hoverBgColor,
                                onChange: (color) => setAttributes({ hoverBgColor: color }),
                                label: __('Hover Background Color', 'flip-blocks'),
                            },
                        ]}
                    />
                </InspectorControls>
            </Fragment>
        );
    };
}, 'withInspectorControls');

addFilter('editor.BlockEdit', 'custom/custom-button-inspector', withInspectorControls);

// Apply hover color style
const applyExtraClass = (extraProps, blockType, attributes) => {
    if (blockType.name !== 'core/button') {
        return extraProps;
    }

    const { hoverColor, hoverBgColor } = attributes;

    if (hoverColor) {
        extraProps.style = {
            ...extraProps.style,
            '--hover-color': hoverColor
        };
    }

    if (hoverBgColor) {
        extraProps.style = {
            ...extraProps.style,
            '--hover-bg-color': hoverBgColor
        };
    }

    return extraProps;
};

addFilter('blocks.getSaveContent.extraProps', 'custom/applyCustomButtonClass', applyExtraClass);