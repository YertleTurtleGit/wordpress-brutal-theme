<?php get_header(); ?>

<?php if (have_posts()) : while (have_posts()) : the_post(); ?>        
    <?php $id = get_the_ID(); ?>
    <p><?php echo get_post_meta($id, 'time_and_place', true); ?></p>
    <?php echo get_event_image_tag($id); ?>

    <?php the_content(); ?>
<?php endwhile; endif; ?>

<?php get_footer(); ?>