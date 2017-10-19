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
        $headerMenu.slideToggle(500);
    });

    /*******************************************************/
    //SUBMENU MOBILE
    /*******************************************************/
    $headerMenu.find('.has-submenu a').click(function(e) {
        w = $window.width();
        if (w <= 768) {
            var $this = $(this),
                $ul = $this.next('ul'),
                $li = $this.closest('li');
            if (!$li.hasClass('active')) {
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
    //Product Tabs
    //*****************************************************//

    $('.directory').each(function() {
        $(this).find('.directory__item').not(':first-child').hide();
        $(this).find('.directory__switch').on('click', 'button:not(.active)', function() {
            $(this).addClass('active').siblings().removeClass('active').closest('.directory').find('.directory__item').slideUp(200).eq($(this).index()).slideDown(200);
        }).find('button').first().addClass('active');
    });
});
