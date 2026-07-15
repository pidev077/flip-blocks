
import { InspectorControls } from '@wordpress/block-editor'
import { PanelBody, TextControl, RangeControl } from '@wordpress/components'


const Inspector = (props) => {
	const { attributes, setAttributes } = props
	const { postsPerCategory, viewAllLink, viewAllText } = attributes

	return (
		<InspectorControls>
			<PanelBody title='Content'>
				<RangeControl
					label='Members per category'
					value={postsPerCategory}
					onChange={(value) => setAttributes({ postsPerCategory: value })}
					min={1}
					max={20}
				/>
			</PanelBody>
			<PanelBody title='Xem tất cả'>
				<TextControl
					label='Button text'
					value={viewAllText}
					onChange={(value) => setAttributes({ viewAllText: value })}
				/>
				<TextControl
					label='Button link'
					value={viewAllLink}
					onChange={(value) => setAttributes({ viewAllLink: value })}
					placeholder='https://'
				/>
			</PanelBody>
		</InspectorControls>
	)
}

export default Inspector
