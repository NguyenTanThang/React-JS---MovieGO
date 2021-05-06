export const navbarScroll = () => {
    var myNav = document.getElementById('navbar');
    window.onscroll = function () { 
        "use strict";
        if (document.body.scrollTop >= 10 || document.documentElement.scrollTop >= 10 ) {
            myNav.classList.add("nav-colored");
        } 
        else {
            myNav.classList.remove("nav-colored");
        }
    };
}