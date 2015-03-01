var UI = require('ui');
var configuration = localStorage.getItem('configuration');

var main = new UI.Card({
  title: 'houm.io'
});

if (!configuration || !configuration.siteKey) {
  main.body('Not configured');
} else {
  main.body(JSON.stringify(configuration));
}

main.show();

Pebble.addEventListener('showConfiguration', function(e) {
  Pebble.openURL('https://rawgit.com/ritola/houm.io-pebble/master/configuration.html');
});

Pebble.addEventListener('webviewclosed',
  function(e) {
    configuration = JSON.parse(decodeURIComponent(e.response));
    localStorage.setItem('configuration', configuration);
    console.log('Configuration window returned: ', JSON.stringify(configuration));
  }
);