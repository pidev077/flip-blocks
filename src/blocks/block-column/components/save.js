/**
 * External dependencies.
 */
import classnames from 'classnames';
// import BackgroundImageStyles from '../../../utils/components/background-image/styles';

/**
 * WordPress dependencies.
 */

import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

const Save = ( props ) => {
	const { attributes } = props;
	const {
		columns,
		layout,
		align,
		marginSync,
		margin,
		marginUnit,
		marginTop,
		marginBottom,
		paddingSync,
		padding,
		paddingUnit,
		paddingTop,
		paddingBottom,
	} = attributes;

	/* Setup the wrapper classes. */
	const classNames = classnames(
		[ className, 'flip-layout-columns-' + columns, layout ],
		{
			[ 'align' + align ]: align,
		}
	);

	/* Setup the margin styles. */
	let marginValue;

	if ( marginSync ) {
		marginValue = {
			marginTop: 0 < margin ? margin + marginUnit : null,
			marginBottom: 0 < margin ? margin + marginUnit : null,
		};
	} else {
		marginValue = {
			marginTop: 0 < marginTop ? marginTop + marginUnit : null,
			marginBottom: 0 < marginBottom ? marginBottom + marginUnit : null,
		};
	}

	/* Setup the padding styles. */
	let paddingValue;

	if ( paddingSync ) {
		paddingValue = {
			paddingTop: 0 < padding ? padding + paddingUnit : null,
			paddingBottom: 0 < padding ? padding + paddingUnit : null,
		};
	} else {
		paddingValue = {
			paddingTop: 0 < paddingTop ? paddingTop + paddingUnit : null,
			paddingBottom:
				0 < paddingBottom ? paddingBottom + paddingUnit : null,
		};
	}

	/* Misc styles. */
	// const styles = {
	// 	backgroundColor: backgroundColor,
	// 	...BackgroundImageStyles( attributes ),
	// };

	const className = classnames( [
		'flip-layout-column-wrap',
		'flip-block-layout-column-gap',
		attributes.responsiveToggle ? 'flip-is-responsive-column' : null,
		attributes.reverseOnMB ? 'reverse-column-mb' : null,
	] );

	const blockProps = useBlockProps.save( {
		className: classNames || undefined,
		style: Object.assign( marginValue, paddingValue ),
	} );

	return (
		<div { ...blockProps }>
			<div
				className={ className ? className : undefined }
				style={ {
					maxWidth: attributes.columnMaxWidth
						? attributes.columnMaxWidth
						: null,
					columnGap: attributes.columnsGap + 'px',
					rowGap: attributes.rowGap + 'px',
				} }
			>
				<InnerBlocks.Content />
			</div>
		</div>
	);
};
export default Save;
