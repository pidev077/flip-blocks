//import style
import './styles/style.scss'
import './styles/editor.scss'

import { __ } from '@wordpress/i18n'
import { registerBlockType } from '@wordpress/blocks'


import Edit from './components/edit'
import Save from './components/save'

const BlockAttrs = {
	postsPerCategory: {
		type: 'number',
		default: 8
	},
	viewAllLink: {
		type: 'string',
		default: ''
	},
	viewAllText: {
		type: 'string',
		default: 'Xem tất cả'
	},
	anchor: {
		type: 'string',
		default: ''
	},
};


export default registerBlockType('flip-blocks/block-team-experts', {
	title: __('Team Experts'),
	icon: 'groups',
	category: 'flip-blocks',
	keywords: [__('team'), __('experts'), __('doctors')],
	attributes: BlockAttrs,
	supports: {
		align: ['full'],
		anchor: true
	},
	/* Render the block in the editor. */
	edit: (props) => {
		return <Edit {...props} />;
	},

	/* Save the block markup. */
	save: (props) => {
		return <Save {...props} />;
	},
})
