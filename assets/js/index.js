import {PopupWithForm} from "./src/PopupWithForm.js";
import {FormValidator} from "./src/FormValidator.js";

$(document).ready(function(){
    $(".slide-one").owlCarousel({
        items:1,
        loop:true,
        margin:20,
        dots: false,
        autoplay:true,
        autoplayTimeout:100000,
        autoplayHoverPause:true
    });
    $(".slide-two").owlCarousel({
        items:3,
        loop:true,
        dots: true,
        nav: true,
        navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        margin:20,
        autoplay:true,
        autoplayTimeout:100000,
        autoplayHoverPause:true,
        responsive : {
            // breakpoint from 0 up
            0:{items:1,nav:true},
            769:{items:3},
        }
    });
    $(".slide-three").owlCarousel({
        items:1,
        loop:true,
        dots: true,
        nav: false,
        navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        margin:20,
        autoplay:true,
        autoplayTimeout:100000,
        autoplayHoverPause:true
    });
    $(".dropdown-head").on("click", function (e){
        $(this).toggleClass('active')
        $(this).find('svg').toggleClass('active')
        $(this).parent('.dropdown').find('.dropdown-slide').slideToggle();
    })

        $('.hamburger-wrapper').on('click', function() {
            $('.hamburger-menu').toggleClass('animate');
            $('.mobile-menu-overlay').toggleClass('visible');
            $('body').toggleClass('overflow-hidden');
        })
        $('.mobile-menu-overlay > ul > li > a').on('click', function () {
            $('.hamburger-menu').removeClass('animate');
            $('.mobile-menu-overlay').removeClass('visible');
            $('body').toggleClass('overflow-hidden');
        })
    $(window).on('load', function() {
        $('.preloader').fadeOut().end().delay(1000).fadeOut('slow');
        $('body').toggleClass('overflow-hidden');
    });
    function callBackFormSubmit(data) {
        console.log(2)
    }

    new PopupWithForm('.popup_type_book-a-ticket', callBackFormSubmit, '.js-bookTicket')

});



// window.onscroll = function() {stickyHeader()};
// var header = document.getElementById("myHeader");
// var sticky = header.offsetTop;

// function stickyHeader() {
//     if (window.pageYOffset >= sticky) {
//         header.classList.add("sticky");
//     } else {
//         header.classList.remove("sticky");
//     }
// }