<?php
/**
 * Plugin Name: Flip Blocks
 * Plugin URI: https://github.com/weareflip/weareflip-2024-wp
 * Description: Flip Blocks is a collection of page building blocks for the Gutenberg block editor. Building pages with the block editor and gives you more control to quickly create and launch any kind of site you want.
 * Author: We are Flip
 * Author URI: https://weareflip.com
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
	exit;
}

define('PLUGIN_DIR_URL', plugin_dir_url(__FILE__));
define('PLUGIN_FILE_DIRECTORY', __DIR__);
define('PLUGIN_PLUGINS_PATH', plugins_url());


/**
 * Block Initializer.
 */
require_once plugin_dir_path(__FILE__) . 'inc/load-scripts.php';
require_once plugin_dir_path(__FILE__) . 'inc/responsive-controls.php';
require_once plugin_dir_path(__FILE__) . 'inc/helpers.php';
require_once plugin_dir_path(__FILE__) . 'inc/init.php';
require_once plugin_dir_path(__FILE__) . 'inc/ajax.php';
require_once plugin_dir_path(__FILE__) . 'inc/blocks.php';
require_once plugin_dir_path(__FILE__) . 'inc/templates.php';



