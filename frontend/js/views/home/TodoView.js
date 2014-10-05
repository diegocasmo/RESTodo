define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'text!templates/home/todoView.html'
], function($, _, Backbone, Handlebars, todoView) {

    var TodoView = Backbone.View.extend({

        template: Handlebars.compile(todoView),
        
        tagName: 'li',

        className: 'todo',

        events: {
            'click input[type="checkbox"]': '_changeTodoState',
            'click #delete': '_deleteTodo'
        },

        initialize: function(options) {
            this.model = options.model;
            this.render();
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        _changeTodoState: function(event) {
            event.preventDefault();
            var done = this.model.get('done');
            if(done === 1)
                done = 0;
            else
                done = 1;
            this.model.save({
                'title': this.model.get('title'),
                'done': done
            }, { url: this.model.url + this.model.get('id') });
        },

        _deleteTodo: function(event) {
            event.preventDefault();
            this.model.destroy({ url: this.model.url + this.model.get('id') }, function(data) {
                console.log(data);
            });
        }

    });

    return TodoView;

});
