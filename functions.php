<?php
function get_event_image_tag(int $event_id): string {
    if (!get_post_meta($event_id, 'image', true)) { return ''; }
    $image = get_post_meta($event_id, 'image', true);
    $image_url = wp_get_attachment_image_src($image, 'large')[0];
    return '<img src="' . $image_url . '" />';
}
?>
