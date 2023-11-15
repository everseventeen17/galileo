$(document).ready(function(){
    $(".slide-one").owlCarousel({
        items:1,
        loop:true,
        margin:20,
        autoplay:true,
        autoplayTimeout:100000,
        autoplayHoverPause:true
    });
    $(".slide-two").owlCarousel({
        items:3,
        loop:true,
        dots: false,
        nav: true,
        navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        margin:20,
        autoplay:true,
        autoplayTimeout:100000,
        autoplayHoverPause:true
    });
    $(".dropdown-head").on("click", function (e){
        $(this).toggleClass('active')
        $(this).parent('.dropdown').find('.dropdown-slide').slideToggle();
    })
});



window.onscroll = function() {stickyHeader()};
var header = document.getElementById("myHeader");
var sticky = header.offsetTop;
function stickyHeader() {
    if (window.pageYOffset >= sticky) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
}