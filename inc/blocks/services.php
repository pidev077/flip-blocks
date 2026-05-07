<?php
/**
 * Render callback for flip-blocks/block-services-list
 */
function flip_services_list_render($atts)
{
    $atts = shortcode_atts([
        'selectedIds' => [],
        'columns'     => 3,
        'anchor'      => '',
        'className'   => '',
    ], $atts);

    $selected_ids = array_filter(array_map('intval', (array) $atts['selectedIds']));

    if (!empty($selected_ids)) {
        $query_args = [
            'post_type'      => 'dichvu',
            'post_status'    => 'publish',
            'post__in'       => $selected_ids,
            'orderby'        => 'post__in',
            'posts_per_page' => count($selected_ids),
        ];
    } else {
        $query_args = [
            'post_type'      => 'dichvu',
            'post_status'    => 'publish',
            'posts_per_page' => -1,
            'orderby'        => 'menu_order',
            'order'          => 'ASC',
        ];
    }

    $query = new WP_Query($query_args);

    if (!$query->have_posts()) {
        return '<p class="block-services-list__empty">Chưa có dịch vụ nào.</p>';
    }

    $anchor_attr = !empty($atts['anchor']) ? ' id="' . esc_attr($atts['anchor']) . '"' : '';
    $cols        = max(1, min(4, (int) $atts['columns']));

    ob_start();
    ?>
<div<?= $anchor_attr ?> class="block-services-list <?= esc_attr($atts['className']); ?>"
    style="--service-cols: <?= $cols ?>;">

    <?php /* ── GRID CARDS ─────────────────────────────── */ ?>
    <div class="block-services-list__grid">
        <?php while ($query->have_posts()):
            $query->the_post();
            $id        = get_the_ID();
            $thumb_url = get_the_post_thumbnail_url($id, 'large') ?: '';
            $label     = get_field('service_card_label', $id);
            ?>
            <div class="service-card" data-service-id="<?= $id ?>" role="button" tabindex="0"
                aria-haspopup="dialog" aria-label="<?= esc_attr(get_the_title()) ?>">
                <?php if ($thumb_url): ?>
                    <img class="service-card__image" src="<?= esc_url($thumb_url) ?>"
                        alt="<?= esc_attr(get_the_title()) ?>" loading="lazy" />
                <?php endif; ?>
                <div class="service-card__overlay"></div>
                <div class="service-card__content">
                    <?php if ($label): ?>
                        <span class="service-card__label"><?= esc_html($label) ?></span>
                    <?php endif; ?>
                    <h3 class="service-card__title"><?php the_title(); ?></h3>
                </div>
            </div>
        <?php endwhile; wp_reset_postdata(); ?>
    </div>

    <?php /* ── POPUP OVERLAYS ──────────────────────────── */ ?>
    <?php
    $query->rewind_posts();
    while ($query->have_posts()):
        $query->the_post();
        $id = get_the_ID();

        $popup_subtitle  = get_field('service_popup_subtitle', $id) ?: 'Dịch vụ chuyên khoa da liễu';
        $popup_desc      = get_field('service_popup_description', $id);
        $popup_tagline   = get_field('service_popup_tagline', $id);
        $popup_image     = get_field('service_popup_image', $id);
        $overview        = get_field('service_overview', $id);
        $journey         = get_field('service_journey', $id);
        $pricing_type    = get_field('service_pricing_type', $id) ?: 'rows';
        $pricing         = get_field('service_pricing', $id);
        $pricing_cols    = get_field('service_pricing_columns', $id);
        $pricing_note    = get_field('service_pricing_note', $id);
        $footer_text     = get_field('service_footer_text', $id);
        $features        = get_field('service_features', $id);
        $cta_url         = get_field('service_cta_url', $id) ?: '#';
        $cta_note        = get_field('service_cta_note', $id) ?: 'Tư vấn miễn phí · bảo mật thông tin · không áp lực mua liệu trình';
        $right_bg        = get_field('service_right_bg', $id);

        $has_pricing     = ($pricing_type === 'rows' && !empty($pricing))
                        || ($pricing_type === 'columns' && !empty($pricing_cols));
        ?>
        <div class="service-popup" data-id="<?= $id ?>" role="dialog" aria-modal="true"
            aria-label="<?= esc_attr(get_the_title()) ?>">
            <div class="service-popup__overlay" aria-hidden="true"></div>

            <div class="service-popup__panel" data-lenis-prevent>

                <?php /* ── LEFT ─────────────────────────────── */ ?>
                <div class="service-popup__left">

                    <div class="service-popup__header">
                        <span class="service-popup__label"><?= esc_html($popup_subtitle) ?></span>
                        <h2 class="service-popup__title"><?php the_title(); ?></h2>
                        <?php if ($popup_desc): ?>
                            <div class="service-popup__desc"><?= nl2br(esc_html($popup_desc)) ?></div>
                        <?php endif; ?>
                        <?php if ($popup_tagline): ?>
                            <p class="service-popup__tagline"><?= esc_html($popup_tagline) ?></p>
                        <?php endif; ?>
                    </div>

                    <?php /* Overview stats */ ?>
                    <?php if ($overview): ?>
                    <div class="service-popup__section">
                        <h4 class="service-popup__section-title">Tổng quan &amp; chỉ số trải nghiệm</h4>
                        <div class="service-popup__overview">
                            <?php foreach ($overview as $item): ?>
                            <div class="service-popup__overview-item">
                                <?php if (!empty($item['overview_icon']['url'])): ?>
                                    <img src="<?= esc_url($item['overview_icon']['url']) ?>"
                                         alt="<?= esc_attr($item['overview_icon']['alt'] ?? '') ?>"
                                         class="service-popup__overview-icon" />
                                <?php endif; ?>
                                <?php if ($item['overview_label']): ?>
                                    <span class="service-popup__overview-label"><?= esc_html($item['overview_label']) ?></span>
                                <?php endif; ?>
                                <?php if ($item['overview_value']): ?>
                                    <p class="service-popup__overview-value"><?= nl2br(esc_html($item['overview_value'])) ?></p>
                                <?php endif; ?>
                            </div>
                            <?php endforeach; ?>
                        </div>
                    </div>
                    <?php endif; ?>

                    <?php /* Journey steps — with background wrap */ ?>
                    <?php if ($journey): ?>
                    <div class="service-popup__section">
                        <h4 class="service-popup__section-title">Hành trình chữa lành</h4>
                        <div class="service-popup__journey-wrap">
                            <div class="service-popup__journey" style="--journey-cols: <?= count($journey) ?>">
                                <?php foreach ($journey as $step_index => $step): ?>
                                <div class="journey-step">
                                    <span class="journey-step__number"><?= ($step_index + 1) ?></span>
                                    <?php if (!empty($step['journey_icon']['url'])): ?>
                                        <img src="<?= esc_url($step['journey_icon']['url']) ?>"
                                             alt="<?= esc_attr($step['journey_icon']['alt'] ?? '') ?>"
                                             class="journey-step__icon" />
                                    <?php endif; ?>
                                    <?php if ($step['journey_title']): ?>
                                        <h5 class="journey-step__title"><?= esc_html($step['journey_title']) ?></h5>
                                    <?php endif; ?>
                                    <?php if ($step['journey_desc']): ?>
                                        <p class="journey-step__desc"><?= nl2br(esc_html($step['journey_desc'])) ?></p>
                                    <?php endif; ?>
                                </div>
                                <?php endforeach; ?>
                            </div>
                        </div>
                    </div>
                    <?php endif; ?>

                    <?php /* Pricing — flexible layout */ ?>
                    <?php if ($has_pricing): ?>
                    <div class="service-popup__section">
                        <h4 class="service-popup__section-title">Bảng giá</h4>

                        <?php if ($pricing_type === 'rows' && $pricing): ?>
                            <?php /* Dạng hàng */ ?>
                            <div class="service-popup__pricing service-popup__pricing--rows">
                                <?php foreach ($pricing as $row): ?>
                                <div class="pricing-row">
                                    <span class="pricing-row__level"><?= esc_html($row['pricing_level']) ?></span>
                                    <?php if ($row['pricing_duration']): ?>
                                        <span class="pricing-row__duration"><?= esc_html($row['pricing_duration']) ?></span>
                                    <?php endif; ?>
                                    <span class="pricing-row__price"><?= esc_html($row['pricing_price']) ?></span>
                                </div>
                                <?php endforeach; ?>
                            </div>

                        <?php elseif ($pricing_type === 'columns' && $pricing_cols): ?>
                            <?php /* Dạng cột */ ?>
                            <div class="service-popup__pricing service-popup__pricing--columns"
                                 style="--pricing-cols: <?= count($pricing_cols) ?>;">
                                <?php foreach ($pricing_cols as $col): ?>
                                <div class="pricing-col">
                                    <?php if ($col['col_title']): ?>
                                        <div class="pricing-col__title"><?= esc_html($col['col_title']) ?></div>
                                    <?php endif; ?>
                                    <?php if (!empty($col['col_items'])): ?>
                                        <div class="pricing-col__items">
                                            <?php foreach ($col['col_items'] as $item): ?>
                                            <div class="pricing-col__item">
                                                <span class="pricing-col__item-label"><?= esc_html($item['item_label']) ?></span>
                                                <span class="pricing-col__item-price"><?= esc_html($item['item_price']) ?></span>
                                            </div>
                                            <?php endforeach; ?>
                                        </div>
                                    <?php endif; ?>
                                </div>
                                <?php endforeach; ?>
                            </div>
                        <?php endif; ?>

                        <?php if ($pricing_note): ?>
                            <p class="service-popup__pricing-note"><?= esc_html($pricing_note) ?></p>
                        <?php endif; ?>
                    </div>
                    <?php endif; ?>

                    <?php if ($footer_text): ?>
                        <p class="service-popup__footer-text"><?= nl2br(esc_html($footer_text)) ?></p>
                    <?php endif; ?>

                    <?php /* CTA — mobile only (desktop: right panel) */ ?>
                    <a href="<?= esc_url($cta_url) ?>" class="service-popup__cta service-popup__cta--mobile"
                        target="_blank" rel="noopener noreferrer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.836 1.357 5.371 3.49 7.067V22l3.185-1.749A11.05 11.05 0 0012 20.486c5.523 0 10-4.145 10-9.243C22 6.145 17.523 2 12 2zm1.022 12.443l-2.554-2.72-4.986 2.72 5.49-5.822 2.616 2.72 4.924-2.72-5.49 5.822z"/>
                        </svg>
                        Tư vấn ngay
                    </a>

                </div>

                <?php /* ── RIGHT: sticky — ảnh + features + CTA ── */ ?>
                <div class="service-popup__right">
                    <button class="service-popup__close" aria-label="Đóng">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                    </button>

                    <div class="service-popup__image-wrap">
                        <?php
                        $right_img = $popup_image;
                        if (empty($right_img['url'])) {
                            $fallback_url = get_the_post_thumbnail_url($id, 'large');
                            $right_img = ['url' => $fallback_url, 'alt' => get_the_title()];
                        }
                        if (!empty($right_img['url'])):
                        ?>
                            <img src="<?= esc_url($right_img['url']) ?>"
                                 alt="<?= esc_attr($right_img['alt'] ?? get_the_title()) ?>"
                                 class="service-popup__image" />
                        <?php endif; ?>
                    </div>

                    <div class="service-popup__right-bottom"<?php if ($right_bg): ?> style="background-image: url('<?= esc_url($right_bg) ?>')"<?php endif; ?>>
                        <?php if ($features): ?>
                        <div class="service-popup__features">
                            <?php foreach ($features as $feat): ?>
                            <div class="service-popup__feature-item">
                                <?php if (!empty($feat['feature_icon']['url'])): ?>
                                    <img src="<?= esc_url($feat['feature_icon']['url']) ?>"
                                         alt="<?= esc_attr($feat['feature_icon']['alt'] ?? '') ?>"
                                         class="service-popup__feature-icon" />
                                <?php endif; ?>
                                <?php if ($feat['feature_text']): ?>
                                    <span><?= esc_html($feat['feature_text']) ?></span>
                                <?php endif; ?>
                            </div>
                            <?php endforeach; ?>
                        </div>
                        <?php endif; ?>

                        <a href="<?= esc_url($cta_url) ?>" class="service-popup__cta service-popup__cta--desktop"
                            target="_blank" rel="noopener noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.836 1.357 5.371 3.49 7.067V22l3.185-1.749A11.05 11.05 0 0012 20.486c5.523 0 10-4.145 10-9.243C22 6.145 17.523 2 12 2zm1.022 12.443l-2.554-2.72-4.986 2.72 5.49-5.822 2.616 2.72 4.924-2.72-5.49 5.822z"/>
                            </svg>
                            Tư vấn ngay
                        </a>
                        <p class="service-popup__cta-note"><?= esc_html($cta_note) ?></p>
                    </div>
                </div>

            </div>
        </div>
    <?php endwhile; wp_reset_postdata(); ?>

</div>
    <?php
    return ob_get_clean();
}
