<!doctype html>
<html class="no-js" lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>CV - Sacha Meunier</title>

    <link rel="stylesheet" href="./dist/css/main.css">
    <meta name="author" content="Sacha Meunier">
    <meta name="description"
          content="Bienvenue sur mon CV en ligne en tant que développeur Web. Découvrez mon parcours professionnel, ma formation, mes compétences et mes réalisations. Consultez mon site pour en savoir plus.">
    <meta name="keywords"
          content="développement web, développeur web, développeur front-end, développeur back-end, développement d’applications web, UX, UI, UX/UI, HTML, CSS, JavaScript, PHP, Git, programmation">

    <meta property="og:url" content="https://sachameunier-cv.com">
    <meta property="og:title" content="CV - Sacha Meunier">
    <meta property="og:type" content="website">
    <meta property="og:description"
          content="Bienvenue sur mon CV en ligne en tant que développeur Web. Découvrez mon parcours professionnel, ma formation, mes compétences et mes réalisations. Consultez mon site pour en savoir plus.">
    <meta property="og:image" content="/content/images/logo-menu.svg">
    <meta property="og:image:alt" content="Le logo de Sacha Meunier"/>

    <link rel="icon" type="image/svg+xml" href="./favicon.svg"/>
    <link rel="alternate icon" href="/favicon.ico"/>
</head>
<body>

<div id="trailer-holder">
    <div id="trailer" aria-hidden="true"></div>
</div>

<?php include 'src/php/header.php' ?>

<main role="main">
    <?php include 'src/php/hero.php' ?>
    <?php include 'src/php/project.php' ?>
    <?php include 'src/php/testimonials.php' ?>
    <?php include 'src/php/formation.php' ?>
    <?php include 'src/php/skills.php' ?>
    <?php include 'src/php/hobbys.php' ?>
    <?php include 'src/php/contact.php' ?>
</main>

<?php include 'src/php/footer.php' ?>

<script src="dist/js/main.js"></script>
</body>
</html>