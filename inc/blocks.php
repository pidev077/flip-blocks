<?php
if (!function_exists('flip_init_register_block')) {
	function flip_init_register_block()
	{

		register_block_type('flip-blocks/featured-case-studies', array(
			'render_callback' => 'featured_case_studies_render',
			'attributes' => array(
				'items' => array(
					'type' => 'array',
					'default' => [],
				),
				'className' => array(
					'type' => 'string',
				),
				'anchor' => array(
					'type' => 'string',
					'default' => '',
				)
			),
		));

		register_block_type('flip-blocks/block-filter-case-studies', array(
			'render_callback' => 'filter_case_studies_render',
			'attributes' => array(
				'posts_per_page' => array(
					'type' => 'number',
					'default' => 8,
				),
				'order' => array(
					'type' => 'string',
					'default' => 'desc',
				),
				'orderBy' => array(
					'type' => 'string',
					'default' => 'date',
				),
				'className' => array(
					'type' => 'string',
				),
				'anchor' => array(
					'type' => 'string',
					'default' => '',
				)
			),
		));

		register_block_type('flip-blocks/block-sectors-list', array(
			'render_callback' => 'flip_sectors_list_render',
			'attributes' => array(
				'posts_per_page' => array(
					'type' => 'number',
					'default' => -1,
				),
				'order' => array(
					'type' => 'string',
					'default' => 'desc',
				),
				'orderBy' => array(
					'type' => 'string',
					'default' => 'date',
				),
				'className' => array(
					'type' => 'string',
				),
				'link' => array(
					'type' => 'object',
				),
				'showProject' => array(
					'type' => 'boolean',
					'default' => true,
				),
				'anchor' => array(
					'type' => 'string',
					'default' => '',
				)
			),
		));

		register_block_type('flip-blocks/block-related-list', array(
			'render_callback' => 'flip_related_list_render',
			'attributes' => array(
				'posts_per_page' => array(
					'type' => 'number',
					'default' => 3,
				),
				'order' => array(
					'type' => 'string',
					'default' => 'desc',
				),
				'orderBy' => array(
					'type' => 'string',
					'default' => 'date',
				),
				'taxonomy' => array(
					'type' => 'string',
					'default' => 'case-study-sectors',
				),

				'termId' => array(
					'type' => 'number',
					'default' => 0,
				),
				'showTaxonomyButtons' => array(
					'type' => 'boolean',
					'default' => true,
				),
			),
		));


		register_block_type('flip-blocks/block-solutions-scroll', array(
			'render_callback' => 'flip_solutions_scroll_render',
			'attributes' => array(
				'posts_per_page' => array(
					'type' => 'number',
					'default' => 9,
				),
				'order' => array(
					'type' => 'string',
					'default' => 'desc',
				),
				'orderBy' => array(
					'type' => 'string',
					'default' => 'date',
				),
				'className' => array(
					'type' => 'string',
				),
				'anchor' => array(
					'type' => 'string',
					'default' => '',
				)
			),
		));

		register_block_type('flip-blocks/block-teams-list', array(
			'render_callback' => 'flip_teams_list_render',
			'attributes' => array(
				'posts_per_page' => array(
					'type' => 'number',
					'default' => 6,
				),
				'order' => array(
					'type' => 'string',
					'default' => 'desc',
				),
				'orderBy' => array(
					'type' => 'string',
					'default' => 'date',
				),
				'className' => array(
					'type' => 'string',
				),
				'anchor' => array(
					'type' => 'string',
					'default' => '',
				)
			),
		));


		register_block_type('flip-blocks/client-block', array(
			'render_callback' => 'flip_client_block',
			'attributes' => array(
				'className' => array(
					'type' => 'string',
					'default' => '',
				),
				'anchor' => array(
					'type' => 'string',
					'default' => '',
				),
			),
		));


		register_block_type('flip-blocks/block-services-list', array(
			'render_callback' => 'flip_services_list_render',
			'attributes' => array(
				'selectedIds' => array(
					'type'    => 'array',
					'default' => [],
					'items'   => array('type' => 'number'),
				),
				'columns' => array(
					'type'    => 'number',
					'default' => 3,
				),
				'className' => array(
					'type' => 'string',
				),
				'anchor' => array(
					'type'    => 'string',
					'default' => '',
				),
			),
		));

		register_block_type('flip-blocks/block-products-list', array(
			'render_callback' => 'flip_products_list_render',
			'attributes' => array(
				'selectedIds' => array(
					'type'    => 'array',
					'default' => [],
					'items'   => array('type' => 'number'),
				),
				'columns' => array(
					'type'    => 'number',
					'default' => 4,
				),
				'className' => array(
					'type' => 'string',
				),
				'anchor' => array(
					'type'    => 'string',
					'default' => '',
				),
			),
		));

		register_block_type('flip-blocks/block-insights', array(
			'render_callback' => 'block_insights_render',
			'attributes' => array(
				'posts_per_page' => array(
					'type' => 'number',
					'default' => 9,
				),
				'order' => array(
					'type' => 'string',
					'default' => 'desc',
				),
				'orderBy' => array(
					'type' => 'string',
					'default' => 'date',
				),
				'className' => array(
					'type' => 'string',
				),
				'anchor' => array(
					'type' => 'string',
				)
			),
		));
	}
}

add_action('init', 'flip_init_register_block');