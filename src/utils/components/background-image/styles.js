/**
 * Background image styles.
 */

const BackgroundImageStyles = (attributes) => {
	console.log(attributes);
	const styles = {
		backgroundImage: attributes.backgroundImgURL
			? `url(${attributes.backgroundImgURL})`
			: undefined,
		backgroundPosition: attributes.focalPoint
			? `${attributes.focalPoint.x * 100}% ${attributes.focalPoint.y * 100
			}%`
			: undefined,
		backgroundSize: attributes.backgroundSize
			? attributes.backgroundSize
			: undefined,
		backgroundRepeat: attributes.backgroundRepeat
			? attributes.backgroundRepeat
			: undefined,
	};

	return styles;
};

export default BackgroundImageStyles;
