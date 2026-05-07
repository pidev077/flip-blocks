/**
 * Components and dependencies.
 */
import classnames from 'classnames';
import BackgroundImageStyles from '../../../utils/components/background-image/styles';

/**
 * Create a Columns wrapper Component.
 */
const Columns = ( { attributes, className, children } ) => {
	/* Setup the background color class. */

	const {
		backgroundColor,
		columns,
		layout,
		columnMaxWidth,
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
		paddingRight,
		paddingBottom,
		paddingLeft,
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
	const styles = {
		backgroundColor: backgroundColor,
		...BackgroundImageStyles( attributes ),
	};

	return (
		<div
			className={ classNames || undefined }
			style={ Object.assign( marginValue, paddingValue, styles ) }
		>
			{ children }
		</div>
	);
};

export default Columns;
