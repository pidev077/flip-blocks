//import style
import './styles/style.scss'
import './styles/editor.scss'

import { __ } from '@wordpress/i18n'
import { registerBlockType } from '@wordpress/blocks'


import Edit from './components/edit'
import Save from './components/save'

const BlockAttrs = {
	posts_per_page: {
		type: 'number',
		default: 6
	},
	order: {
		type: 'string',
		default: 'desc'
	},
	orderBy: {
		type: 'string',
		default: 'date'
	},
	anchor: {
		type: 'string',
		default: ''
	},
};


export default registerBlockType('flip-blocks/block-teams-list', {
	title: __('Teams List'),
	icon: 'groups',
	category: 'flip-blocks',
	keywords: [__('list'), __('teams')],
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