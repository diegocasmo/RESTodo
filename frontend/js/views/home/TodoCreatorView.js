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

            var title = $('input[name="title"]').val();

            var todo = new TodoModel({
                title: $.trim(title),
                done: $.trim(0)
            });

            var validator = todo._validate();
            if (_.isEmpty(validator)) {
                todo.save();
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
