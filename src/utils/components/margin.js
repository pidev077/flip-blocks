const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { RangeControl } = wp.components;

export default function Margin( props ) {
	const {
		// Margin top props
		marginTop,
		marginTopLabel,
		marginTopMin,
		marginTopMax,
		marginEnableTop,
		onChangeMarginTop = () => {},

		// Margin right props
		marginRight,
		marginRightLabel,
		marginRightMin,
		marginRightMax,
		marginEnableRight,
		onChangeMarginRight = () => {},

		// Margin bottom props
		marginBottom,
		marginBottomLabel,
		marginBottomMin,
		marginBottomMax,
		marginEnableBottom,
		onChangeMarginBottom = () => {},

		// Margin left props
		marginLeft,
		marginLeftLabel,
		marginLeftMin,
		marginLeftMax,
		marginEnableLeft,
		onChangeMarginLeft = () => {},

		// Margin vertical props
		marginVertical,
		marginVerticalLabel,
		marginEnableVertical,
		marginVerticalMin,
		marginVerticalMax,
		onChangeMarginVertical = () => {},

		// Margin horizontal props
		marginHorizontal,
		marginHorizontalLabel,
		marginEnableHorizontal,
		marginHorizontalMin,
		marginHorizontalMax,
		onChangeMarginHorizontal = () => {},
	} = props;

	return (
		<Fragment>
			{ marginEnableTop && (
				<RangeControl
					label={
						marginTopLabel
							? marginTopLabel
							: __( 'Margin Top', 'flip-blocks' )
					}
					value={ marginTop }
					min={ marginTopMin }
					max={ marginTopMax }
					onChange={ onChangeMarginTop }
					__nextHasNoMarginBottom
				/>
			) }
			{ marginEnableRight && (
				<RangeControl
					label={
						marginRightLabel
							? marginRightLabel
							: __( 'Margin Right', 'flip-blocks' )
					}
					value={ marginRight }
					min={ marginRightMin }
					max={ marginRightMax }
					onChange={ onChangeMarginRight }
					__nextHasNoMarginBottom
				/>
			) }
			{ marginEnableBottom && (
				<RangeControl
					label={
						marginBottomLabel
							? marginBottomLabel
							: __( 'Margin Bottom', 'flip-blocks' )
					}
					value={ marginBottom }
					min={ marginBottomMin }
					max={ marginBottomMax }
					onChange={ onChangeMarginBottom }
					__nextHasNoMarginBottom
				/>
			) }
			{ marginEnableLeft && (
				<RangeControl
					label={
						marginLeftLabel
							? marginLeftLabel
							: __( 'Margin Left', 'flip-blocks' )
					}
					value={ marginLeft }
					min={ marginLeftMin }
					max={ marginLeftMax }
					onChange={ onChangeMarginLeft }
					__nextHasNoMarginBottom
				/>
			) }
			{ marginEnableVertical && (
				<RangeControl
					label={
						marginVerticalLabel
							? marginVerticalLabel
							: __( 'Margin Vertical', 'flip-blocks' )
					}
					value={ marginVertical }
					min={ marginVerticalMin }
					max={ marginVerticalMax }
					onChange={ onChangeMarginVertical }
					__nextHasNoMarginBottom
				/>
			) }
			{ marginEnableHorizontal && (
				<RangeControl
					label={
						marginHorizontalLabel
							? marginHorizontalLabel
							: __( 'Margin Horizontal', 'flip-blocks' )
					}
					value={ marginHorizontal }
					min={ marginHorizontalMin }
					max={ marginHorizontalMax }
					onChange={ onChangeMarginHorizontal }
					__nextHasNoMarginBottom
				/>
			) }
		</Fragment>
	);
}
