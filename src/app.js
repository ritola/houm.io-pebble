var UI = require('ui');
var settings = require('settings');
var siteKey = settings.option('siteKey');

var main = new UI.Card({
  title: 'houm.io'
});

if (!siteKey) {
  main.body('Not configured');
} else {
  main.body(siteKey);
}

main.show();

settings.config(
  { url: 'https://rawgit.com/ritola/houm.io-pebble/master/configuration.html' },
  function(e) {
    console.log('open configurable');
  },
  function(e) {
    console.log('closed configurable');
    console.log(JSON.stringify(e.options));
    if (e.failed) {
      console.log(e.response);
    }
  }  
);
