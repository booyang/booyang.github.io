$(document).ready( function() {
  if( slow_browser || window.location.href.indexOf('slow') != -1 ) return _site().slow();
  _site().setup();
});