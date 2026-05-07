<?php

/**
 * Register post meta for featured image focal point
 */
function featured_image_focal_point_post_meta()
{
	register_post_meta('', 'featured_image_focal_point', array(
		'type' => 'object',
		'description' => 'Focal point of the featured image',
		'single' => true,
		'show_in_rest' => array(
			'schema' => array(
				'type' => 'object',
				'properties' => array(
					'x' => array(
						'type' => 'number',
					),
					'y' => array(
						'type' => 'number',
					),
				),
			),
		),
	));
	register_post_meta('', 'featured_image_focal_point_mobile', array(
		'type' => 'object',
		'description' => 'Focal point for Mobile of the featured image',
		'single' => true,
		'show_in_rest' => array(
			'schema' => array(
				'type' => 'object',
				'properties' => array(
					'x' => array(
						'type' => 'number',
					),
					'y' => array(
						'type' => 'number',
					),
				),
			),
		),
	));
}
add_action('init', 'featured_image_focal_point_post_meta');



