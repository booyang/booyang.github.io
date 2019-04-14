(function ($) {
    "use strict";


    // particles.bgAnimation
    // ==================================================

    if ( $( "#bgAnimation" ).length ) {
        var bodyHeight = $("body").css("height");
        // console.log(bodyHeight);
        $( "#bgAnimation" ).css("height",$(document).height());
        $( "#bgAnimation" ).css("position","absolute");
        $( "#bgAnimation" ).css("top","100vh");
        particlesJS("bgAnimation",
            {
                "particles": {
                    "number": {
                        "value": 1,
                        "density": {
                            "enable": true,
                            "value_area": 500
                        }
                    },
                    "color": {
                        "value": "#71a2d9"
                    },
                    "shape": {
                        "type": "polygon",
                        "stroke": {
                            "width": 0,
                            "color": "#000000"
                        },
                        "polygon": {
                            "nb_sides": 6
                        },
                        "image": {
                            "src": "img/github.svg",
                            "width": 100,
                            "height": 100
                        }
                    },
                    "opacity": {
                        "value": 0.07215354273894853,
                        "random": false,
                        "anim": {
                            "enable": true,
                            "speed": 0.08120772123013452,
                            "opacity_min": 0.5116086437498474,
                            "sync": false
                        }
                    },
                    "size": {
                        "value": 248.58150711416587,
                        "random": true,
                        "anim": {
                            "enable": true,
                            "speed": 1,
                            "size_min": 93.51,
                            "sync": false
                        }
                    },
                    "line_linked": {
                        "enable": true,
                        "distance": 150,
                        "color": "#ffffff",
                        "opacity": 0.4,
                        "width": 1
                    },
                    "move": {
                        "enable": true,
                        "speed": 0.8,
                        "direction": "none",
                        "random": true,
                        "straight": false,
                        "out_mode": "out",
                        "bounce": false,
                        "attract": {
                            "enable": false,
                            "rotateX": 600,
                            "rotateY": 1200
                        }
                    }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": {
                        "onhover": {
                            "enable": false,
                            "mode": "repulse"
                        },
                        "onclick": {
                            "enable": false,
                            "mode": "push"
                        },
                        "resize": true
                    },
                    "modes": {
                        "grab": {
                            "distance": 400,
                            "line_linked": {
                                "opacity": 1
                            }
                        },
                        "bubble": {
                            "distance": 400,
                            "size": 40,
                            "duration": 2,
                            "opacity": 8,
                            "speed": 3
                        },
                        "repulse": {
                            "distance": 200,
                            "duration": 0.4
                        },
                        "push": {
                            "particles_nb": 4
                        },
                        "remove": {
                            "particles_nb": 2
                        }
                    }
                },
                "retina_detect": true
            }
        );
    }

    //--------------------------------------------------
    // Scroll down animation Hide/Reveal
    //--------------------------------------------------
    $(".navbar-toggler").on("click", function (a) {
        a.preventDefault(), $("header").addClass("fixed-header")
    });

    $('.navbar-nav .nav-link').on('click', function () {
        var toggle = $('.navbar-toggler').is(':visible');
        if (toggle) {
            $('.navbar-collapse').collapse('hide');
        }
    });


    //dropdown
    dropDown();

    function dropDown() {
        var mDropdown = $(".m-dropdown-toggle")
        mDropdown.on("click", function () {
            $(this).parent().toggleClass("open-menu-parent");
            $(this).next('ul').toggleClass("open-menu");
            $(this).toggleClass("open");
        });
        $(".submenu").attr("style", "display: none!important");

        $(".dropdowns").on('mouseover', function () {
            $(".submenu").attr("style", "display: block!important");
        });
        $(".dropdowns").on('mouseleave', function () {
            $(".submenu").attr("style", "display: none!important");
        });

    }

    // navbar scroll
    navbarScrol();

    function navbarScrol() {
        var wind = $(window);
        var HHeight = $('.header-height .fixed-header-bar').height();
        wind.on("scroll", function () {
            $('header').height(HHeight);
            var bodyScroll = wind.scrollTop();

            if (bodyScroll > 300) {
                $('header').addClass('fixed-header');
                TweenMax.to('.hero', 1, {
                    scale: 1.2,
                    autoAlpha: 0
                });

            } else {
                $('header').removeClass('fixed-header');
                TweenMax.to('.hero', 1, {
                    scale: 1,
                    autoAlpha: 1
                });
            }

        });
    }



    //tweenmax navbar
    TweenMax.staggerFrom('.nav-link', 1, {
        y: -200
    }, 0.1);

    TweenMax.staggerFrom('.fading', 1, {
        y: 90,
        autoAlpha: 0,
        delay: 2,
    }, 0.7);


    //--------------------------------------------------
    // Icon animation
    //--------------------------------------------------
    iconAnimation();

    function iconAnimation() {
        var icons = $('.icon-round i');
        var dots = $('.dots');
        var dots2 = $('.dots-2');
        var dots3 = $('.dots-3');
        var dots4 = $('.dots-4');
        var boxesTL = new TimelineLite({
            onComplete: function () {
                this.restart()
            }
        });
        boxesTL
            .staggerFrom(icons, 3, {
                rotation: '-=360deg',
                delay: 1,

            }, 2);


        var dotsTL = new TimelineLite({
            onComplete: function () {
                this.restart()
            }

        });
        dotsTL
            .to(dots, 6, {
                x: '-=70',
                y: '+=10',
                scale: '2',
            })
            .to(dots, 2, {
                y: '-=10',
            }, '-=3')
            .to(dots, 1, {
                autoAlpha: 0,
            }, '-=1')

            .to(dots2, 6, {
                x: '+=70',
                scale: '2',
            }, '-=5')
            .to(dots2, 2, {
                y: '+=20',
            }, '-=3')
            .to(dots2, 1, {
                autoAlpha: 0,
            }, '-=2')

            .to(dots3, 6, {
                y: '+=60',
                scale: '2',
            }, '-=4')
            .to(dots3, 2, {
                x: '+=5',
            }, '-=3')
            .to(dots3, 1, {
                autoAlpha: 0,
            }, '-=2')

            .to(dots4, 4, {
                y: '-=50',
                x: '-10',
                scale: '2',
            }, '-=7')
            .to(dots4, 1, {
                autoAlpha: 0,
            }, '-=4')

    }

    //--------------------------------------------------
    // Owl Carousel Setup
    //--------------------------------------------------

    // about slider
    aboutSlider();

    function aboutSlider() {
        var aboutSlide = $('.about-image .owl-carousel');
        aboutSlide.owlCarousel({
            loop: true,
            margin: 30,
            mouseDrag: false,
            autoplay: true,
            center: false,
            dots: false,
            dragEndSpeed: 700,
            smartSpeed: 2000,
            responsiveClass: true,
            autoplayHoverPause: true,
            autoplayTimeout: 3000,
            responsive: {
                0: {
                    items: 1,
                    margin: 0,
                },
                600: {
                    items: 1,
                    margin: 0,
                },
                1000: {
                    items: 1,
                    margin: 0,
                }
            }
        });
    }


    // work slider
    workSlder();

    function workSlder() {
        var owl = $('.work .owl-carousel');

        owl.children().each(function (index) {
            $(this).attr('data-position', index); // NB: .attr() instead of .data()
        });

        owl.owlCarousel({
            loop: false,
            margin: 30,
            mouseDrag: true,
            autoplay: false,
            center: true,
            dots: true,
            nav: false,
            slideBy: 'page',
            dragEndSpeed: 700,
            smartSpeed: 1000,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1,
                    margin: 20,
                },
                600: {
                    items: 2,
                    margin: 30,
                },
                1000: {
                    items: 2,
                    margin: 0,

                }
            }
        });

        $(document).on('click', '.work .owl-item>div', function () {
            owl.trigger('to.owl.carousel', $(this).data('position'));
        });
        owl.trigger('refresh.owl.carousel');
    }



    // team slider
    teamSlider();

    function teamSlider() {
        var teamSlide = $('.team .owl-carousel');
        teamSlide.owlCarousel({
            loop: true,
            margin: 30,
            mouseDrag: true,
            autoplay: false,
            center: false,
            dots: true,
            nav: false,
            dragEndSpeed: 700,
            smartSpeed: 1000,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1,
                    margin: 20,
                },
                600: {
                    items: 2,
                    margin: 30,
                },
                1000: {
                    items: 4,
                    margin: 30,
                }
            }
        });
    }

    // testimonial slider
    testiSlider();

    function testiSlider() {
        var testiSlide = $('.testi-content .owl-carousel');
        testiSlide.owlCarousel({
            loop: true,
            margin: 30,
            mouseDrag: false,
            autoplay: false,
            center: false,
            dots: false,
            dragEndSpeed: 700,
            smartSpeed: 1000,
            responsiveClass: true,
            animateOut: 'fadeOut',
            responsive: {
                0: {
                    items: 1,
                    margin: 20,
                },
                600: {
                    items: 1,
                    margin: 30,
                },
                1000: {
                    items: 1,
                    margin: 0,

                }
            }
        });

        $(".nav-left").on('click', function () {
            testiSlide.trigger('next.owl.carousel');
        });
        $(".nav-right").on('click', function () {
            testiSlide.trigger('prev.owl.carousel');
        });
    }


    // partner slider
    partnerSlider();

    function partnerSlider() {
        var partnerSlide = $('.partner .owl-carousel');
        partnerSlide.owlCarousel({
            loop: true,
            margin: 30,
            mouseDrag: true,
            autoplay: false,
            center: false,
            dots: false,
            dragEndSpeed: 700,
            smartSpeed: 2000,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 2,
                    margin: 20,
                },
                600: {
                    items: 3,
                    margin: 30,
                },
                1000: {
                    items: 5,
                    margin: 0,
                }
            }
        });
    }


    // service 2 slider
    serviceSlide2();

    function serviceSlide2() {
        var service2Slide = $('.service-2 .owl-carousel');
        service2Slide.children().each(function (index) {
            $(this).attr('data-position', index); // NB: .attr() instead of .data()
        });


        service2Slide.owlCarousel({
            loop: false,
            margin: 30,
            startPosition: '1',
            mouseDrag: false,
            autoplay: false,
            dots: false,
            dragEndSpeed: 700,
            smartSpeed: 1000,
            responsiveClass: true,
            responsive: {
                0: {
                    center: true,
                    items: 1,
                    margin: 20,
                },
                600: {
                    items: 3,
                    center: true,
                    margin: 30,
                },
                1000: {
                    items: 3,
                    margin: 0,
                    center: true,

                }
            }
        });


        $(".nav-left-service-2").on('click', function () {
            service2Slide.trigger('prev.owl.carousel');
        });
        $(".nav-right-service-2").on('click', function () {
            service2Slide.trigger('next.owl.carousel');
        });

        $(document).on('click', '.service-2 .owl-item>div', function () {
            service2Slide.trigger('to.owl.carousel', $(this).data('position'));
        });

    }
    //--------------------------------------------------
    // Dropdown
    //--------------------------------------------------
    $('.dropdown-top').on("click", function () {
        if ($(this).parent(".dropdown-faq").hasClass("open")) {
            $(this).parent(".dropdown-faq").removeClass("open");
            $(this).siblings(".dropdown-btm").slideUp(500);
        } else {
            $(".dropdown-faq").removeClass("open");
            $(".dropdown-faq .dropdown-btm").slideUp(500);
            $(this).parent(".dropdown-faq").addClass("open");
            $(this).siblings(".dropdown-btm").slideDown(500);
        }
    })


    //--------------------------------------------------
    // Scrollit setup
    //--------------------------------------------------
    $.scrollIt({
        upKey: 38, // key code to navigate to the next section
        downKey: 40, // key code to navigate to the previous section
        easing: 'linear', // the easing function for animation
        scrollTime: 600, // how long (in ms) the animation takes
        activeClass: 'active', // class given to the active nav element
        onPageChange: null, // function(pageIndex) that is called when page is changed
        topOffset: -100 // offste (in px) for fixed top navigation
    });

})(jQuery);