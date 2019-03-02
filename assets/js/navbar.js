/* ----------------------------------------------------------------------------------------------------
   Globel varieables
   ---------------------------------------------------------------------------------------------------- */

var deviceType = null;
// if mobile site is displayed, breakpoint: 768
if ($(window).width() < 768) deviceType = 'mobile';
// if desktop site is displayed
else deviceType = 'desktop';

/* ----------------------------------------------------------------------------------------------------
   Let text of .nav-item stick to the edge of its parent element (.container), 
   when navbar is not sticky
   ---------------------------------------------------------------------------------------------------- */

$(document).ready(function () {
    var navbarObserver = new MutationObserver(function () {
        // if one of the .nav-link is active, meaning that navbar is sticking to top of the page
        if ($('a.nav-link.active')[0]) {
            if (deviceType === 'desktop') {
                $('#navbar').css({
                    'margin-left': 'var(--navbar-strech)',
                    // 8 dp shadow in material design
                    'box-shadow': '0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12)'
                });
            } else {
                $('#navbar').css({
                    // 4 dp shadow in material design
                    'box-shadow': '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)'
                });
            }
        } else {
            $('#navbar').css({ 'box-shadow': '' });
            if (deviceType === 'desktop') $('#navbar').css({ 'margin-left': '' });
        }
    });
    document.querySelectorAll('li.nav-item:first-child>a.nav-link').forEach(function (element) {
        navbarObserver.observe(element, {
            attributes: true,
            attributeFilter: ['class']
        });
    });
});


/* ----------------------------------------------------------------------------------------------------
   Offset jump links (html anchors) for the sticky navbar and amination, 
   pointing them to the correct position
   ---------------------------------------------------------------------------------------------------- */

$(document).ready(function () {
    $('#navbar a').on('click', function () {
        event.preventDefault();
        let target = (this.href).substring((this.href).lastIndexOf('#'));
        let scrollY = $(target).offset().top - $('#navbar').innerHeight() - parseInt($(':root').css('--navbar-margin'))

        if ($(target).css('opacity') < 1) {
            let currentTranslateY = $(target).css('transform').match(/matrix\(.*, (\d*\.?\d+)\)/)[1];
            window.scroll({
                top: Math.ceil(scrollY) - Math.floor(currentTranslateY),
                behavior: 'smooth'
            });
        }
        // If animation of that element has been completed
        else {
            window.scroll({
                top: Math.ceil(scrollY),
                behavior: 'smooth'
            });
        }
    });
});


/* ----------------------------------------------------------------------------------------------------
   Add scrollapy to page
   ---------------------------------------------------------------------------------------------------- */

addEventListener('scroll', function () {
    $('a.nav-link.active').removeClass('active');

    // Horizontal center of the page
    let pageCenter = Math.ceil(window.innerWidth / 2);
    if (document.elementFromPoint(pageCenter, 0).id !== 'navbar') return;

    let viewport = $('#navbar').innerHeight() + 1;
    let element = document.elementFromPoint(pageCenter, viewport).closest(".row.section");
    if (element === null) {
        element = document.elementFromPoint(pageCenter, viewport + parseInt($(':root').css('--section-margin'))).closest(".row.section");
    }
    $('a.nav-link[href="#' + element.id + '"]').addClass('active');
});