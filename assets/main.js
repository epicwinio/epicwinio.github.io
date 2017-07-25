console.log('EpicWin.io');

$( document ).ready(function() {
  // fade in .navbar
  $(function () {
    $(window).scroll(function () {
      // set distance user needs to scroll before we start fadeIn
      if ($(this).scrollTop() > 350) { // 350 - 70 = 280
        $('body').addClass('show-navbar');
      } else {
        $('body').removeClass('show-navbar');
      }
    });
  });
});
