define([
  'jquery',
  'underscore',
  'backbone',
  'models/TodoModel'
], function($, _, Backbone, TodoModel){
  var Tweets = Backbone.Collection.extend({

  	model: TodoModel,

    url: 'http://localhost/RESTodo/backend/api/todos/',
  
  });

  return Tweets;
});
