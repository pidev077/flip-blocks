/**
 * Internal dependencies.
 */
import BackgroundImageStyles from "../../../utils/components/background-image/styles";
import classnames from "classnames";
/**
 * WordPress dependencies.
 */
import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";

const Save = (props) => {
	const { attributes, className } = props;
	const {
		borderRadius,
		isBoxshadow,
		isBorder,
		isSticky,
		marginSync,
		columnVerticalAlignment,
		paddingUnit,
		margin,
		marginUnit,
		backgroundColor,
		marginTop,
		marginBottom,
		paddingSync,
		padding,
		paddingTop,
		paddingRight,
		paddingBottom,
		paddingLeft,

		marginUnitTL,
		marginSyncTL,
		marginTopTL,
		marginBottomTL,
		marginTL,
		paddingTL,
		paddingUnitTL,
		paddingSyncTL,
		paddingTopTL,
		paddingLeftTL,
		paddingBottomTL,
		paddingRightTL,

		marginUnitMB,
		marginSyncMB,
		marginTopMB,
		marginBottomMB,
		marginMB,
		paddingMB,
		paddingUnitMB,
		paddingSyncMB,
		paddingTopMB,
		paddingLeftMB,
		paddingBottomMB,
		paddingRightMB,
	} = attributes;

	/* Setup the borderRadius styles. */
	let borderRadiusStyle;

	if (borderRadius) {
		borderRadiusStyle = {
			borderRadius: 0 < borderRadius ? borderRadius : null,
		};
	}

	/* Setup the margin styles. */
	let marginStyle;

	if (marginSync) {
		marginStyle = {
			marginTop: 0 < margin ? margin + marginUnit : null,
			marginBottom: 0 < margin ? margin + marginUnit : null,
		};
	} else {
		marginStyle = {
			marginTop: 0 < marginTop ? marginTop + marginUnit : null,
			marginBottom: 0 < marginBottom ? marginBottom + marginUnit : null,
		};
	}

	/* Setup the margin styles for tablet. */
	let marginStyleTL;

	if (marginSyncTL) {
		marginStyleTL = {
			"--marginTopTL": 0 < marginTL ? marginTL + marginUnitTL : null,
			"--marginBottomTL": 0 < marginTL ? marginTL + marginUnitTL : null,
		};
	} else {
		marginStyleTL = {
			"--marginTopTL": 0 < marginTopTL ? marginTopTL + marginUnitTL : null,
			"--marginBottomTL":
				0 < marginBottomTL ? marginBottomTL + marginUnitTL : null,
		};
	}

	/* Setup the margin styles for mobile. */
	let marginStyleMB;

	if (marginSyncMB) {
		marginStyleMB = {
			"--marginTopMB": 0 < marginMB ? marginMB + marginUnitMB : null,
			"--marginBottomMB": 0 < marginMB ? marginMB + marginUnitMB : null,
		};
	} else {
		marginStyleMB = {
			"--marginTopMB": 0 < marginTopMB ? marginTopMB + marginUnitMB : null,
			"--marginBottomMB":
				0 < marginBottomMB ? marginBottomMB + marginUnitMB : null,
		};
	}

	/* Setup the padding styles. */
	let paddingStyle;

	if (paddingSync) {
		paddingStyle = {
			padding: 0 < padding ? padding + paddingUnit : null,
		};
	} else {
		paddingStyle = {
			paddingTop: 0 < paddingTop ? paddingTop + paddingUnit : null,
			paddingRight: 0 < paddingRight ? paddingRight + paddingUnit : null,
			paddingBottom: 0 < paddingBottom ? paddingBottom + paddingUnit : null,
			paddingLeft: 0 < paddingLeft ? paddingLeft + paddingUnit : null,
		};
	}

	/* Setup the padding styles for tablet. */
	let paddingStyleTL;

	if (paddingSyncTL) {
		paddingStyleTL = {
			"--paddingTL": 0 < paddingTL ? paddingTL + paddingUnitTL : null,
		};
	} else {
		paddingStyleTL = {
			"--paddingTopTL":
				0 < paddingTopTL ? paddingTopTL + paddingUnitTL : null,
			"--paddingRightTL":
				0 < paddingRightTL ? paddingRightTL + paddingUnitTL : null,
			"--paddingBottomTL":
				0 < paddingBottomTL ? paddingBottomTL + paddingUnitTL : null,
			"--paddingLeftTL":
				0 < paddingLeftTL ? paddingLeftTL + paddingUnitTL : null,
		};
	}

	/* Setup the padding styles for mobile. */
	let paddingStyleMB;

	if (paddingSyncMB) {
		paddingStyleMB = {
			"--paddingMB": 0 < paddingMB ? paddingMB + paddingUnitMB : null,
		};
	} else {
		paddingStyleMB = {
			"--paddingTopMB":
				0 < paddingTopMB ? paddingTopMB + paddingUnitMB : null,
			"--paddingRightMB":
				0 < paddingRightMB ? paddingRightMB + paddingUnitMB : null,
			"--paddingBottomMB":
				0 < paddingBottomMB ? paddingBottomMB + paddingUnitMB : null,
			"--paddingLeftMB":
				0 < paddingLeftMB ? paddingLeftMB + paddingUnitMB : null,
		};
	}

	/* Misc styles. */
	const styles = {
		backgroundColor: backgroundColor,
		...BackgroundImageStyles(attributes),
	};

	const blockProps = useBlockProps.save({
		className: classnames(
			className,
			"flip-block-layout-column",
			isBorder ? "flip-has-border" : null,
			isBoxshadow ? "flip-has-boxshadow" : null,
			isSticky ? "is-sticky" : null,
			columnVerticalAlignment
				? "flip-is-vertically-aligned-" + columnVerticalAlignment
				: null
		),
		style: Object.assign(
			{},
			marginStyle,
			paddingStyle,
			borderRadiusStyle,
			marginStyleMB,
			marginStyleTL,
			paddingStyleTL,
			paddingStyleMB,
			styles
		),
	});

	return (
		<div {...blockProps}>
			<div className="flip-block-layout-column-inner">
				<InnerBlocks.Content />
			</div>
		</div>
	);
};

export default Save;
