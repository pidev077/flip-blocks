const { Component } = wp.element;
const { applyFilters } = wp.hooks;

import getCurrentUserData from './../data-providers/currentUserData';

export default class RenderSettingControl extends Component {
	render() {
		if ('undefined' === typeof this.props.children) {
			return null;
		}

		let fallback = false;

		// Check if props.name is available directly on children
		if (
			!this.props.children.props ||
			'undefined' === typeof this.props.children.props.name
		) {
			fallback = true;
		}

		// Safely access _owner.memoizedProps only if _owner exists
		const ownerProps =
			this.props.children._owner &&
				this.props.children._owner.memoizedProps
				? this.props.children._owner.memoizedProps
				: null;

		if (fallback && (!ownerProps || 'undefined' === typeof ownerProps.name)) {
			return this.props.children;
		}

		const blockName = fallback
			? ownerProps?.name
			: this.props.children.props.name;

		if (
			applyFilters(
				'flip_should_render_block_setting',
				true,
				blockName,
				this.props.id,
				getCurrentUserData()
			)
		) {
			return this.props.children;
		}

		return null;
	}
}
