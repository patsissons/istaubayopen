window.onload = function() {
  var div = document.getElementsByClassName('twitter-timeline')[0].contentDocument.getElementsByClassName('twitter-timeline')[0];
  var stream = div.getElementsByClassName('stream')[0];
  div.style.maxWidth = "100%";
  div.style.marginBottom = "0";
  // 17px puts the scrollbar off screen
  stream.style.width = (div.offsetWidth + 17) + "px";
}
