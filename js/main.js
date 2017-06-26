console.log('EpicWin.io');

$( document ).ready(function() {
  $('#menu a').click(function (e) {
    e.preventDefault();
    $(this).tab('show');
  });
  
  // fade in .navbar
  $(function () {
    $(window).scroll(function () {
      // set distance user needs to scroll before we start fadeIn
      if ($(this).scrollTop() > 350) {
        $('body').addClass('show-navbar');
      } else {
        $('body').removeClass('show-navbar');
      }
    });
  });
});
