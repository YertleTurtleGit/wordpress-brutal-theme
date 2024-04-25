<?php
function remove_from_admin_bar($wp_admin_bar) {
    if ( ! is_admin() ) { 
        // WordPress Core Items (uncomment to remove)
        //$wp_admin_bar->remove_node('updates');
        $wp_admin_bar->remove_node('comments');
        $wp_admin_bar->remove_node('new-content');
        //$wp_admin_bar->remove_node('wp-logo');
        //$wp_admin_bar->remove_node('site-name');
        //$wp_admin_bar->remove_node('my-account');
        //$wp_admin_bar->remove_node('search');
        //$wp_admin_bar->remove_node('customize');
    }
}
add_action('admin_bar_menu', 'remove_from_admin_bar', 999);
?>
