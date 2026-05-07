
import { InspectorControls,  __experimentalLinkControl as LinkControl} from '@wordpress/block-editor'
import { QueryControls, PanelBody } from '@wordpress/components'


const Inspector = (props) => {
	const { attributes, setAttributes } = props
	const { posts_per_page, order, orderBy } = attributes

	return (
		<InspectorControls>
			<PanelBody title='Query'>
				<QueryControls
					{...{ orderBy, order, posts_per_page }}
					onOrderByChange={(newOrderBy) => setAttributes({ orderBy: newOrderBy })}
					onOrderChange={(newOrder) => setAttributes({ order: newOrder })}
					onNumberOfItemsChange={(newNumberOfItems) =>
						setAttributes({ posts_per_page: newNumberOfItems })
					}
				/>
			</PanelBody>
		</InspectorControls>
	)
}

export default Inspector