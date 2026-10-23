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

    var pages = [
        { title: "Home", url: "index.html", blurb: "Private Airbnb home in Kiserian, Mjohoroni, Arusha.", keys: "home villa airbnb arusha kiserian mjohoroni stay welcome" },
        { title: "The Villa", url: "about-us.html", blurb: "Sitting room, bedroom, kitchen, hot shower, Wi-Fi, and breakfast.", keys: "villa house rooms kitchen bedroom sitting wifi breakfast fence" },
        { title: "Tourism", url: "tourism.html", blurb: "Northern Circuit parks, wildlife, mountains, lakes, and culture.", keys: "tourism safari serengeti ngorongoro kilimanjaro manyara tarangire parks trips" },
        { title: "Services", url: "our-services.html", blurb: "Amenities, extras, groceries, and food delivery.", keys: "services wifi kitchen groceries food delivery breakfast amenities" },
        { title: "Packages", url: "our-packages.html", blurb: "Daily, weekly, monthly, honeymoon, and bridal stays.", keys: "packages daily weekly monthly discount honeymoon bridal sleepover price 120000" },
        { title: "Gallery", url: "photo-section.html", blurb: "Photos of the villa, rooms, and grounds.", keys: "gallery photos pictures images rooms" },
        { title: "Contact", url: "contact-us.html", blurb: "Phone, email, WhatsApp, and directions.", keys: "contact phone email whatsapp elisheba goodluck echelesi 074506244 location" },
        { title: "Book Stay", url: "booking-room-selector.html", blurb: "Start a booking for your private stay.", keys: "book booking stay reserve room dates" },
        { title: "Booking details", url: "booking-details.html", blurb: "Complete your villa booking details.", keys: "booking checkout details form" },
        { title: "Transport", url: "transport.html", blurb: "Airport transfers and local transport.", keys: "transport airport transfer driver car vehicle" }
    ];

    function normalize(value) {
        return (value || "").toLowerCase().replace(/\s+/g, " ").trim();
    }

    function searchPages(query) {
        var q = normalize(query);
        if (!q) {
            return [];
        }
        var words = q.split(" ");
        return pages.filter(function (page) {
            var hay = normalize(page.title + " " + page.blurb + " " + page.keys);
            for (var i = 0; i < words.length; i++) {
                if (hay.indexOf(words[i]) === -1) {
                    return false;
                }
            }
            return true;
        });
    }

    function resultItem(page) {
        return '<a href="' + page.url + '"><strong>' + page.title + '</strong><span>' + page.blurb + "</span></a>";
    }

    function bindSearch(root) {
        var form = root.querySelector(".eden-search-form");
        var input = root.querySelector(".eden-search-input");
        var results = root.querySelector(".eden-search-results");
        var toggle = root.querySelector(".eden-search-toggle");
        if (!form || !input || !results) {
            return;
        }

        function hideResults() {
            results.hidden = true;
            results.innerHTML = "";
        }

        function showResults(query) {
            var hits = searchPages(query);
            if (!query) {
                hideResults();
                return;
            }
            if (!hits.length) {
                results.innerHTML = '<div class="eden-search-empty">No matching pages. Try villa, tourism, booking, or contact.</div>';
            } else {
                results.innerHTML = hits.map(resultItem).join("");
            }
            results.hidden = false;
        }

        input.addEventListener("input", function () {
            showResults(input.value);
        });

        input.addEventListener("focus", function () {
            if (input.value) {
                showResults(input.value);
            }
        });

        form.addEventListener("submit", function (e) {
            if (!input.value.trim()) {
                e.preventDefault();
                input.focus();
            }
        });

        if (toggle) {
            toggle.addEventListener("click", function (e) {
                e.preventDefault();
                var open = !root.classList.contains("is-open");
                root.classList.toggle("is-open", open);
                toggle.setAttribute("aria-expanded", open ? "true" : "false");
                if (open) {
                    input.focus();
                } else {
                    hideResults();
                }
            });
        }
    }

    function initSiteSearch() {
        var widgets = document.querySelectorAll(".eden-search");
        for (var i = 0; i < widgets.length; i++) {
            bindSearch(widgets[i]);
        }

        document.addEventListener("click", function (e) {
            var node = e.target;
            var inside = false;
            while (node && node !== document) {
                if (node.classList && node.classList.contains("eden-search")) {
                    inside = true;
                    break;
                }
                node = node.parentNode;
            }
            if (inside) {
                return;
            }
            var openWidgets = document.querySelectorAll(".eden-search.is-open");
            for (var w = 0; w < openWidgets.length; w++) {
                openWidgets[w].classList.remove("is-open");
                var btn = openWidgets[w].querySelector(".eden-search-toggle");
                if (btn) {
                    btn.setAttribute("aria-expanded", "false");
                }
            }
            var boxes = document.querySelectorAll(".eden-search-results");
            for (var r = 0; r < boxes.length; r++) {
                boxes[r].hidden = true;
            }
        });

        var pageResults = document.getElementById("edenSearchPageResults");
        var pageQuery = document.getElementById("edenSearchPageQuery");
        if (pageResults) {
            var q = "";
            if (window.URLSearchParams) {
                q = new URLSearchParams(window.location.search).get("q") || "";
            } else if (window.location.search) {
                var parts = window.location.search.replace(/^\?/, "").split("&");
                for (var p = 0; p < parts.length; p++) {
                    var pair = parts[p].split("=");
                    if (decodeURIComponent(pair[0]) === "q") {
                        q = decodeURIComponent((pair[1] || "").replace(/\+/g, " "));
                    }
                }
            }
            if (pageQuery) {
                pageQuery.textContent = q ? 'Results for “' + q + '”' : "Search Eden Heights Villa";
            }
            var hits = searchPages(q);
            var field = document.getElementById("edenSiteSearch");
            if (field && q) {
                field.value = q;
            }
            if (!q) {
                pageResults.innerHTML = "<p>Type a word such as villa, tourism, packages, or booking.</p>";
            } else if (!hits.length) {
                pageResults.innerHTML = "<p>No matching pages. Try villa, tourism, booking, or contact.</p>";
            } else {
                pageResults.innerHTML = hits.map(function (page) {
                    return '<a class="eden-search-hit" href="' + page.url + '"><strong>' + page.title + "</strong><span> " + page.blurb + "</span></a>";
                }).join("");
            }
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initSiteSearch);
    } else {
        initSiteSearch();
    }

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