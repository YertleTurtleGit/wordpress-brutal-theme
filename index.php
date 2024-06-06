<?php get_header(); ?>

<div id="body">
    <div id="title">
        <h1>Galerie Brutal</h1>
    </div>
    <div id="content">
        <p>blabla</p>
        <div id="canvas-div"></div>
    </div>
</div>

<script
    type="module"
    src="<?php echo get_bloginfo('template_directory'); ?>/render.js">
</script>

<?php get_footer(); ?>