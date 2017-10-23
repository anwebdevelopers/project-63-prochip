$(function() {

    'use strict';

    /*******************************************************/
    //VARS
    /*******************************************************/
    var $window = $(window),
        $html = $('html'),
        $body = $('body'),
        w = $window.width();


    /*******************************************************/
    //MENU MOBILE
    /*******************************************************/
    var $headerMenu = $('.header__menu'),
        $headerButtonMenu = $('.header__button-menu');
    $headerButtonMenu.click(function() {
        $(this).toggleClass('active');
        $headerMenu.slideToggle(300);
    });

    /*******************************************************/
    //SUBMENU MOBILE
    /*******************************************************/
    $headerMenu.find('.has-submenu a').click(function(e) {
        w = $window.width();
        if ( w <= 768 ) {
            var $this = $(this),
                $ul = $this.next('ul'),
                $li = $this.closest('li');
            if ( !$li.hasClass('active') ) {
                e.preventDefault();
                $ul.slideDown(300);
                $li.addClass('active').siblings().removeClass('active').find('ul').slideUp(300);
            }
        }
    });

    $window.resize(function() {
        $headerButtonMenu.removeClass('active');
        $headerMenu.removeAttr('style').find('ul, li').removeAttr('style').removeClass('active');
    });

    //*****************************************************//
    //DIRECTORY SWITCH
    //*****************************************************//

    $('.directory').each(function() {
        $(this).find('.directory__item').not(':first').hide();
        $(this).find('.directory__switch').on('click', 'button:not(.active)', function() {
            $(this).addClass('active').siblings().removeClass('active').closest('.directory').find('.directory__item').slideUp(200).eq($(this).index()).slideDown(200);
        }).find('button').first().addClass('active');
    });

    /*******************************************************/
    //RECENT SLIDER
    /*******************************************************/
    $('.recent__box').addClass('owl-carousel').owlCarousel({
        loop: true,
        nav: true,
        navText: '',
        autoplay: true,
        autoplayTimeout: 5000,
        smartSpeed: 300,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            361: {
                items: 2
            },
            769: {
                items: 3
            }
        },
        onInitialized: function() {
            $('.recent__box .owl-next').before($('.recent__box .owl-dots'));
        }
    });

    /*******************************************************/
    //ABOUT READ MORE
    /*******************************************************/
    $('.about__content').each(function() {
        $(this).children().not(':first').hide();
        $(this).after('<button class="about__button">подробнее</button>');
        $('.about__button').on('click', function() {
            if ( $(this).hasClass('active') ) {
                $(this).removeClass('active').text('подробнее').prev('.about__content').children().not(':first').slideUp(300);
            } else {
                $(this).addClass('active').text('свернуть').prev('.about__content').children().not(':first').slideDown(300);
            }
        });
    });

    /*******************************************************/
    //POPUP
    /*******************************************************/

    $('.popup-with-move-anim').magnificPopup({
        type: 'inline',
        fixedContentPos: false,
        fixedBgPos: true,
        overflowY: 'auto',
        closeBtnInside: true,
        preloader: false,
        midClick: true,
        removalDelay: 300,
        mainClass: 'my-mfp-slide-bottom'
    });

    /*******************************************************/
    //ACCORDEON
    /*******************************************************/
    var $accordeon = $('.accordeon'),
        $accordeonBox = $('.accordeon__box');
    $accordeon.each(function() {
        var $this = $(this);
        $this.prepend('<button type="button" class="accordeon__button"></button>');
        $this.is(':first-child') ? $this.addClass('active') : $this.find($accordeonBox).hide();
    });
    $accordeon.on('click', '.accordeon__button', function() {
        var $this = $(this);
        $this.closest($accordeon).hasClass('active') ? $this.closest($accordeon).removeClass('active').find($accordeonBox).slideUp(300) : $this.closest($accordeon).addClass('active').find($accordeonBox).slideDown(300).end().siblings().removeClass('active').find($accordeonBox).slideUp(300);
    });

});
