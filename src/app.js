/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');

var main = new UI.Card({
  title: 'Pebble.js',
  icon: 'images/menu_icon.png',
  subtitle: 'Hello World!',
  body: 'Press any button.'
});

main.show();

Pebble.addEventListener('showConfiguration', function(e) {
  Pebble.openURL('https://rawgit.com/ritola/houm.io-pebble/master/configuration.html');
});

Pebble.addEventListener('webviewclosed',
  function(e) {
    var configuration = JSON.parse(decodeURIComponent(e.response));
    localStorage.setItem('configuration', configuration);
    console.log('Configuration window returned: ', JSON.stringify(configuration));
  }
);