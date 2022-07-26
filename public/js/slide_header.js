$(document).ready(() => {
    $('header .owl-carousel').owlCarousel({
        items: 1,
        loop: true,
        nav: true,
        dots: false,
        autoplay: true,
        autoplaySpeed: 1000,
        smartSpeed: 1500,
        autoplayHoverPause: true,
    });

    $('#el_gallery .owl-carousel').owlCarousel({
        items: 3,
        loop: true,
        nav: false,
        dots: true,
        autoplay: true,
        autoplaySpeed: 1000,
        smartSpeed: 1500,
        autoplayHoverPause: true,
        animateOut: true,
        responsive: {
            0:{
                items: 1,
                center: true
            },
            600:{
                items: 2,
                center: true,
                margin: 20
            },
            900:{
                items: 3,
                center: true,
                margin: 20
            },
            1000:{
                items: 3,
                center: true,
                margin: 20
            },
            1300:{
                items: 4,
                center: true,
                margin: 20
            }
        }
    });

    $('#posts_facebook .owl-carousel').owlCarousel({
        items: 4,
        loop: true,
        nav: false,
        dots: true,
        autoplay: true,
        autoplaySpeed: 1000,
        smartSpeed: 1500,
        autoplayHoverPause: true,
        animateOut: true
    });
});