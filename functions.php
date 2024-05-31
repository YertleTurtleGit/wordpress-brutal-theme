<?php
function get_event_image_url(int $event_id): ?int {
    if (!get_post_meta($event_id, 'image', true)) { return null; }
    $image = get_post_meta($event_id, 'image', true);
    return wp_get_attachment_image_src($image, 'large')[0];
}

function get_event_image_tag(int $event_id): string {
    $image_url = get_event_image_url($event_id);
    if (is_null($image_url)) { return ''; }
    return '<img src="' . $image_url . '" />';
}
?>
