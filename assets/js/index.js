$(document).ready(function(){
    $(".owl-carousel").owlCarousel({
        items:1,
        loop:true,
        margin:20,
        autoplay:true,
        autoplayTimeout:100000,
        autoplayHoverPause:true
    });
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