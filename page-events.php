<?php /* Template Name: Veranstaltungen Template */ ?>

<?php
function get_event_image_tag(int $event_id): string {
    if (!get_post_meta($event_id, 'image', true)) { return ''; }
    $image = get_post_meta($event_id, 'image', true);
    $image_url = wp_get_attachment_image_src($image, 'large')[0];
    return '<img id="event-image" src="' . $image_url . '" />';
}
?>

<ul class="event-list">
    <?php
    $query = new WP_Query(
        array(
            'post_type' => 'event',
            'posts_per_page' => -1,
            'post_status' => 'publish',
            'meta_key' => 'archive_date',
            'orderby' => 'meta_value_num',
            'meta_type' => 'DATE',
            'order' => 'DSC'
        )
    );
    ?>

    <?php $count = 0; ?>
    <?php while ($query->have_posts()) : $query->the_post(); ?>

        <?php $id = get_the_ID(); ?>

        <?php if (true) { ?>
            <li class="event-list-item">
                <a href="<?php echo get_permalink(); ?>">
                    <h2><?php the_title(); ?></h2>
                </a>
                <p><?php echo get_post_meta($id, 'time_and_place', true); ?></p>
                <?php echo get_event_image_tag($id); ?>
            </li>
        <?php count++; } ?>
    <?php
    endwhile;
    wp_reset_query();
    ?>

</ul>

<?php if ($count == 0) { ?>
    <p>Momentan gibt es keine aktuellen Veranstaltungen.</p>
<?php } ?>
