/**
 * External dependencies.
 */
import classnames from 'classnames';
import icons from './icons';
import Inspector from './inspector';
import columnLayouts from './column-layouts';
import memoize from 'memize';
import map from 'lodash/map';
import _times from 'lodash/times';

/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useState } from '@wordpress/element';
import {
	BlockControls,
	BlockAlignmentToolbar,
	InnerBlocks,
	withColors,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	Placeholder,
	ButtonGroup,
	Tooltip,
	Button,
} from '@wordpress/components';
import { compose } from '@wordpress/compose';
import BackgroundImageStyles from '../../../utils/components/background-image/styles';

/* Set allowed blocks and media. */
const ALLOWED_BLOCKS = [ 'flip-blocks/flip-column' ];

/* Get the column template. */
const getLayoutTemplate = memoize( ( columns ) => {
	return _times( columns, () => [ 'flip-blocks/flip-column' ] );
} );

const Edit = ( props ) => {
	const { attributes, setAttributes, className } = props;
	const [ selectLayout, setSelectLayout ] = useState( true );
	const {
		backgroundColor,
		columns,
		columnsGap,
		responsiveToggle,
		rowGap,
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
	const styles = {
		backgroundColor: backgroundColor,
		...BackgroundImageStyles( attributes ),
	};

	const blockProps = useBlockProps( {
		className: classNames || undefined,
		style: Object.assign( marginValue, paddingValue, styles ),
	} );

	let selectedRows = 1;

	if ( columns ) {
		selectedRows = parseInt( columns.toString().split( '-' ) );
	}

	const columnOptions = [
		{
			name: __( '1 Column', 'flip-blocks' ),
			key: 'one-column',
			columns: 1,
			icon: icons.oneEqual,
		},
		{
			name: __( '2 Columns', 'flip-blocks' ),
			key: 'two-column',
			columns: 2,
			icon: icons.twoEqual,
		},
		{
			name: __( '3 Columns', 'flip-blocks' ),
			key: 'three-column',
			columns: 3,
			icon: icons.threeEqual,
		},
		{
			name: __( '4 Columns', 'flip-blocks' ),
			key: 'four-column',
			columns: 4,
			icon: icons.fourEqual,
		},
		{
			name: __( '5 Columns', 'flip-blocks' ),
			key: 'five-column',
			columns: 5,
			icon: icons.fiveEqual,
		},
		{
			name: __( '6 Columns', 'flip-blocks' ),
			key: 'six-column',
			columns: 6,
			icon: icons.sixEqual,
		},
	];

	/* Show the layout placeholder. */
	if ( ! layout && selectLayout ) {
		return [
			<Placeholder
				key="placeholder"
				icon="editor-table"
				label={
					columns
						? __( 'Column Layout', 'flip-blocks' )
						: __( 'Column Number', 'flip-blocks' )
				}
				instructions={
					columns
						? __(
								'Select a layout for this column.',
								'flip-blocks'
						  )
						: __(
								'Select the number of columns for this layout.',
								'flip-blocks'
						  )
				}
				className={ 'flip-column-selector-placeholder' }
			>
				{ ! columns ? (
					<ButtonGroup
						aria-label={ __( 'Select Row Columns', 'flip-blocks' ) }
						className="flip-column-selector-group"
					>
						{ map(
							columnOptions,
							( { name, key, icon, columns } ) => (
								<Tooltip text={ name } key={ key }>
									<div className="flip-column-selector">
										<Button
											className={ classnames(
												'flip-column-selector-button',
												'flip-select-' + key
											) }
											isSmall
											onClick={ () => {
												setAttributes( {
													columns,
													layout:
														1 === columns ||
														5 === columns ||
														6 === columns
															? key
															: null,
												} );

												if ( 1 === columns ) {
													setSelectLayout( false );
												}
											} }
										>
											{ icon }
										</Button>
									</div>
								</Tooltip>
							)
						) }
					</ButtonGroup>
				) : (
					<Fragment>
						<ButtonGroup
							aria-label={ __(
								'Select Column Layout',
								'flip-blocks'
							) }
							className="flip-column-selector-group"
						>
							{ map(
								columnLayouts[ selectedRows ],
								( { name, key, icon } ) => (
									<Tooltip text={ name } key={ key }>
										<div className="flip-column-selector">
											<Button
												key={ key }
												className={ classnames(
													'flip-column-selector-button',
													key
												) }
												isSmall
												onClick={ () => {
													setAttributes( {
														layout: key,
													} );
													setSelectLayout( false );
												} }
											>
												{ icon }
											</Button>
										</div>
									</Tooltip>
								)
							) }
						</ButtonGroup>
						<Button
							className="flip-column-selector-button-back"
							onClick={ () => {
								setAttributes( {
									columns: null,
								} );
								setSelectLayout( true );
							} }
						>
							{ __(
								'Return to Column Selection',
								'flip-blocks'
							) }
						</Button>
					</Fragment>
				) }
			</Placeholder>,
		];
	}

	return [
		<BlockControls key="controls">
			<BlockAlignmentToolbar
				value={ align }
				onChange={ ( align ) => setAttributes( { align } ) }
				controls={ [ 'center', 'wide', 'full' ] }
			/>
		</BlockControls>,

		<Inspector { ...props } key="inspector" />,

		<div { ...blockProps } key="columns">
			<div
				className={ classnames(
					'flip-layout-column-wrap-admin',
					'flip-block-layout-column-gap',
					responsiveToggle ? 'flip-is-responsive-column' : null
				) }
				style={ {
					maxWidth: columnMaxWidth ? columnMaxWidth : null,
					'--columnGap': columnsGap + 'px',
					'--rowGap': rowGap + 'px',
				} }
			>
				<InnerBlocks
					template={ getLayoutTemplate( columns ) }
					// templateLock="all"
					allowedBlocks={ ALLOWED_BLOCKS }
				/>
			</div>
		</div>,
	];
};

export default compose( [ withColors( 'backgroundColor' ) ] )( Edit );
