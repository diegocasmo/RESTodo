define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'collections/TodosCollection',
    'views/home/TodoListView',
    'views/home/TodoCreatorView',
    'helpers/Message'    
], function($, _, Backbone, Handlebars, TodosCollection, TodoListView, TodoCreatorView, Message) {

    var HomeLayoutManager = Backbone.View.extend({

        el: $("#home"),

        initialize: function(options) {
            this.router = options.router;
            this.collection = new TodosCollection();
            this.todoCreatorView = new TodoCreatorView({
                    router: this.router,
                    layoutManager: this
                });
            this.message = Message.getInstance();
            this._configureRender();
        },

        render: function(todoListView) {
            todoListView.setElement(this.$('#todo-list')).render();
            this.todoCreatorView.setElement(this.$('#todo-creator')).render();
        },

        _configureRender: function() {
            var that = this;
            that.collection.fetch({
                success: function(collection, response, options) {
                    if(typeof response === 'object') {
                        that.todoListView = new TodoListView({
                            collection: that.collection,
                            layoutManager: that
                        });
                        that.render(that.todoListView);
                    } else {
                        that.message._setStaticMessage(response);
                    }
                },

                error: function(collection, response, options) {
                    that.showContent();
                    that.message._setStaticMessage('There has been an error, please try again later.');
                } 
            });
        },
    });

    return HomeLayoutManager;

});