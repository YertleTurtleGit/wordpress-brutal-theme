
<div id="canvas-div"></div>

<ul id="impress-menu">
    <li><a href="<?php echo get_home_url(); ?>/impressum">Impressum</a></li>
    <li><a href="<?php echo get_home_url(); ?>/datenschutz">Datenschutz</a></li>
</ul>

<script type="text/javascript">
    const THEME_PATH = "<?php echo get_bloginfo('template_directory'); ?>/";
</script>

<script
    type="module"
    src="<?php echo get_bloginfo('template_directory'); ?>/dist/bundle.js">
</script>

<?php wp_footer(); ?>
</body>

</html>