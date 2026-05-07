import { isEmpty, mapValues, pickBy } from 'lodash';

/**
 * Internal dependencies
 */
import {
	BLOCKS_WITH_RESPONSIVE_SETTINGS,
	RESPONSIVE_SETTINGS_ATTRIBUTE,
} from './constants';


export const addResponsiveAttributes = ( settings, name ) => {
	if ( ! BLOCKS_WITH_RESPONSIVE_SETTINGS.includes( name ) ) {
		return settings;
	}

	return {
		...settings,
		attributes: {
			...settings.attributes,
			[ RESPONSIVE_SETTINGS_ATTRIBUTE ]: {
				type: 'object',
				default: {},
			},
		},
	};
};


export const camelToKebabCase = ( camelCase ) =>
	camelCase.replace(
		/([a-z])([A-Z1-9])/g,
		( match, p1, p2 ) => p1 + '-' + p2
	).toLowerCase();


export const conditionallyAddPxUnit = ( size ) => {
	if ( 'string' !== typeof size ) {
		return size;
	}

	return size.match( /[A-Za-z]+$/ )
		? size
		: `${ size }px`;
};

export const getFontSlug = (fontSize, fontSizes) => {
	let fontSizeSize = fontSizes.find((font) => fontSize === font.size);
	if (!fontSizeSize) return;
	return fontSizeSize.slug;
}

export const getFontSize = (fontSlug, fontSizes) => {
	let fontSizeSlug = fontSizes.find((font) => fontSlug === font.slug);
	if (!fontSizeSlug) return;
	return fontSizes.find((font) => fontSlug === font.slug).size;
}


export const cleanEmptyObject = ( object ) => {
	if (
		object === null ||
		typeof object !== 'object' ||
		Array.isArray( object )
	) {
		return object;
	}
	const cleanedNestedObjects = pickBy(
		mapValues( object, cleanEmptyObject ),
		Boolean
	);
	return isEmpty( cleanedNestedObjects ) ? undefined : cleanedNestedObjects;
};

