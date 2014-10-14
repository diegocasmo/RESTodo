define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'collections/TodosCollection',
    'views/home/TodoView'
], function($, _, Backbone, Handlebars, TodosCollection, TodoView) {

    var TodoListView = Backbone.View.extend({

        el: $('#todo-list'),

        initialize: function(options) {
            this.layoutManager = options.layoutManager;
            this.collection = options.collection;
        },

        render: function() {
            var todoView = this.collection.map(function(todo) {
                return (new TodoView({
                    model: todo
                })).render().el;
            });

            this.$el.html(todoView);
            return this;
        }

    });

    return TodoListView;

});
