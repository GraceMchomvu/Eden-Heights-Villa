(function () {
    function hideBlockingOverlays() {
        var classes = ["spinner-wrapper", "search-open", "full-navgtion", "reserve-hotel"];
        for (var c = 0; c < classes.length; c++) {
            var nodes = document.getElementsByClassName(classes[c]);
            for (var i = 0; i < nodes.length; i++) {
                nodes[i].style.display = "none";
            }
        }
    }

    hideBlockingOverlays();
    document.addEventListener("DOMContentLoaded", hideBlockingOverlays);
    window.addEventListener("load", hideBlockingOverlays);

    document.addEventListener("click", function (e) {
        var target = e.target;
        while (target && target !== document && !(target.classList && target.classList.contains("eden-menu-btn"))) {
            target = target.parentNode;
        }
        if (!target || target === document) {
            return;
        }
        e.preventDefault();
        var panel = document.getElementById("edenMainNav");
        if (!panel) {
            return;
        }
        var open = !panel.classList.contains("in");
        if (open) {
            panel.classList.add("in");
        } else {
            panel.classList.remove("in");
        }
        target.classList.toggle("collapsed", !open);
        target.setAttribute("aria-expanded", open ? "true" : "false");
    });

    document.addEventListener("click", function (e) {
        var panel = document.getElementById("edenMainNav");
        var btn = document.querySelector(".eden-menu-btn");
        if (!panel || !panel.classList.contains("in")) {
            return;
        }
        var node = e.target;
        while (node && node !== document) {
            if (node === panel || (node.classList && node.classList.contains("eden-menu-btn"))) {
                if (node.tagName === "A" && panel.contains(node)) {
                    panel.classList.remove("in");
                    if (btn) {
                        btn.classList.add("collapsed");
                        btn.setAttribute("aria-expanded", "false");
                    }
                }
                return;
            }
            node = node.parentNode;
        }
        panel.classList.remove("in");
        if (btn) {
            btn.classList.add("collapsed");
            btn.setAttribute("aria-expanded", "false");
        }
    });
})();

if (typeof jQuery !== "undefined") {
$(document).ready(function () {
    "use strict";
    jQuery(".spinner-wrapper, .search-open, .full-navgtion, .reserve-hotel").hide();
//+++++++++++++++++++++++++++++++++++++++++++
//     bainner slider Jquery Code Start
//+++++++++++++++++++++++++++++++++++++++++++   
    if ($("#owl-demo").length && $.fn.owlCarousel) {
        $("#owl-demo").owlCarousel({
            autoPlay: true,
            navigation: true,
            slideSpeed: 300,
            paginationSpeed: 400,
            singleItem: true,
            items: 1,
            navigationText: ['<i class="fa fa-long-arrow-left"></i>', '<i class="fa fa-long-arrow-right"></i>'],
            pagination: true
        });
        function sizeHeroSlides() {
            var slideWidth = $("#owl-demo").width() || $(window).width();
            $("#owl-demo .owl-item").css({
                width: slideWidth,
                overflow: "hidden"
            });
        }
        sizeHeroSlides();
        $(window).on("resize", sizeHeroSlides);
    }
//+++++++++++++++++++++++++++++++++++++++++++
//    on click hide and show Jquery Code Start
//+++++++++++++++++++++++++++++++++++++++++++
    $('.full-navgtion').hide().removeClass('is-open');
    $('#clapess a').on('click', function (e) {
        e.preventDefault();
        $('.full-navgtion').addClass('is-open').show();
    });
    $('#clapess2 a').on('click', function (e) {
        e.preventDefault();
        $('.full-navgtion').removeClass('is-open').hide();
    });
    $('.search-open').hide();
    $('#btn-closs').on('click', function () {
        $('.search-open').slideToggle('slow');
    });
    $('#clapes-close a').on('click', function () {
        $('.search-open').slideToggle('slow');
    });
    $('.reserve-hotel').hide();
    $('#clapess3 a').on('click', function () {
        $('.reserve-hotel').slideToggle('slow');
    });
//+++++++++++++++++++++++++++++++++++++++++++
//    isotop gallry Jquery Code start
//+++++++++++++++++++++++++++++++++++++++++++
    //+++++++++++++++++++++++++++++++++++++++++++
//    Pri-loding Jquery Code Start
//+++++++++++++++++++++++++++++++++++++++++++
    jQuery(window).on('load',function () {
        jQuery(".spinner-wrapper").hide();

        
        // external js: isotope.pkgd.js

        // init Isotope
        var $grid = $('.grid').isotope({
            itemSelector: '.element-item',
            layoutMode: 'fitRows',
//            fitRows: {
//                gutter: 30
//            }
        });
    });
    var $grid = $('.grid');
// filter functions
    var filterFns = {
        // show if number is greater than 50
        numberGreaterThan50: function () {
            var number = $(this).find('.number').text();
            return parseInt(number, 10) > 50;
        },
        // show if name ends with -ium
        ium: function () {
            var name = $(this).find('.name').text();
            return name.match(/ium$/);
        }
    };
// bind filter button click
    $('.filters-button-group').on('click', 'button', function () {
        var filterValue = $(this).attr('data-filter');
        // use filterFn if matches value
        filterValue = filterFns[ filterValue ] || filterValue;
        $grid.isotope({filter: filterValue});
    });
// change is-checked class on buttons
    $('.button-group').each(function (i, buttonGroup) {
        var $buttonGroup = $(buttonGroup);
        $buttonGroup.on('click', 'button', function () {
            $buttonGroup.find('.is-checked').removeClass('is-checked');
            $(this).addClass('is-checked');
        });
    });


    jQuery(function ($) {
        $("#date-from").datepicker({
            currentText: "Today:" + $.datepicker.formatDate('MM dd', new Date())
//            altFormat: "yy-mm-dd"
        }).datepicker("setDate", new Date());

        $("#date-to").datepicker({
            currentText: "Now"
        }).datepicker("setDate", new Date());

    });
});
}