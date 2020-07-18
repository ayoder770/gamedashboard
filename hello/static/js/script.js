jQuery(window).scroll(function () {
  if ( jQuery(this).scrollTop() > 700 && !jQuery('header').hasClass('open') ) {
    jQuery('header').addClass('open');
    jQuery('header').slideDown();
   } else if ( jQuery(this).scrollTop() <= 700 ) {
    jQuery('header').removeClass('open');
    jQuery('header').slideUp();
  }
});

