<?php /* Template Name: Veranstaltungen Template */ ?>

<?php get_header(); ?>

<div id="main-column-wrapper">
    <div id="main-column">
        <ul class="event-list">
            <?php
            $query = new WP_Query(
                array(
                    'post_type' => 'event',
                    'posts_per_page' => -1,
                    'post_status' => 'publish',
                    'meta_key' => 'archive_date',
                    'orderby' => 'meta_value_num',
                    'meta_type' => 'NUMERIC',
                    'order' => 'DESC'
                )
            );
            ?>

            <?php $count = 0; ?>
            <?php while ($query->have_posts()) : $query->the_post(); ?>

                <?php $id = get_the_ID(); ?>

                <?php
                if (get_post_meta($id, 'archive_date', true) 
                    > (int) date('Ymd')) { 
                ?>

                    <li>
                        <h2><a href="<?php echo get_permalink(); ?>"><?php the_title(); ?></a></h2>

                        <div class="time_and_place">
                            <a href="<?php echo get_permalink(); ?>">
                                <?php echo get_post_meta($id, 'time_and_place', true); ?>
                            </a>
                        </div>
                        <?php echo get_event_image_tag($id); ?>
                    </li>
                    
                <?php $count++; } ?>
            <?php
            endwhile;
            wp_reset_query();
            ?>
        </ul>
        
        <?php if ($count == 0) { ?>
            <p>Momentan gibt es keine aktuellen Veranstaltungen.</p>
        <?php } ?>
    </div>
</div>

<?php get_footer(); ?>
