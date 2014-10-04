define([
  'jquery', 
  'underscore', 
  'backbone',
  'router',
  'handlebars',
], function($, _, Backbone, Router){
  var initialize = function(){
    Router.initialize();
  };

  return { 
    initialize: initialize
  };
});
