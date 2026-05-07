<?php
function block_insights_render($atts, $content)
{
	$attrs = shortcode_atts([
		'order' => 'desc',
		'orderBy' => 'date',
		'posts_per_page' => 9,
		'className' => '',
		'anchor' => '',
	], $atts);

	$paged = get_query_var('paged') ? get_query_var('paged') : 1;

	$query = [
		'post_type' => 'post',
		'post_status' => 'publish',
		'order' => $attrs['order'],
		'orderby' => $attrs['orderBy'],
		'paged' => $paged,
		'posts_per_page' => $attrs['posts_per_page'],
	];

	$the_query = new WP_Query($query);

	$categories = get_categories([
		'hide_empty' => true,
	]);

	ob_start();
	$anchor_html = !empty($bl_attr['anchor']) ? 'id=' . $attrs['anchor'] : '';
	?>
	<div <?= $anchor_html ?> class="<?= implode(' ', ['block-insights', $attrs['className']]) ?>">
		<div class="block-insights__inner" data-query='<?= json_encode($query) ?>' data-id="-1" data-paged="1">
			<?php if ($categories) { ?>
				<div class="block-insights__action">
					<div class="block-insights__drowdown">
						<div class="block-insights__drowdown--label">All categories</div>

						<div class="block-insights__drowdown--list">
							<div class="block-insights__drowdown--item" data-id="-1">All categories</div>
							<?php foreach ($categories as $cat) { ?>
								<div class="block-insights__drowdown--item" data-id="<?= $cat->term_id ?>">
									<?= $cat->name ?>
								</div>
							<?php } ?>
						</div>
					</div>
				</div>
			<?php } ?>
			<div class="block-insights__grid">
				<?php
				if ($the_query->have_posts()) {
					while ($the_query->have_posts()) {
						$the_query->the_post();
						insight_card();
					}
				} else { ?>
					<div class="flip-filter-posts-block--not-found"> Sorry, no posts matched your criteria.</div>
				<?php } ?>
			</div>
			<div id="block-insights__infinite">
				<div class="block-insights__infinite-loading"></div>
			</div>
		</div>
	</div>
	<?php
	wp_reset_postdata();
	return ob_get_clean();
}

function insight_card()
{
	$post_id = get_the_ID();
	$img_url = get_the_post_thumbnail_url($post_id, 'insight-thumb');
	if (!$img_url) {
		$img_url = 'https://placehold.co/1280x720/FFE071/120A00?text=No+Image';
	}
	$cats = get_the_category($post_id);
	$cat_name = '';

	if (!empty($cats)) {
		$cat_name = esc_html($cats[0]->name);
	}

	$focal_point = get_post_meta($post_id, 'featured_image_focal_point', true);
	$focal_x = isset($focal_point['x']) ? $focal_point['x'] * 100 : 50;
	$focal_y = isset($focal_point['y']) ? $focal_point['y'] * 100 : 50;

	?>
	<div class="insight-card">
		<a class="insight-card__img" href="<?= get_the_permalink() ?>">
			<img src="<?= $img_url ?>" alt="<?= get_the_title() ?>"
				style="object-position: <?= $focal_x ?>% <?= $focal_y ?>%;" />
			<?php if ($cat_name): ?>
				<div class="insight-card__cat"><?= $cat_name ?></div>
			<?php endif; ?>
		</a>
		<div class="insight-card__content">
			<h2 class="h5 insight-card__title"><a href="<?= get_the_permalink() ?>"><?= get_the_title() ?></a></h2>
			<a class="insight-card__link" href="<?= get_the_permalink() ?>">Read more</a>
		</div>
	</div>
	<?php
}