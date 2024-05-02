<!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js">

<head>
    <meta charset="<?php bloginfo('charset'); ?>">

    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
    <meta name="author" content="Galerie Brutal">
    <meta name="title" content="Galerie Brutal" />
    <meta name="description" content="Galerie Brutal" />

    <link href="<?php echo get_bloginfo('template_directory'); ?>/style.css" rel='stylesheet'>

    <?php if (is_singular() && pings_open()) { ?>
        <link rel="pingback" href="<?php bloginfo('pingback_url'); ?>">
    <?php
    }
    wp_head(); ?>

    <?php
    global $post;
    $id = $post->ID;

    if ($excerpt = $post->post_excerpt) {
        $excerpt = strip_tags($post->post_excerpt);
    } else {
        $excerpt = get_bloginfo('description');
    }

    $page_permalink = get_the_permalink();
    $page_title = get_the_title();
    $page_name = get_bloginfo();
    $og_title = $page_title;
    ?>

    <title><?php echo $page_title; ?></title>

    <meta property="og:title" content="<?php echo $og_title; ?>" />
    <meta property="og:description" content="<?php echo $excerpt; ?>" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="<?php echo $page_permalink; ?>" />
    <meta property="og:site_name" content="<?php echo $page_name; ?>" />

    <?php
    $image_url = get_bloginfo('template_directory') . "/logo.png";

    if (get_post_type($id) == 'event') {
        $image_url = get_event_image_url($id);
        if ($image_url == '') {
            $image_url = get_bloginfo('template_directory') . "/logo.png";
        }
    }
    ?>

    <meta property="og:image" content="<?php echo $image_url; ?>" />
    <meta name="twitter:image" content="<?php echo $image_url; ?>" />

    <meta name="twitter:title" content="<?php echo $og_title; ?>" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:description" content="<?php echo $excerpt; ?>" />
    <meta name="twitter:url" content="<?php echo $page_permalink; ?>" />
</head>

<body <?php body_class(); ?>>

    <div id="header">
        <?php wp_nav_menu("main"); ?>
    </div>