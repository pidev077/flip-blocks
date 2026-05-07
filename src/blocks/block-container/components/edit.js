import {
	InnerBlocks,
	AlignmentToolbar,
	BlockControls,
	useBlockProps,
} from "@wordpress/block-editor";
import Inspector from "./inspector";
import classnames from "classnames";

const Edit = (props) => {
	const { attributes, setAttributes, className } = props;
	const {
		containerBgColor,
		containerPaddingTop,
		containerPaddingBottom,
		containerMaxWidth,
		containerImgURL,
		focalPoint,
		containerImgAlt,
		videoURL,
		zIndex,
		textAlign,
		borderRadiusTop,
		borderRadiusBottom,
		overflowHidden,
	} = attributes;

	const styles = {
		"--paddingTop": containerPaddingTop.default,
		"--paddingTopLaptop": containerPaddingTop.laptop,
		"--paddingTopTablet": containerPaddingTop.tablet,
		"--paddingTopMobile": containerPaddingTop.mobile,
		"--paddingBottom": containerPaddingBottom.default,
		"--paddingBottomLaptop": containerPaddingBottom.laptop,
		"--paddingBottomTablet": containerPaddingBottom.tablet,
		"--paddingBottomMobile": containerPaddingBottom.mobile,
		"--bg-color": containerBgColor,
		...(overflowHidden && { overflow: "hidden" }),
		zIndex: zIndex,
	};

	const classes = classnames(
		"flip-block-container",
		containerImgURL ? "flip-container-bg__image" : "",
		videoURL ? "flip-container-bg__video" : "",
		`container-alignment-${textAlign}`,
		borderRadiusTop ? "has-borer-radius-top" : "",
		borderRadiusBottom ? "has-borer-radius-bottom" : "",
		className
	);

	const blockProps = useBlockProps({
		className: classes,
		style: styles,
	});

	return (
		<>
			<BlockControls key="controls">
				<AlignmentToolbar
					value={textAlign}
					onChange={(value) => {
						setAttributes({ textAlign: value });
					}}
				/>
			</BlockControls>
			<Inspector {...props} />

			<div {...blockProps}>
				<div
					className="flip-container-bg"
					style={{ backgroundColor: containerBgColor }}
				>
					{containerImgURL && !!containerImgURL.length && (
						<img
							className="flip-container-image"
							src={containerImgURL}
							alt={containerImgAlt}
							style={{
								objectPosition: focalPoint
									? `${focalPoint.x * 100}% ${focalPoint.y * 100}%`
									: undefined,
							}}
						/>
					)}

					{videoURL && !!videoURL.length && (
						<video autoPlay muted loop playsInline>
							<source src={videoURL} type="video/mp4" />
							Your browser does not support HTML5 video.
						</video>
					)}
				</div>
				<div className="container">
					<div
						className="container__inner"
						style={{
							...(containerMaxWidth
								? { maxWidth: containerMaxWidth }
								: {}),
						}}
					>
						<InnerBlocks />
					</div>
				</div>
			</div>
		</>
	);
};

export default Edit;
