$(document).ready(function(){
  /* update the checkout URL if clicked on a protocol */
  $('#checkout_box #checkout_protocols a').each(function(i) {
    $(this).bind('click', function(event) {
      $('#checkout_url').val(checkout_commands[$(this).attr('id')]);
      $('#checkout_box #checkout_protocols a').removeClass("selected");
      $(this).addClass("selected")

      var access = $('#checkout_access');
      if (access.size() > 0) {
        var value = window.checkout_access[$(this).attr('id')];
        access.html(value);
      }

      event.preventDefault();
    });
  });
  /* select the text field contents if activated */
  $('#checkout_url').bind('click', function(event) {
    $(this).select();
  });

  if (typeof('ZeroClipboard') != 'undefined') {
    $('#clipboard_container').show();

    ZeroClipboard.config({forceHandCursor: true});
    var clipboard = new ZeroClipboard($('#clipboard_button,#clipboard_container'));

    clipboard.on("copy", function (event) {
        event.clipboardData.setData(
            "text/plain",
            $('#checkout_url').val()
        );
    });

    clipboard.on('aftercopy', function(client, args) {

      var previousHTML = $("#clipboard_button").html();

      $("#clipboard_button").animate(
        {opacity: 0},
        100,
        function() {
            $(this).html("<b>✔</b>");
        }).animate(
            {opacity:1},
            100
        ).delay(
            500
        ).animate(
            {opacity: 0},
            100,
            function() {
                $(this).html(previousHTML);
            }
        ).animate(
            {opacity:1},
            100
        );
    });
  }
});
