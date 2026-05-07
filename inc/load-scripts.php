<?php

/**
 * Blocks Initializer
 * Enqueue CSS/JS of all the blocks.
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
	exit;
}

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 *
 * Assets enqueued:
 * 1. style-index.css - Frontend + Backend.
 * 2. index.js - Backend.
 * 3. index.css - Backend.
 *
 * @uses {wp-blocks} for block type registration & related functions.
 * @uses {wp-element} for WP Element abstraction — structure of blocks.
 * @uses {wp-i18n} to internationalize the block's text.
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */

function flip_frontend_assets()
{

	wp_enqueue_style(
		'flip-block-style',
		plugins_url('build/style-index.css', dirname(__FILE__)),
		array(),
		'1.0.1',
	);
}
add_action('enqueue_block_assets', 'flip_frontend_assets');


function flip_editor_assets()
{

	wp_enqueue_script(
		'flip-block-script',
		plugins_url('/build/index.js', dirname(__FILE__)),
		array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'wp-edit-post'),
		'1.0.1',
		true
	);

	wp_enqueue_style(
		'flip-style-editor',
		plugins_url('build/index.css', dirname(__FILE__)),
		array('wp-edit-blocks'),
		'1.0.1',
	);

	// Localize
	$user_data = wp_get_current_user();
	unset($user_data->user_pass, $user_data->user_email);
	// WP Localized globals. Use dynamic PHP stuff in JavaScript via `variablesGlobal` object.
	wp_localize_script(
		'flip-block-script',
		'variablesGlobal', // Array containing dynamic data for a JS Global.
		[
			'pluginDirPath' => plugin_dir_path(__DIR__),
			'pluginDirUrl' => plugin_dir_url(__DIR__),
			'user_data' => $user_data,
			// Add more data here that you want to access from `variablesGlobal` object.
		]
	);
}
add_action('enqueue_block_editor_assets', 'flip_editor_assets');

/**
 * Enqueue assets for frontend
 *
 * @since 1.0.0
 */
function flip_blocks_frontend_assets()
{
	// Load the dismissible notice js.
	wp_enqueue_script('flip-blocks-app-min', plugins_url('assets/dist/index.js', dirname(__FILE__)), array('jquery'), filemtime(plugin_dir_path(__DIR__) . 'assets/dist/index.js'), true);
	wp_localize_script('flip-blocks-app-min', 'block_script', [
		'ajax_url' => admin_url('admin-ajax.php'),
	]);
}
add_action('wp_enqueue_scripts', 'flip_blocks_frontend_assets');
