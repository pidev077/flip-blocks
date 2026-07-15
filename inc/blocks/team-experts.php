<?php
function flip_team_experts_render($atts)
{
    $bl_attr = shortcode_atts([
        'postsPerCategory' => 8,
        'viewAllLink' => '',
        'viewAllText' => 'Xem tất cả',
        'anchor' => '',
        'className' => '',
    ], $atts);

    $categories = get_terms([
        'taxonomy' => 'team-category',
        'hide_empty' => true,
    ]);

    ob_start();
    $anchor_html = !empty($bl_attr['anchor']) ? 'id="' . esc_attr($bl_attr['anchor']) . '"' : '';
    ?>
    <div <?= $anchor_html ?> class="block-team-experts <?= esc_attr($bl_attr['className']); ?>">
        <div class="container">

        <?php if (!empty($categories) && !is_wp_error($categories)): ?>

            <div class="block-team-experts__tabs" role="tablist">
                <?php foreach ($categories as $index => $cat): ?>
                    <button type="button"
                        class="block-team-experts__tab<?= $index === 0 ? ' is-active' : '' ?>"
                        data-target="team-category-<?= $cat->term_id ?>" role="tab"
                        aria-selected="<?= $index === 0 ? 'true' : 'false' ?>">
                        <?= esc_html($cat->name); ?>
                    </button>
                <?php endforeach; ?>
            </div>

            <div class="block-team-experts__panels">
                <?php foreach ($categories as $index => $cat):
                    $group_image = get_field('team_category_group_image', 'term_' . $cat->term_id);
                    if (!$group_image) {
                        $group_image = 'https://placehold.co/760x900/E7E2D3/3C210E?text=' . urlencode($cat->name);
                    }

                    $members_query = new WP_Query([
                        'post_type' => 'teams',
                        'post_status' => 'publish',
                        'posts_per_page' => intval($bl_attr['postsPerCategory']),
                        'orderby' => 'menu_order date',
                        'order' => 'ASC',
                        'tax_query' => [
                            [
                                'taxonomy' => 'team-category',
                                'field' => 'term_id',
                                'terms' => $cat->term_id,
                            ]
                        ],
                    ]);
                    ?>
                    <div id="team-category-<?= $cat->term_id ?>" role="tabpanel"
                        class="block-team-experts__panel<?= $index === 0 ? ' is-active' : '' ?>">

                        <?php if ($members_query->have_posts()): ?>
                            <div class="block-team-experts__grid">
                                <div class="block-team-experts__cover">
                                    <img src="<?= esc_url($group_image); ?>" alt="<?= esc_attr($cat->name); ?>" />
                                </div>

                                <div class="block-team-experts__carousel">
                                    <div class="block-team-experts__swiper-wrap">
                                        <div class="block-team-experts__swiper swiper">
                                            <div class="swiper-wrapper">
                                                <?php while ($members_query->have_posts()):
                                                    $members_query->the_post(); ?>
                                                    <div class="swiper-slide">
                                                        <?php team_expert_card(); ?>
                                                    </div>
                                                <?php endwhile; ?>
                                            </div>
                                        </div>
                                    </div>

                                    <?php if ($members_query->post_count > 1): ?>
                                        <div class="block-team-experts__nav">
                                            <button type="button" class="block-team-experts__next"
                                                aria-label="Xem chuyên gia tiếp theo">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="9" height="12" viewBox="0 0 9 12"
                                                    fill="none">
                                                    <path
                                                        d="M0.000328146 11.1535L5.56433 5.58954L0.000328146 -0.000460863H3.22433L8.84033 5.58954L3.22433 11.1535H0.000328146Z"
                                                        fill="#406028" />
                                                </svg>
                                            </button>
                                        </div>
                                    <?php endif; ?>
                                </div>
                            </div>
                        <?php else: ?>
                            <div class="block-team-experts__empty">Chưa có thành viên trong chuyên mục này.</div>
                        <?php endif; ?>
                    </div>
                    <?php wp_reset_postdata(); ?>
                <?php endforeach; ?>
            </div>

        <?php endif; ?>

        <div class="block-team-experts__footer">
            <a class="block-team-experts__view-all" href="<?= esc_url($bl_attr['viewAllLink'] ?: '#'); ?>">
                <?= esc_html($bl_attr['viewAllText']); ?>
            </a>
        </div>

        </div>
    </div>
    <?php
    return ob_get_clean();
}

function team_expert_card()
{
    $team_id = get_the_ID();
    $img_url = get_the_post_thumbnail_url($team_id, 'team-thumb')
        ?: 'https://placehold.co/600x720/E7E2D3/3C210E?text=No+Image';

    $position = get_field('team_position', $team_id);
    ?>
    <div class="team-expert-card">
        <div class="team-expert-card__media">
            <img src="<?= esc_url($img_url); ?>" alt="<?= esc_attr(get_the_title()); ?>" />
        </div>
        <div class="team-expert-card__content">
            <h3 class="team-expert-card__name"><?php the_title(); ?></h3>
            <?php if (!empty($position)): ?>
                <p class="team-expert-card__position"><?= esc_html($position); ?></p>
            <?php endif; ?>
            <a class="team-expert-card__more" href="<?= esc_url(get_permalink()); ?>">Xem thêm ›</a>
        </div>
    </div>
    <?php
}

if (!function_exists('flip_seed_team_experts_demo_data')) {
    // One-time demo content so the "Đội ngũ chuyên môn" block has something to show out of the box.
    function flip_seed_team_experts_demo_data()
    {
        if (get_option('flip_team_experts_seeded')) {
            return;
        }

        if (!taxonomy_exists('team-category') || !post_type_exists('teams')) {
            return;
        }

        $demo_members = [
            ['name' => 'BS. Nguyễn Văn An', 'position' => 'Chuyên gia thẩm mỹ da', 'category' => 'Chuyên gia'],
            ['name' => 'BS. Trần Minh Khang', 'position' => 'Chuyên gia da liễu', 'category' => 'Chuyên gia'],
            ['name' => 'BS. Lê Thị Hồng Nhung', 'position' => 'Bác sĩ điều trị', 'category' => 'Bác sĩ'],
            ['name' => 'BS. Phạm Quốc Bảo', 'position' => 'Bác sĩ da liễu', 'category' => 'Bác sĩ'],
            ['name' => 'Đỗ Thị Thu Hà', 'position' => 'Chuyên viên chăm sóc da', 'category' => 'Chuyên viên'],
            ['name' => 'Vũ Thị Mai Anh', 'position' => 'Chuyên viên tư vấn', 'category' => 'Chuyên viên'],
        ];

        foreach ($demo_members as $member) {
            if (get_page_by_title($member['name'], OBJECT, 'teams')) {
                continue;
            }

            $post_id = wp_insert_post([
                'post_title' => $member['name'],
                'post_type' => 'teams',
                'post_status' => 'publish',
            ]);

            if (!$post_id || is_wp_error($post_id)) {
                continue;
            }

            update_field('team_position', $member['position'], $post_id);
            wp_set_object_terms($post_id, $member['category'], 'team-category');

            $seed_color = substr(md5($member['name']), 0, 6);
            $image_url = 'https://placehold.co/600x720/' . $seed_color . '/FFFFFF?text=' . urlencode($member['name']);
            $attachment_id = flip_sideload_placeholder_image($image_url, $post_id, $member['name']);
            if ($attachment_id) {
                set_post_thumbnail($post_id, $attachment_id);
            }
        }

        foreach (['Chuyên gia', 'Bác sĩ', 'Chuyên viên'] as $cat_name) {
            $term = get_term_by('name', $cat_name, 'team-category');
            if (!$term) {
                continue;
            }
            $existing_image = get_field('team_category_group_image', 'term_' . $term->term_id);
            if ($existing_image) {
                continue;
            }
            $cover_color = substr(md5($cat_name), 0, 6);
            $cover_url = 'https://placehold.co/760x900/' . $cover_color . '/FFFFFF?text=' . urlencode($cat_name);
            $attachment_id = flip_sideload_placeholder_image($cover_url, 0, $cat_name);
            if ($attachment_id) {
                update_field('team_category_group_image', $attachment_id, 'term_' . $term->term_id);
            }
        }

        update_option('flip_team_experts_seeded', 1);
    }

    add_action('init', 'flip_seed_team_experts_demo_data', 20);
}

if (!function_exists('flip_sideload_placeholder_image')) {
    function flip_sideload_placeholder_image($image_url, $post_id, $desc)
    {
        require_once ABSPATH . 'wp-admin/includes/media.php';
        require_once ABSPATH . 'wp-admin/includes/file.php';
        require_once ABSPATH . 'wp-admin/includes/image.php';

        $attachment_id = media_sideload_image($image_url, $post_id, $desc, 'id');

        return is_wp_error($attachment_id) ? 0 : $attachment_id;
    }
}
