<?php
function flip_related_list_render($attributes) {

    $taxonomy = $attributes['taxonomy'] ?? '';
    $term_id  = (int) ($attributes['termId'] ?? 0);
   $show_tax_buttons = $attributes['showTaxonomyButtons'] ?? true;

    if (!$taxonomy) {
        return '<p>Please select taxonomy.</p>';
    }

    $posts_per_page = $attributes['posts_per_page'] ?? 3;
    $order          = $attributes['order'] ?? 'DESC';
    $orderBy        = $attributes['orderBy'] ?? 'date';

    $args = [
        'post_type'      => 'case-study',
        'posts_per_page' => $posts_per_page,
        'orderby'        => $orderBy,
        'order'          => $order,
    ];

    if ($term_id > 0) {
        $args['tax_query'] = [
            [
                'taxonomy' => $taxonomy,
                'field'    => 'term_id',
                'terms'    => $term_id,
            ]
        ];
    }

    $query = new WP_Query($args);

    if (!$query->have_posts()) {
        return '';
    }

    ob_start();
    ?>
<div class="related-section__list-item">
   <div class="case-studies-wrapper">

      <?php while ($query->have_posts()) : $query->the_post();
                $pid   = get_the_ID();
                $image = get_the_post_thumbnail_url($pid, 'full');
                $video = get_field('featured_video', $pid);
            ?>
      <div class="item-post">

         <div class="item-post__thumbnail">
            <a href="<?php the_permalink(); ?>">

               <?php if ($image) : ?>
               <div class="featured-media">
                  <img src="<?php echo esc_url($image); ?>" alt="<?php the_title_attribute(); ?>">
               </div>
               <?php elseif ($video) : ?>
               <div class="featured-media">
                  <video autoplay muted loop playsinline>
                     <source src="<?php echo esc_url($video); ?>" type="video/mp4">
                  </video>
               </div>
               <?php endif; ?>

            </a>
            <?php
            if ($show_tax_buttons) : 
            $solutions = get_the_terms(get_the_ID(), 'case-study-solutions');
            ?>
            <div class="case-taxonomy-buttons">
               <?php if (!empty($solutions)) : ?>
               <?php foreach ($solutions as $term) : ?>
               <a class="case-btn solution" href="/solutions/<?php echo esc_html($term->slug); ?>">
                  <?= esc_html($term->name); ?>
               </a>
               <?php endforeach; ?>
               <?php endif; ?>
            </div>
            <?php endif; ?>
         </div>

         <div class="item-post-content">
            <h3>
               <a href="<?php the_permalink(); ?>">
                  <?php the_title(); ?>
               </a>
            </h3>
            <div class="item-post__client">
               <?php 
               $case_client = get_field('case_studies_client', get_the_ID());
               $name = $case_client['name_client'] ?? '';
               ?>
               <?php if ($name) : ?>
               <div class="client-name"><?= esc_html($name) ?></div>
               <?php endif; ?>
            </div>
         </div>

      </div>
      <?php endwhile; wp_reset_postdata(); ?>

   </div>
</div>
<?php

    return ob_get_clean();
}