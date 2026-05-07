<?php

add_action('wp_ajax_ajax_filter_insights', 'ajax_filter_insights');
add_action('wp_ajax_nopriv_ajax_filter_insights', 'ajax_filter_insights');
function ajax_filter_insights()
{
    $query = isset($_POST['query']) ? json_decode(stripslashes($_POST['query']), true) : [];
    $query = is_array($query) ? $query : [];
    $query['paged'] = isset($_POST['paged']) ? max(1, intval($_POST['paged'])) : 1;

    $cat_id = isset($_POST['cat_id']) ? intval($_POST['cat_id']) : -1;
    if ($cat_id !== -1) {
        $query['tax_query'] = [
            [
                'taxonomy' => 'category',
                'field' => 'term_id',
                'terms' => $cat_id,
            ]
        ];
    }

    $the_query = new WP_Query($query);

    ob_start();

    if ($the_query->have_posts()) {
        while ($the_query->have_posts()) {
            $the_query->the_post();
            insight_card();
        }
    } else {
        echo '<div class="message-not-found">Sorry, no posts matched your criteria.</div>';
    }

    $items = ob_get_clean();
    wp_reset_postdata();

    wp_send_json_success([
        'items' => $items,
        'max_pages' => $the_query->max_num_pages,
    ]);
}

add_action('wp_ajax_filter_case_studies', 'filter_case_studies_ajax');
add_action('wp_ajax_nopriv_filter_case_studies', 'filter_case_studies_ajax');

function filter_case_studies_ajax()
{
    $args = isset($_POST['query']) ? json_decode(stripslashes($_POST['query']), true) : [];
    $args = is_array($args) ? $args : [];
    $data_sector = isset($_POST['data_sector']) ? (int) $_POST['data_sector'] : -1;
    $data_solution = isset($_POST['data_solution']) ? (int) $_POST['data_solution'] : -1;
    $data_outcome = isset($_POST['data_outcome']) ? (int) $_POST['data_outcome'] : -1;
    $args['paged'] = isset($_POST['paged']) ? max(1, intval($_POST['paged'])) : 1;
    $tax_query = [
        'relation' => 'AND',
    ];

    if ($data_sector !== -1) {
        $tax_query[] = [
            'taxonomy' => 'case-study-sectors',
            'field' => 'term_id',
            'terms' => [$data_sector],
        ];
    }

    if ($data_solution !== -1) {
        $tax_query[] = [
            'taxonomy' => 'case-study-solutions',
            'field' => 'term_id',
            'terms' => [$data_solution],
        ];
    }

    if ($data_outcome !== -1) {
        $tax_query[] = [
            'taxonomy' => 'case-study-outcomes',
            'field' => 'term_id',
            'terms' => [$data_outcome],
        ];
    }

    if (count($tax_query) > 1) {
        $args['tax_query'] = $tax_query;
    }

    $query = new WP_Query($args);

    ob_start();
    $i = 0;
    if ($query->have_posts()):
        while ($query->have_posts()):
            $query->the_post();
            $delay = ($i % 2 === 0) ? 0 : 150;
            echo case_study_card($delay);
            $i++;
        endwhile;
    else:
        echo '<p class="no-items">Sorry, there are no case studies to display.</p>';
    endif;

    $items = ob_get_clean();
    wp_reset_postdata();

    wp_send_json_success([
        'items' => $items,
        'max_pages' => $query->max_num_pages,
        'q' => $args
    ]);
}


add_action('wp_ajax_ajax_filter_teams', 'ajax_filter_teams');
add_action('wp_ajax_nopriv_ajax_filter_teams', 'ajax_filter_teams');

function ajax_filter_teams()
{

    $query = isset($_POST['query']) ? json_decode(stripslashes($_POST['query']), true) : [];
    $query = is_array($query) ? $query : [];

    // Paged
    $query['paged'] = isset($_POST['paged']) ? max(1, intval($_POST['paged'])) : 1;

    // Tax filter
    $cat_slug = isset($_POST['catID']) ? sanitize_text_field($_POST['catID']) : '';

    if (!empty($cat_slug)) {
        $query['tax_query'] = [
            [
                'taxonomy' => 'team-location',
                'field' => 'term_id',
                'terms' => intval($cat_slug),
            ]
        ];
    }

    // Query
    $the_query = new WP_Query($query);

    ob_start();

    if ($the_query->have_posts()) {
        while ($the_query->have_posts()) {
            $the_query->the_post();
            team_card();
        }
    } else {
        echo '<div class="message-not-found">Sorry, no posts matched your criteria.1</div>';
    }

    $items = ob_get_clean();
    wp_reset_postdata();

    wp_send_json_success([
        'items' => $items,
        'has_more' => $query['paged'] < $the_query->max_num_pages
    ]);
}
add_action('wp_ajax_load_team_detail', 'load_team_detail');
add_action('wp_ajax_nopriv_load_team_detail', 'load_team_detail');

function load_team_detail()
{
    $team_id = isset($_POST['team_id']) ? intval($_POST['team_id']) : 0;
    if (!$team_id)
        wp_send_json_error();

    $html = flip_get_team_detail_html($team_id);

    wp_send_json_success([
        'html' => $html
    ]);
}