define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'text!templates/home/todoCreatorView.html',
    'models/TodoModel'
], function($, _, Backbone, Handlebars, todoCreatorView, TodoModel) {

    var TodoCreatorView = Backbone.View.extend({

        template: Handlebars.compile(todoCreatorView),

        events: {
            'submit': '_createTodo',
            'focus input[type="text"]': '_deleteTitleErrorMessages',
        },

        initialize: function(options) {
            this.router = options;
            this.model = new TodoModel();
        },

        render: function() {
            this.$el.html(this.template());
            return this;
        },

        _createTodo: function(event) {
            event.preventDefault();
            console.log('triggered _createTodo');
            
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
                        that._setFlashMessage(response);
                    },
                    error: function() {
                        that._setFlashMessage('There has been an error, please try again later.');
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
        },

        _setFlashMessage: function(msg) {
            $flashMessage = $('#flash-message');
            $flashMessage.text(msg);
            $flashMessage.animate({
                opacity: 1
            });
            setTimeout(function () {
                $flashMessage.animate({
                    opacity: 0
                },function() {
                    $('#serverResponse').text('');
                });
            }, 1500);
        }

    });

    return TodoCreatorView;

});
