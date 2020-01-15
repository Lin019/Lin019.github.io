$(document).ready(function() {

    $('.navbar-toggler').on('click', function() {
        if ($(window).width() < 900)
            toggleNav();
    })

    $('a').on('click', function() {
        if ($(window).width() < 900)
            hideNav();
    })

    var navbar_size = '300';
    var none = '0px';

    function toggleNav() {
        if ($('#sidebar').hasClass('toggled'))
            hideNav();
        else
            showNav();
    }

    function showNav() {
        $('#sidebar').css('width', navbar_size);
        $('#sidebar').children().css('margin-left', '+=' + navbar_size);
        $('#info').css('margin-left', '+=' + navbar_size);
        $('#info').css('margin-right', '-=' + navbar_size);
        $('.navbar-toggler').removeClass('collapsed');
        $('#sidebar').addClass('toggled');
    }

    function hideNav() {
        $('#sidebar').css('width', none);
        $('#sidebar').children().css('margin-left', '-=' + navbar_size);
        $('#info').css('margin-left', none);
        $('#info').css('margin-right', none);
        $('.navbar-toggler').addClass('collapsed');
        $('#sidebar').removeClass('toggled');
    }
});
