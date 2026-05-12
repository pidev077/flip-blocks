<?php
/**
 * Render callback for flip-blocks/block-products-list
 *
 * Cards are rendered inline. Popups are buffered and output via wp_footer
 * so they live directly inside <body> — outside any transformed wrapper
 * (e.g. Lenis) that would break position:fixed stacking.
 */

/* Collects post IDs that need a popup this page-load */
function _flip_products_popup_queue(): array {
    static $queue = [];
    if (func_num_args()) $queue = func_get_arg(0);
    return $queue;
}

/* Output all collected popups once, in wp_footer */
add_action('wp_footer', function () {
    $ids = _flip_products_popup_queue();
    if (empty($ids)) return;

    foreach ($ids as $id) {
        $brand       = get_field('product_brand', $id);
        $subtitle    = get_field('product_subtitle', $id);
        $gallery     = get_field('product_gallery', $id);
        $ingredients = get_field('product_ingredients', $id);
        $benefits    = get_field('product_benefits', $id);
        $cta_url     = get_field('product_cta_url', $id) ?: '#';
        $cta_label   = get_field('product_cta_label', $id) ?: 'Tư vấn sản phẩm này';

        $all_images = [];
        $thumb_id   = get_post_thumbnail_id($id);
        if ($thumb_id) {
            $all_images[] = [
                'url' => wp_get_attachment_image_url($thumb_id, 'large'),
                'alt' => get_the_title($id),
            ];
        }
        if ($gallery) {
            foreach ($gallery as $img) {
                $all_images[] = [
                    'url' => $img['url'],
                    'alt' => $img['alt'] ?: get_the_title($id),
                ];
            }
        }
        $has_multi = count($all_images) > 1;
        ?>
        <div class="product-popup" data-id="<?= $id ?>" role="dialog" aria-modal="true"
            aria-label="<?= esc_attr(get_the_title($id)) ?>">
            <div class="product-popup__overlay" aria-hidden="true"></div>

            <div class="product-popup__panel" data-lenis-prevent>

                <button class="product-popup__close" aria-label="Đóng">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </button>

                <?php if ($all_images): ?>
                <div class="product-popup__gallery" data-count="<?= count($all_images) ?>">
                    <?php foreach ($all_images as $i => $img): ?>
                        <div class="product-popup__gallery-slide <?= $i === 0 ? 'is-active' : '' ?>">
                            <img class="product-popup__gallery-img"
                                src="<?= esc_url($img['url']) ?>"
                                alt="<?= esc_attr($img['alt']) ?>"
                                loading="<?= $i === 0 ? 'eager' : 'lazy' ?>" />
                        </div>
                    <?php endforeach; ?>

                    <?php if ($has_multi): ?>
                        <button class="product-popup__gallery-nav product-popup__gallery-nav--prev" aria-label="Ảnh trước">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                        <button class="product-popup__gallery-nav product-popup__gallery-nav--next" aria-label="Ảnh sau">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                        <div class="product-popup__gallery-dots">
                            <?php for ($i = 0; $i < count($all_images); $i++): ?>
                                <button class="product-popup__gallery-dot <?= $i === 0 ? 'is-active' : '' ?>"
                                    aria-label="Ảnh <?= $i + 1 ?>"></button>
                            <?php endfor; ?>
                        </div>
                    <?php endif; ?>
                </div>
                <?php endif; ?>

                <div class="product-popup__body">
                    <?php if ($brand): ?>
                        <span class="product-popup__brand"><?= esc_html($brand) ?></span>
                    <?php endif; ?>

                    <h2 class="product-popup__title"><?= esc_html(get_the_title($id)) ?></h2>

                    <?php if ($subtitle): ?>
                        <p class="product-popup__subtitle"><?= esc_html($subtitle) ?></p>
                    <?php endif; ?>

                    <?php if ($ingredients): ?>
                        <div class="product-popup__section">
                            <h4 class="product-popup__section-title">Thành phần chính</h4>
                            <div class="product-popup__section-content"><?= wp_kses_post($ingredients) ?></div>
                        </div>
                    <?php endif; ?>

                    <?php if ($benefits): ?>
                        <div class="product-popup__section">
                            <h4 class="product-popup__section-title">Công dụng</h4>
                            <div class="product-popup__section-content"><?= wp_kses_post($benefits) ?></div>
                        </div>
                    <?php endif; ?>

                    <a href="<?= esc_url($cta_url) ?>" class="product-popup__cta"
                        target="_blank" rel="noopener noreferrer">
                        <?= esc_html($cta_label) ?>
                    </a>
                </div>

            </div>
        </div>
        <?php
    }
}, 99);


function flip_products_list_render($atts)
{
    $atts = shortcode_atts([
        'selectedIds' => [],
        'columns'     => 4,
        'anchor'      => '',
        'className'   => '',
    ], $atts);

    $selected_ids = array_filter(array_map('intval', (array) $atts['selectedIds']));

    if (!empty($selected_ids)) {
        $query_args = [
            'post_type'      => 'sanpham',
            'post_status'    => 'publish',
            'post__in'       => $selected_ids,
            'orderby'        => 'post__in',
            'posts_per_page' => count($selected_ids),
        ];
    } else {
        $query_args = [
            'post_type'      => 'sanpham',
            'post_status'    => 'publish',
            'posts_per_page' => -1,
            'orderby'        => 'menu_order',
            'order'          => 'ASC',
        ];
    }

    $query = new WP_Query($query_args);

    if (!$query->have_posts()) {
        return '<p class="block-products-list__empty">Chưa có sản phẩm nào.</p>';
    }

    $anchor_attr = !empty($atts['anchor']) ? ' id="' . esc_attr($atts['anchor']) . '"' : '';
    $cols        = max(1, min(6, (int) $atts['columns']));

    /* Queue post IDs for footer popup rendering */
    $existing_queue = _flip_products_popup_queue();
    $new_ids        = [];
    while ($query->have_posts()) {
        $query->the_post();
        $new_ids[] = get_the_ID();
    }
    $query->rewind_posts();
    _flip_products_popup_queue(array_unique(array_merge($existing_queue, $new_ids)));

    ob_start();
    ?>
<div<?= $anchor_attr ?> class="block-products-list <?= esc_attr($atts['className']); ?>"
    style="--product-cols: <?= $cols ?>;">

    <div class="block-products-list__grid">
        <?php while ($query->have_posts()):
            $query->the_post();
            $id        = get_the_ID();
            $thumb_url = get_the_post_thumbnail_url($id, 'large') ?: '';
            $brand     = get_field('product_brand', $id);
            $subtitle  = get_field('product_subtitle', $id);
            ?>
            <div class="product-card" data-product-id="<?= $id ?>" role="button" tabindex="0"
                aria-haspopup="dialog" aria-label="<?= esc_attr(get_the_title()) ?>">
                <div class="product-card__image-wrap">
                    <?php if ($thumb_url): ?>
                        <img class="product-card__image" src="<?= esc_url($thumb_url) ?>"
                            alt="<?= esc_attr(get_the_title()) ?>" loading="lazy" />
                    <?php endif; ?>
                </div>
                <div class="product-card__info">
                    <?php if ($brand): ?>
                        <span class="product-card__brand"><?= esc_html($brand) ?></span>
                    <?php endif; ?>
                    <h3 class="product-card__title"><?php the_title(); ?></h3>
                    <?php if ($subtitle): ?>
                        <p class="product-card__subtitle"><?= esc_html($subtitle) ?></p>
                    <?php endif; ?>
                </div>
            </div>
        <?php endwhile; wp_reset_postdata(); ?>
    </div>

</div>
    <?php
    return ob_get_clean();
}
