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

        events: {
            'click input[type="checkbox"]': '_changeTodoState',
            'click .delete': '_deleteTodo'
        },

        initialize: function(options) {
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
        },


        _changeTodoState: function(event) {
            var id = parseInt(event.currentTarget.id),
                model = this.collection.get(id),
                done = model.get('done');
            
            if(done === 1)
                done = 0;
            else
                done = 1;

            model.set({
                done: done
            });

            this.collection.set(model, {remove: false});
        },

        _deleteTodo: function(event) {
            event.preventDefault();
            var id = parseInt(event.currentTarget.id),
                model = this.collection.get(id);

            this.collection.remove(model);
        }

    });

    return TodoList;

});
