function prefix_remove_comments_tl() {
        remove_menu_page( ‘edit-comments.php’ );
}

add_action( ‘admin_menu’, ‘prefix_remove_comments_tl’ );
