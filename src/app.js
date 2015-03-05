var UI = require('ui');
var ajax = require('ajax');
var settings = require('settings');
var siteKey = settings.option('siteKey');

new UI.Card({
  title: 'houm.io',
  body: 'Loading...'
}).show();

if (!siteKey) {
  new UI.Card({
    title: 'houm.io',
    body: 'Not configured'
  }).show();
} else {
  console.log('Configured as ' + siteKey);
  ajax(
    { url: 'https://houmi.herokuapp.com/api/site/' + siteKey, type: 'json'},
    function(data, status, request) {
      var scenes = data.scenes.sort(sceneSort);
      var sceneMenu = new UI.Menu({
        sections: [scenesToSection(scenes)]
      });
      sceneMenu.show();
    },
    function(error, status, request) {
      console.log('Getting site failed: ' + error);
    }
  );
}

function sceneSort(a, b) {
  return a.name.localeCompare(b.name);
}

function scenesToSection(scenes) {
  return {title: "Select scene", items: scenes.map(function (x) {
    return {title: x.name};
  })};
}

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
