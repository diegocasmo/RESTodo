define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'collections/TodosCollection',
    'views/home/TodoView'
], function($, _, Backbone, Handlebars, TodosCollection, TodoView) {

    var TodoList = Backbone.View.extend({

        el: $('#todo-list'),

        initialize: function(options) {
            this.collection = options.collection;
            this.listenTo(this.collection, 'change', this.render);
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

    return TodoList;

});
