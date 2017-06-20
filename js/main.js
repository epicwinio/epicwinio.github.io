console.log('EpicWin.io');

$( document ).ready(function() {
  $('#menu a').click(function (e) {
    e.preventDefault();
    $(this).tab('show');
  });
});
