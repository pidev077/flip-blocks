import { __ } from '@wordpress/i18n'
const { Button, FontSizePicker, NavigableMenu, PanelBody, SelectControl } = wp.components;
const { createHigherOrderComponent } = wp.compose;
const { hasBlockSupport } = wp.blocks;
const { Fragment } = wp.element;
import { InspectorControls, LineHeightControl } from '@wordpress/block-editor';
const { useDispatch, useSelect } = wp.data;
import { cleanEmptyObject } from '../utils';

/**
 * Internal dependencies
 */
import { ResponsiveSettingStyle } from './responsive-settings-style';
import {
    BLOCKS_WITH_RESPONSIVE_SETTINGS,
    DEVICE_NAMES,
    DEVICE_SIZES,
    RESPONSIVE_SETTINGS_ATTRIBUTE,
} from '../constants';

import { conditionallyAddPxUnit, getFontSize, getFontSlug } from '../utils';

export const withResponsiveSettings = createHigherOrderComponent((BlockEdit) => {
    return (props) => {
        const {
            disableCustomFontSizes,
            enableCustomLineHeight,
            fontSizes,
        } = useSelect(
            (select) => select('core/block-editor').getSettings()
        );

        const selectedDevice = useSelect(
            (select) => {
                const { getDeviceType } = select('core/editor');
                return !!getDeviceType
                    ? getDeviceType()
                    : DEVICE_NAMES.desktop;
            }
        );

        const { setDeviceType } = useDispatch('core/editor');
        const isFontSizeDisabled = !hasBlockSupport(props.name, 'typography.fontSize', true) || !(fontSizes ? fontSizes.length : undefined);
        const isLineHeightDisabled = !hasBlockSupport(props.name, 'typography.lineHeight', true) || !enableCustomLineHeight;

        if (!BLOCKS_WITH_RESPONSIVE_SETTINGS.includes(props.name)) {
            return <BlockEdit {...props} />;
        }

        const setSelectedDevice = (device) => {
            if (!!setDeviceType) {
                setDeviceType(device);
            }
        };

        const getResponsiveValueForDevice = (responsiveSettingName, device) =>
            props.attributes[RESPONSIVE_SETTINGS_ATTRIBUTE] &&
                props.attributes[RESPONSIVE_SETTINGS_ATTRIBUTE][device]
                ? props.attributes[RESPONSIVE_SETTINGS_ATTRIBUTE][device][responsiveSettingName]
                : '';


        const getFontSizeOfSelectedDevice = () => {
            if (DEVICE_NAMES.desktop === selectedDevice) {
                let fontSizesAttr = undefined;
                if (props.attributes) {
                    if (props.attributes.style) {
                        if (props.attributes.style.typography) {
                            if (props.attributes.style.typography.fontSize) {
                                fontSizesAttr = props.attributes.style.typography.fontSize
                            }
                        }
                    }
                }
                return getFontSize(props.attributes.fontSize, fontSizes) ||
                    getFontSize(fontSizesAttr, fontSizes) ||
                    fontSizesAttr;
            }

            const responsiveValue = getResponsiveValueForDevice('fontSize', DEVICE_SIZES[selectedDevice]);

            return getFontSize(
                responsiveValue,
                fontSizes
            ) || responsiveValue;
        };

        const getLineHeightOfSelectedDevice = () => {
            let lineHeightVal = undefined;
            if (props.attributes) {
                if (props.attributes.style) {
                    if (props.attributes.style) {
                        if (props.attributes.style.typography) {
                            if (props.attributes.style.typography) {
                                lineHeightVal = props.attributes.style.typography.lineHeight
                            }
                        }
                    }
                }
            }
            return DEVICE_NAMES.desktop === selectedDevice ? lineHeightVal : getResponsiveValueForDevice('lineHeight', DEVICE_SIZES[selectedDevice]);
        }


        const setResponsiveValue = (key, value) => {
            props.setAttributes({
                [RESPONSIVE_SETTINGS_ATTRIBUTE]: {
                    ...props.attributes[RESPONSIVE_SETTINGS_ATTRIBUTE],
                    [DEVICE_SIZES[selectedDevice]]: {
                        ...props.attributes[RESPONSIVE_SETTINGS_ATTRIBUTE][DEVICE_SIZES[selectedDevice]],
                        [key]: value,
                    },
                },
            });
        };

        const mobileFont = getResponsiveValueForDevice('fontSize', DEVICE_SIZES.Mobile);
        const tabletFont = getResponsiveValueForDevice('fontSize', DEVICE_SIZES.Tablet);

        return (
            <Fragment>
                {Object.keys(props.attributes[RESPONSIVE_SETTINGS_ATTRIBUTE]).length
                    ? (
                        <style>
                            {isFontSizeDisabled
                                ? null
                                : (
                                    <Fragment>                                        
                                        <ResponsiveSettingStyle
                                            device={DEVICE_SIZES.Tablet}
                                            selectedDevice={DEVICE_SIZES[selectedDevice]}
                                            settingName="fontSize"
                                            settingValue={conditionallyAddPxUnit(
                                                getFontSize(tabletFont, fontSizes) || tabletFont
                                            )}
                                            clientId={props.clientId}
                                        />
                                        <ResponsiveSettingStyle
                                            device={DEVICE_SIZES.Mobile}
                                            selectedDevice={DEVICE_SIZES[selectedDevice]}
                                            settingName="fontSize"
                                            settingValue={conditionallyAddPxUnit(
                                                getFontSize(mobileFont, fontSizes) || mobileFont
                                            )}
                                            clientId={props.clientId}
                                        />
                                    </Fragment>
                                )
                            }
                            {isLineHeightDisabled
                                ? null
                                : (
                                    <Fragment>                                     
                                        <ResponsiveSettingStyle
                                            device={DEVICE_SIZES.Tablet}
                                            selectedDevice={DEVICE_SIZES[selectedDevice]}
                                            settingName="lineHeight"
                                            settingValue={getResponsiveValueForDevice('lineHeight', DEVICE_SIZES.Tablet)}
                                            clientId={props.clientId}
                                        />
                                        <ResponsiveSettingStyle
                                            device={DEVICE_SIZES.Mobile}
                                            selectedDevice={DEVICE_SIZES[selectedDevice]}
                                            settingName="lineHeight"
                                            settingValue={getResponsiveValueForDevice('lineHeight', DEVICE_SIZES.Mobile)}
                                            clientId={props.clientId}
                                        />
                                    </Fragment>
                                )
                            }
                        </style>
                    )
                    : null
                }
                <BlockEdit {...props} />
                <InspectorControls>
                    <PanelBody
                        title={__('Responsive Typography', '')}
                    >
                        <NavigableMenu className="flip-responsive-toggle" onNavigate={() => { }} orientation="horizontal">
                            <Button
                                icon="laptop"
                                showTooltip
                                label={__('Desktop view', 'flip-blocks')}
                                onClick={() => setSelectedDevice(DEVICE_NAMES.desktop)}
                                isPrimary={DEVICE_NAMES.desktop === selectedDevice}
                                isSecondary={DEVICE_NAMES.desktop !== selectedDevice}
                            >
                                {__('Desktop', 'flip-blocks')}
                            </Button>                            
                            <Button
                                icon="tablet"
                                showTooltip
                                label={__('Tablet view', 'flip-blocks')}
                                onClick={() => setSelectedDevice(DEVICE_NAMES.tablet)}
                                isPrimary={DEVICE_NAMES.tablet === selectedDevice}
                                isSecondary={DEVICE_NAMES.tablet !== selectedDevice}
                            >
                                {__('Tablet', 'flip-blocks')}
                            </Button>
                            <Button
                                icon="smartphone"
                                showTooltip
                                label={__('Mobile view', 'flip-blocks')}
                                onClick={() => setSelectedDevice(DEVICE_NAMES.mobile)}
                                isPrimary={DEVICE_NAMES.mobile === selectedDevice}
                                isSecondary={DEVICE_NAMES.mobile !== selectedDevice}
                            >
                                {__('Mobile', 'flip-blocks')}
                            </Button>
                        </NavigableMenu>
                        {isFontSizeDisabled
                            ? null
                            : (
                                <FontSizePicker
                                    value={getFontSizeOfSelectedDevice()}
                                    onChange={(newFontSize) => {
                                        const fontSizeSlug = getFontSlug(newFontSize, fontSizes);
                                        let typographyValue = undefined;
                                        let typographyStyle = undefined;
                                        if (props.attributes) {
                                            if (props.attributes.style) {
                                                typographyStyle = props.attributes.style;
                                                if (props.attributes.style.typography) {
                                                    typographyValue = props.attributes.style.typography
                                                }
                                            }
                                        }
                                        if (DEVICE_NAMES.desktop === selectedDevice) {
                                            props.setAttributes({
                                                style: cleanEmptyObject({
                                                    ...typographyStyle,
                                                    typography: {
                                                        ...typographyValue,
                                                        fontSize: fontSizeSlug ? undefined : newFontSize,
                                                    },
                                                }),
                                                fontSize: fontSizeSlug,
                                            });

                                            return;
                                        }

                                        setResponsiveValue('fontSize', fontSizeSlug || newFontSize);
                                    }}
                                    __nextHasNoMarginBottom
                                    fontSizes={fontSizes}
                                    disableCustomFontSizes={disableCustomFontSizes}
                                />
                            )
                        }
                        {isLineHeightDisabled || !LineHeightControl
                            ? null
                            : (
                                <LineHeightControl
                                    __nextHasNoMarginBottom={true}
                                    value={getLineHeightOfSelectedDevice()}
                                    onChange={(newLineHeight) => {
                                        if (DEVICE_NAMES.desktop === selectedDevice) {
                                            let styleValue = undefined;
                                            let typoValue = undefined;
                                            if (props.attributes) {
                                                styleValue = props.attributes.style
                                                if (props.attributes.style) {
                                                    typoValue = props.attributes.style.typography
                                                }
                                            }

                                            props.setAttributes({
                                                style: {
                                                    ...styleValue,
                                                    typography: {
                                                        ...typoValue,
                                                        lineHeight: newLineHeight,
                                                    },
                                                },
                                            });

                                            return;
                                        }

                                        setResponsiveValue('lineHeight', newLineHeight);
                                    }}
                                />
                            )
                        }
                    </PanelBody>
                </InspectorControls>
            </Fragment>
        );
    };
}, 'withResponsiveSettings');