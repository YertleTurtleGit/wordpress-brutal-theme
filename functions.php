<?php
function get_event_image_url(int $event_id): ?string {
    $image = get_post_meta($event_id, 'image', true);
    if (!$image) { return null; }
    return wp_get_attachment_image_src($image, 'large')[0];
}

function get_event_image_tag(int $event_id): string {
    $image_url = get_event_image_url($event_id);
    if (is_null($image_url)) { return ''; }
    return '<img src="' . $image_url . '" />';
}


function my_remove_admin_menus() {
    remove_menu_page( 'edit-comments.php' );
	remove_menu_page( 'edit.php' );
}
add_action( 'admin_menu', 'my_remove_admin_menus' );
function remove_comment_support() {
    remove_post_type_support( 'post', 'comments' );
    remove_post_type_support( 'page', 'comments' );
}
add_action('init', 'remove_comment_support', 100);
function mytheme_admin_bar_render() {
    global $wp_admin_bar;
    $wp_admin_bar->remove_menu('comments');
}
add_action( 'wp_before_admin_bar_render', 'mytheme_admin_bar_render' );
?>
