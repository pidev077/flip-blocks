<?php function flip_sectors_list_render($atts)
{
    $atts = shortcode_atts(
        [
            "posts_per_page" => -1,
            "order" => "DESC",
            "orderBy" => "date",
            "anchor" => "",
            "link" => "",
            "showProject" => true,
            "className" => "",
        ],
        $atts
    );
    $query = [
        "post_type" => "post",
        "post_status" => "publish",
        "posts_per_page" => $atts["posts_per_page"],
        "order" => $atts["order"],
        "orderby" => $atts["orderBy"],
    ];
    $the_query = new WP_Query($query);
    $first_img_url = "";
    if (!empty($the_query->posts)) {
        $first_img_url = get_the_post_thumbnail_url(
            $the_query->posts[0]->ID,
            "full"
        );
    }
    ob_start();
    ?>
<div <?php if ($atts["anchor"]) {
    echo 'id="' . $atts["anchor"] . '"';
} ?> class="block-sectors-list">
   <div class="sector-floating-media">
      <img src="<?= esc_url($first_img_url); ?>" alt="">
   </div>
   <?php if (
       $the_query->have_posts()
   ): ?> <div class="block-sectors-list-inner"> <?php $index = 1; ?>
      <?php
      while ($the_query->have_posts()):

          $the_query->the_post();
          $featured_img_url = get_the_post_thumbnail_url(get_the_ID(), "full");
          ?>
      <div class="sector-item" data-img="<?= esc_url($featured_img_url); ?>" >
         <div class="sector-item-inner">
            <div class="container">
               <div class="sector-item__left"> <span class="sector-item__number"> /<?php echo get_the_date(
                   "d.m"
               ); ?>
                  </span>
               </div>
               <div class="sector-item__media">
                  <div class="sector-item-content">
                     <h4 class="title"><?php the_title(); ?></h4>
                  </div>
                  <div class="small-thumb"> <?php if (has_post_thumbnail()): ?>
                     <?php the_post_thumbnail("medium", [
                         "class" => "sector-item__thumb",
                     ]); ?> <?php endif; ?> </div>
               </div>
            </div>
         </div> <a href="<?= esc_url(
             get_permalink()
         ) ?>" aria-label="<?php the_title_attribute(); ?>"></a>
      </div> <?php $index++; ?> <?php
      endwhile;
      wp_reset_postdata();
      ?>
   </div> <?php else: ?> <div>Sorry, no posts
      matched your criteria.</div> <?php endif; ?>
</div> <?php return ob_get_clean();
}