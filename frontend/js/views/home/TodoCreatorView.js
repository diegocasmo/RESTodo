define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'text!templates/home/todoCreatorView.html',
    'models/TodoModel',
    'helpers/Message'
], function($, _, Backbone, Handlebars, todoCreatorView, TodoModel, Message) {

    var TodoCreatorView = Backbone.View.extend({

        template: Handlebars.compile(todoCreatorView),

        events: {
            'submit': '_createTodo',
            'focus input[type="text"]': '_deleteTitleErrorMessages',
        },

        initialize: function(options) {
            this.router = options.router;
            this.layoutManager = options.layoutManager;
            this.model = new TodoModel();
            this.message = Message.getInstance();
        },

        render: function() {
            this.$el.html(this.template());
            return this;
        },

        _createTodo: function(event) {
            event.preventDefault();
            
            var that = this,        
                title = $('input[name="title"]').val();

            var todo = new TodoModel({
                title: $.trim(title),
                done: $.trim(0)
            });

            var validator = todo._validate();
            if (_.isEmpty(validator)) {
                todo.save(null, {
                    success: function(model, response, options) {
                        that.message._setFlashMessage(response);
                        that.undelegateEvents();
                        that.layoutManager._configureRender();
                    },
                    error: function() {
                        that.message._setFlashMessage('There has been an error, please try again later.');
                    }
                });
            } else {
                validator.forEach(function(objArr) {
                    $('[name="' + objArr.key + '"]').val(objArr.value);
                });
            }
        },

        _deleteTitleErrorMessages: function(event) {
            event.preventDefault();
            _.each(this.model._customErrors.title, function(customError) {
                $currentTarget = $(event.currentTarget);
                if($currentTarget.val() === customError)
                    $currentTarget.val('');
            });          
        }

    });

    return TodoCreatorView;

});
