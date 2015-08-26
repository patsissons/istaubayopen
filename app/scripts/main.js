/*global $ moment*/

'use strict';

function updateStatus(data) {
  if (data.hasOwnProperty('status') && data.status !== '') {
    $('.status-text').html(data.status);
  }
  else {
    var now = moment().tz(data.timezone);
    var day = now.format('dddd');
    var hours = data.hours[day];
    var cur = parseInt(now.format('Hmm'));

    if (cur >= hours.open && cur < hours.close) {
      $('.status-text').html('Open');
    }
    else {
      $('.status-text').html('Closed');
    }
  }
}

function updateLocation(data) {
  var address = data.location.address + '<br/>' + data.location.city + ', ' + data.location.province + '<br/>' + data.location.postalcode + ' ' + data.location.country;
  var html = $(document.createElement('a')).html(address).attr('href', 'http://maps.google.com/?q=' + data.location.address + ' ' + data.location.city + ' ' + data.location.province + ' ' + data.location.postalcode + ' ' + data.location.country);
  $('.address-text').html(html);
}

function updateHours(data) {
  function formatHours(range) {
    function formatTime(time) {
      function insertColon(text) {
        return text.substr(0, text.length - 2) + ':' + text.substr(text.length - 2);
      }
      return insertColon((time < 1300 ? time : time - 1200).toString()) + ' ' + (time < 1200 ? 'am' : 'pm');
    }

    if (range == null) {
      return 'Closed';
    }

    return formatTime(range.open) + ' - ' + formatTime(range.close);
  }

  var now = moment().tz(data.timezone);
  var html = $(document.createElement('a')).attr('href', data.hoursLink);

  $.each(data.hours, function (key, val) {
    var hours = $(document.createElement('span')).html(key + ' ' + formatHours(val));
    if (now.format('dddd') === key) {
      hours = hours.addClass('today');
    }
    html.append(hours).append('<br/>');
  });

  $('.hours-text').append(html);
}

function updateContact(data) {
  $('.contact-text')
    .append($(document.createElement('a')).attr('href', 'tel:' + data.contact.phone).html(data.contact.phone))
    .append('<br/>')
    .append($(document.createElement('a')).attr('class', 'twitter-mention-button').attr('href', 'https://twitter.com/intent/tweet?screen_name=' + data.contact.twitter).attr('data-dnt', 'true').html('@' + data.contact.twitter));
}

$(document).ready(function() {
  if (document.location.hostname !== 'istaubayopen.ca') {
    $('body').prepend('<div class="dev"><div class="container"><p>This is a development site. Please use <a href="http://istaubayopen.ca/">http://istaubayopen.ca/</a> instead.</p></div></div>');
  }
});

$.getJSON('config.json', function(data) {
  updateStatus(data);
  updateLocation(data);
  updateHours(data);
  updateContact(data);

  // we put this here so that we render twitter buttons and widgets after we perform our async config data load
  /*eslint-disable*/
  !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
  /*eslint-enable*/
});
