<?php

function flip_item_article()
{
   $categories = get_the_category();
   ?>
   <div class="item-post">
      <div class="item-post__thumbnail">
         <a href="<?= esc_url(get_permalink()) ?>">
            <?php the_post_thumbnail('full'); ?>
         </a>
      </div>
      <div class="item-post-content">
         <div class="item-post-inner">
            <?php if (!empty($categories) && isset($categories)): ?>
               <div class="item-post__cate">
                  <?php foreach ($categories as $category): ?>
                     <div class="item-cate">
                        <a href="/blog/?category=<?= $category->slug ?>">
                           <?= $category->name ?>
                        </a>
                     </div>
                  <?php endforeach; ?>
               </div>
            <?php endif; ?>

            <h3>
               <a href="<?= esc_url(get_permalink()) ?>">
                  <?php the_title(); ?>
               </a>
            </h3>

            <div class="item-post__excerpt"> <?php the_excerpt() ?> </div>
         </div>
      </div>

      <a href="<?= esc_url(get_permalink()) ?>" class="item-post__btn">
         Read more
      </a>
   </div>
<?php }

function flip_get_cates_posts()
{
   // Get current category from URL parameter
   $current_category = isset($_GET['category']) ? sanitize_text_field($_GET['category']) : 'all';
   $data_cate = 'all';
   $current_category_name = 'All';

   if ($current_category !== 'all') {
      $category = get_category_by_slug($current_category);
      if ($category && !is_wp_error($category)) {
         $data_cate = $category->term_id;
         $current_category_name = $category->name;
      }
   }
   $categories = get_categories();
   ?>
   <?php if (!empty($categories)): ?>
      <div class="flip-filter-posts-block__cates">
         <div class="flip-filter-posts-block__cates-heading">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
               <path
                  d="M9.33342 8.5V13.7533C9.36009 13.9533 9.29342 14.1667 9.14009 14.3067C9.07841 14.3685 9.00515 14.4175 8.9245 14.451C8.84385 14.4844 8.7574 14.5016 8.67009 14.5016C8.58278 14.5016 8.49632 14.4844 8.41567 14.451C8.33502 14.4175 8.26176 14.3685 8.20009 14.3067L6.86009 12.9667C6.78742 12.8956 6.73216 12.8086 6.69863 12.7126C6.66509 12.6167 6.65418 12.5142 6.66675 12.4133V8.5H6.64675L2.80675 3.58C2.69849 3.44102 2.64964 3.26484 2.67088 3.08995C2.69212 2.91507 2.78171 2.7557 2.92009 2.64667C3.04675 2.55333 3.18675 2.5 3.33342 2.5H12.6668C12.8134 2.5 12.9534 2.55333 13.0801 2.64667C13.2185 2.7557 13.3081 2.91507 13.3293 3.08995C13.3505 3.26484 13.3017 3.44102 13.1934 3.58L9.35342 8.5H9.33342Z"
                  fill="#667085" />
            </svg>

            Filter by
         </div>

         <div class="flip-filter-posts-block__cates-dropdown">
            <span id="data-cate" data-cate="<?= $data_cate ?>"><?= $current_category_name ?></span>

            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
               <path
                  d="M2.21934 4.46995C2.35997 4.3295 2.55059 4.25061 2.74934 4.25061C2.94809 4.25061 3.13871 4.3295 3.27934 4.46995L5.99934 7.18995L8.71934 4.46995C8.86152 4.33747 9.04956 4.26535 9.24386 4.26878C9.43816 4.2722 9.62355 4.35092 9.76096 4.48833C9.89837 4.62574 9.97709 4.81113 9.98052 5.00543C9.98394 5.19973 9.91182 5.38778 9.77934 5.52995L6.52934 8.77995C6.38871 8.9204 6.19809 8.99929 5.99934 8.99929C5.80059 8.99929 5.60997 8.9204 5.46934 8.77995L2.21934 5.52995C2.07889 5.38933 2 5.1987 2 4.99995C2 4.8012 2.07889 4.61058 2.21934 4.46995Z"
                  fill="#67737C" />
            </svg>

            <ul>
               <li data-cate="all">All</li>
               <?php foreach ($categories as $value): ?>
                  <li data-cate="<?= $value->term_id ?>"> <?= $value->name ?> </li>
               <?php endforeach; ?>
            </ul>
         </div>
      </div>
   <?php endif; ?>
<?php
}



function flip_get_team_detail_html($team_id)
{
   $img = get_the_post_thumbnail_url($team_id, 'large');
   if (!$img)
      $img = 'https://placehold.co/1280x720/FFE071/120A00?text=No+Image';

   $pos = get_field('team_position', $team_id);
   $email = get_field('team_email', $team_id);
   $post = get_post($team_id);

   ob_start(); ?>

   <div class="team-popup__left">
      <div class="team-popup__avatar">
         <img src="<?= esc_url($img) ?>" alt="<?= esc_attr(get_the_title($team_id)) ?>">
      </div>

      <h2 class="name h5"> <?= get_the_title($team_id) ?> </h2>

      <?php if ($pos): ?>
         <p class="role"><?= esc_html($pos) ?></p>
      <?php endif; ?>

      <?php if ($email): ?>
         <div class="email-icon">
            <a href="mailto:<?= esc_attr($email) ?>">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                     d="M21 4.5H3C2.60218 4.5 2.22064 4.65804 1.93934 4.93934C1.65804 5.22064 1.5 5.60218 1.5 6V18C1.5 18.3978 1.65804 18.7794 1.93934 19.0607C2.22064 19.342 2.60218 19.5 3 19.5H21C21.3978 19.5 21.7794 19.342 22.0607 19.0607C22.342 18.7794 22.5 18.3978 22.5 18V6C22.5 5.60218 22.342 5.22064 22.0607 4.93934C21.7794 4.65804 21.3978 4.5 21 4.5ZM19.35 6L12 11.085L4.65 6H19.35ZM3 18V6.6825L11.5725 12.615C11.698 12.7021 11.8472 12.7488 12 12.7488C12.1528 12.7488 12.302 12.7021 12.4275 12.615L21 6.6825V18H3Z"
                     fill="#120A00" />
               </svg>
            </a>
         </div>
      <?php endif; ?>
   </div>

   <div class="team-popup__right">
      <h3 class="title h6">ABOUT</h3>
      <div class="content">
         <?= apply_filters('the_content', $post->post_content); ?>
      </div>
   </div>
   <?php
   return ob_get_clean();
}