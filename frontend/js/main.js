require.config({
  paths: {
    jquery: 'libs/jquery/jquery-min',
    underscore: 'libs/underscore/underscore-min',
    backbone: 'libs/backbone/backbone-min',
    templates: '../templates',
    handlebars: 'libs/handlebars/handlebars'
  }

});

require([
  'app',

], function(App){
  App.initialize();
});
