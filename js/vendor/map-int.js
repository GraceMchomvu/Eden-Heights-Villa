//+++++++++++++++++++++++++++++++++++++++++++
//          map Jquery Code start
//+++++++++++++++++++++++++++++++++++++++++++
$(document).ready(function () {
    'use strict';
    // Kiserian / Arusha area (approx.)
    var center = [-3.386925, 36.682993];
    $('#map')
            .gmap3({
                center: center,
                zoom: 16,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            })
            .marker({
                position: center,
                icon: 'http://maps.google.com/mapfiles/marker_green.png'
            });
    console.log("ready!");
});