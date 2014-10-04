define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'collections/TodosCollection',
    'views/home/TodoList',
    'views/home/TodoCreatorView'
], function($, _, Backbone, Handlebars, TodosCollection, TodoList, TodoCreatorView) {

    var HomeLayoutManager = Backbone.View.extend({

        el: $("#home"),

        initialize: function(options) {
            this.router = options.router;
            this.collection = new TodosCollection();
            this.todoCreatorView = new TodoCreatorView(this.router);
            var that = this;
            that.collection.fetch({
                success: function() {
                    that.todoList = new TodoList({
                        collection: that.collection
                    });
                    that.render(that.todoList);
                }
            });
        },

        render: function(todolist) {
            todolist.setElement(this.$('#todo-list')).render();
            this.todoCreatorView.setElement(this.$('#todo-creator')).render();
        },

    });

    return HomeLayoutManager;

});