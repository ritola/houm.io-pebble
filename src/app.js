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
      sceneMenu.on('select', function(e) {
        var id = scenes[e.itemIndex]._id; // TODO: Check the array size
        console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
        console.log('The item is titled "' + e.item.title + '"');
        console.log('And it most probably has an id "' + id + '"');
        selectScene(id);
      });
    },
    function(error, status, request) {
      new UI.Card({
        title: 'houm.io',
        body: 'Getting site failed: ' + error
      }).show();
    }
  );
}

function sceneSort(a, b) {
  return a.name.localeCompare(b.name);
}

function scenesToSection(scenes) {
  return { title: "Select scene", items: scenes.map(function (x) {
    return { title: x.name };
  })};
}

function selectScene(id) {
  ajax({
    url: 'https://houmi.herokuapp.com/api/site/' + siteKey + '/scene/' + id + '/apply', 
    method: 'put', 
    type: 'json'
  });  
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
