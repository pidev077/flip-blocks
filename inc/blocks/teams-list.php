<?php
function flip_teams_list_render($atts)
{
    $bl_attr = shortcode_atts([
        'posts_per_page' => 6,
        'order' => 'DESC',
        'orderBy' => 'date',
        'anchor' => '',
        'className' => '',
    ], $atts);

    // Get first location term
    $first_location = get_terms([
        'taxonomy' => 'team-location',
        'hide_empty' => true,
        'number' => 1,
    ]);

    // Build query
    $query = [
        'post_type' => 'teams',
        'post_status' => 'publish',
        'posts_per_page' => $bl_attr['posts_per_page'],
        'order' => $bl_attr['order'],
        'orderby' => $bl_attr['orderBy'],
    ];

    // If have a first location → apply filter
    if (!empty($first_location) && !is_wp_error($first_location)) {
        $query['tax_query'] = [
            [
                'taxonomy' => 'team-location',
                'field' => 'slug',
                'terms' => $first_location[0]->slug,
            ]
        ];
    }

    $the_query = new WP_Query($query);

    ob_start();
    $anchor_html = !empty($bl_attr['anchor']) ? 'id=' . $bl_attr['anchor'] : '';


    // echo "<pre>";
    // echo print_r($bl_attr['posts_per_page']);
    // echo "</pre>";
    ?>
    <div <?= $anchor_html ?> class="block-teams-list <?= esc_attr($bl_attr['className']); ?>">
        <?php if ($the_query->have_posts()): ?>
            <div class="block-teams-list-inner">

                <?php
                // Get taxonomy filter
                $locations = get_terms([
                    'taxonomy' => 'team-location',
                    'hide_empty' => true,
                ]);
                ?>

                <!-- FILTER DROPDOWN -->
                <div class="teams-filter">
                    <?php if ($locations) {
                        $first_term = !empty($locations) ? $locations[0] : null; ?>
                        <div class="block-teams__action">
                            <div class="block-teams__drowdown" data-cate="<?= $first_term->term_id ?>">
                                <div class="block-teams__drowdown--label"><?= $first_term->name ?></div>

                                <div class="block-teams__drowdown--list">
                                    <?php foreach ($locations as $cat) { ?>
                                        <div class="block-teams__drowdown--item" data-id="<?= $cat->term_id ?>">
                                            <?= $cat->name ?>
                                        </div>
                                    <?php } ?>
                                </div>
                            </div>

                            <div class="teams-filter__loading"></div>
                        </div>
                    <?php } ?>
                </div>


                <!-- TEAM GRID (AJAX target) -->
                <div class="block-teams__list" data-query='<?= json_encode($query); ?>' data-id="" data-paged="1">

                    <?php while ($the_query->have_posts()):
                        $the_query->the_post(); ?>
                        <?php team_card(); ?>
                    <?php endwhile; ?>
                </div>

                <?php if ($the_query->max_num_pages > 1): ?>
                    <div class="block-teams-list__load-more">
                        <div class="loading"></div>
                        <button class="flip-btn btn-load-more"> Load More </button>
                    </div>
                <?php endif; ?>
            </div>

        <?php else: ?>
            <div class="flip-filter-posts-block--not-found">
                <?php _e('Sorry, no posts matched your criteria.', 'flip-blocks'); ?>
            </div>
        <?php endif; ?>
    </div>
    <?php
    wp_reset_postdata();
    return ob_get_clean();
}
function team_card()
{
    $team_id = get_the_ID();
    $img_url = get_the_post_thumbnail_url($team_id, 'team-thumb')
        ?: 'https://placehold.co/1280x720/FFE071/120A00?text=No+Image';

    $team_position = get_field('team_position', $team_id);
    ?>
    <div class="team-card" data-id="<?= $team_id ?>" data-media-type="image" data-media="<?= $img_url ?>" data-aos="fade-up"
        data-aos-duration="1000">
        <div class="team-item">
            <div class="team-item-inner">

                <div class="team-item__left">
                    <div class="team-item-content">
                        <h3><?php the_title(); ?></h3>
                        <?php if (!empty($team_position)): ?>
                            <p class="team-item__position"><?= esc_html($team_position); ?></p>
                        <?php endif; ?>
                    </div>
                </div>

                <div class="team-item__arrow">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <path
                            d="M25.5 33V21H19.5V24H22.5V33H18V36H30V33H25.5ZM24 12C23.555 12 23.12 12.132 22.75 12.3792C22.38 12.6264 22.0916 12.9778 21.9213 13.389C21.751 13.8001 21.7064 14.2525 21.7932 14.689C21.88 15.1254 22.0943 15.5263 22.409 15.841C22.7237 16.1557 23.1246 16.37 23.561 16.4568C23.9975 16.5436 24.4499 16.499 24.861 16.3287C25.2722 16.1584 25.6236 15.87 25.8708 15.5C26.118 15.13 26.25 14.695 26.25 14.25C26.25 13.6533 26.0129 13.081 25.591 12.659C25.169 12.2371 24.5967 12 24 12Z"
                            fill="#120A00" />
                        <path
                            d="M24 45C19.8466 45 15.7865 43.7684 12.333 41.4609C8.8796 39.1534 6.18798 35.8736 4.59854 32.0364C3.0091 28.1991 2.59323 23.9767 3.40352 19.9031C4.21381 15.8295 6.21386 12.0877 9.15077 9.15077C12.0877 6.21386 15.8295 4.21381 19.9031 3.40352C23.9767 2.59323 28.1991 3.0091 32.0364 4.59854C35.8736 6.18798 39.1534 8.8796 41.4609 12.333C43.7684 15.7865 45 19.8466 45 24C45 29.5696 42.7875 34.911 38.8493 38.8493C34.911 42.7875 29.5696 45 24 45ZM24 6.00001C20.4399 6.00001 16.9598 7.05569 13.9997 9.03356C11.0397 11.0114 8.73256 13.8226 7.37018 17.1117C6.0078 20.4008 5.65134 24.02 6.34587 27.5116C7.04041 31.0033 8.75474 34.2106 11.2721 36.7279C13.7894 39.2453 16.9967 40.9596 20.4884 41.6541C23.98 42.3487 27.5992 41.9922 30.8883 40.6298C34.1774 39.2675 36.9886 36.9604 38.9665 34.0003C40.9443 31.0402 42 27.5601 42 24C42 19.2261 40.1036 14.6477 36.7279 11.2721C33.3523 7.89643 28.7739 6.00001 24 6.00001Z"
                            fill="#120A00" />
                    </svg>
                </div>

            </div>

            <div class="team-item-media image">
                <img src="" alt="<?= esc_attr(get_the_title()) ?>" />
            </div>
        </div>
    </div>
    <?php
}
