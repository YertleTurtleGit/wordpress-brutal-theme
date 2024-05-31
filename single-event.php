<?php get_header(); ?>

<div class="single-event-wrapper">
<div class="single-event">

<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
    <h1><?php the_title(); ?></h1>        
    <?php $id = get_the_ID(); ?>
    <span class="time_and_place">
        <?php echo get_post_meta($id, 'time_and_place'); ?>
    </span>
    <?php echo get_event_image_tag($id); ?>

    <?php the_content(); ?>
<?php endwhile; endif; ?>

</div>
</div>

<?php get_footer(); ?>