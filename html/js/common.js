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
        $headerMenu.slideToggle(200);
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
                $ul.slideDown(200);
                $li.addClass('active').siblings().removeClass('active').find('ul').slideUp(200);
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
        if ( $(this).find('.directory__tab').length && $(this).find('.directory__switch').length ) {
            $(this).find('.directory__tab').not(':first').hide();
            $(this).find('.directory__switch').on('click', 'button:not(.active)', function() {
                $(this).addClass('active').siblings().removeClass('active').closest('.directory').find('.directory__tab').slideUp(200).eq($(this).index()).slideDown(200);
            }).find('button').first().addClass('active');
        }
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
            641: {
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
    $('.showmore').each(function() {
        $(this).children().not(':first').hide();
        $(this).after('<div class="showmore-button"><button type="button">подробнее</button></div>');
        $('.showmore-button').on('click', 'button', function() {
            if ( $(this).hasClass('active') ) {
                $(this).removeClass('active').text('подробнее').closest('.showmore-button').prev('.showmore').children().not(':first').slideUp(200);
            } else {
                $(this).addClass('active').text('свернуть').closest('.showmore-button').prev('.showmore').children().not(':first').slideDown(200);
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
    //GALLERY POPUP
    /*******************************************************/

    $('.gallery').magnificPopup({
		delegate: 'a',
		type: 'image',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1]
		}
	});

    /*******************************************************/
    //accordion
    /*******************************************************/
     $('.accordion').each(function() {
        var $this = $(this);
        if ( $this.children('.accordion__box').length ) {
            $this.prepend('<button type="button" class="accordion__button"></button>');
        }
        ($this.hasClass('current') || $this.find('.current').length) ? $this.addClass('active') : $this.children('.accordion__box').hide();
    }).on('click', '.accordion__button', function(e) {
        e.stopPropagation();
        var $this = $(this);
        $this.closest('.accordion').hasClass('active') ? $this.closest('.accordion').removeClass('active').children('.accordion__box').slideUp(200) : $this.closest('.accordion').addClass('active').children('.accordion__box').slideDown(200).end().siblings().removeClass('active').children('.accordion__box').slideUp(200);
    });

    /*******************************************************/
    //CUSTOM input[type=file]
    /*******************************************************/

    $('.form__field-file').on('click', 'button', function() {
        $(this).siblings('input[type=file]').trigger('click');
    }).on('change', 'input[type=file]', function() {
        $(this).siblings('input[type=text]').val($(this).val());
    });

    /*******************************************************/
    //NAV TABS
    /*******************************************************/

    $('.nav').each(function() {
        if ( $(this).find('.nav__tab').length && $(this).find('.nav__buttons').length ) {
            if ( $(this).find('.nav__tab .current').length ) {
                $(this).find('.nav__tab').each(function() {
                    $(this).find('.current').length ? $(this).addClass('active') : $(this).hide();
                });
            } else {
                $(this).find('.nav__tab').first('.nav__tab').addClass('active').siblings('.nav__tab').hide();
            }

            if (  $('.catalog__tab').length ) {
                 $('.catalog__tab').eq($(this).find('.nav__tab.active').index('.nav__tab')).show().siblings('.catalog__tab').hide();
            }
            $(this).find('.nav__buttons').on('click', 'button:not(.active)', function() {
                $(this).addClass('active').siblings().removeClass('active').closest('.nav').find('.nav__tab').slideUp(200).eq($(this).index()).slideDown(200);
                if (  $('.catalog__tab').length ) {
                     $('.catalog__tab').eq($(this).index()).slideDown(200).siblings('.catalog__tab').slideUp(200);
                }
            }).find('button').eq($(this).find('.nav__tab.active').index('.nav__tab')).addClass('active');
        }
    });


    /*******************************************************/
    //VISUAL EXAMPLE OF INTERACTION OF ORDER FORM
    /*******************************************************/
    $('.card__info-table-button').on('click', '.card__info-table-button-order', function(e) {
        e.stopPropagation();
        if ( !$(this).closest('.card__info-table-button').children('.card__info-order').length ) {
            var cardInfoOrderMarkup =
            '<div class="card__info-order">'
                +'<button type="button" class="card__info-order-close">×</button>'
                +'<div class="card__info-order-title">Введите количество товара:</div>'
                +'<form class="card__info-order-form">'
                    +'<input type="text" value="1" class="card__info-order-input">'
                    +'<button type="submit" class="card__info-order-button button">добавить</button>'
                +'</form>'
            +'</div>';
            $(this).closest('.card__info-table').find('.card__info-order').remove();
            $(this).closest('.card__info-table-button').prepend(cardInfoOrderMarkup);

        }

        $(this).prev('.card__info-order').on('click', '.card__info-order-button', function(e) {
            e.preventDefault();

            var cardInfoSuccessMarkup =
            '<div class="card__info-succsess">'
                +'<button type="button" class="card__info-succsess-close">×</button>'
                +'<div class="card__info-succsess-title">Товар добавлен в <a href="#">корзину</a></div>'
                +'<button type="button" class="card__info-succsess-button-close button">закрыть</button>'
            +'</div>';

            $(this).closest('.card__info-table-button').prepend(cardInfoSuccessMarkup);

            $(this).closest('.card__info-table-button').children('.card__info-succsess').on('click', '.card__info-succsess-close, .card__info-succsess-button-close', function() {
                $(this).closest('.card__info-succsess').remove();
            });
            $(this).closest('.card__info-order').remove();
        });
        $(this).prev('.card__info-order').on('click', '.card__info-order-close', function() {
            $(this).closest('.card__info-order').remove();
        });

    });

    $(document).on('click', function(e) {
        if ( !$(e.target).closest('.card__info-succsess, .card__info-order').length ) {
            $('.card__info-succsess, .card__info-order').remove();
        } else {
            return
        }
        e.stopPropagation();
    });

    /*******************************************************/
    //REMOVE PRODUCT FROM BASKET
    /*******************************************************/

    $('.form__table-basket-delete-button').on('click', function() {
        $(this).closest('.form__table-basket-row').remove();
    });

});
