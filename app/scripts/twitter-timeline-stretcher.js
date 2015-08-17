'use strict';

$(window).on('load', function() {
  var div = $('.twitter-timeline').first().contents().find('.twitter-timeline');
  div.css('max-width', '100%');
  div.find('.stream').css('width', (div.width() + 17) + 'px');
});
