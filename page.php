<?php get_header(); ?>

<div id="main-column-wrapper">
    <div id="main-column">
        <h1><?php echo get_the_title(); ?></h1>
        <?php echo the_content(); ?>
    </div>
</div>

<?php get_footer(); ?>