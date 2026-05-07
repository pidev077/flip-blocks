/**
 * Background image attributes.
 */

const BackgroundAttributes = {
	backgroundImgURL: {
		type: 'string',
	},
	backgroundRepeat: {
		type: 'string',
		default: 'no-repeat',
	},
	backgroundSize: {
		type: 'string',
		default: 'cover',
	},
	focalPoint: {
		type: 'object',
	},
};

export default BackgroundAttributes;
