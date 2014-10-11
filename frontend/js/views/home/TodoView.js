define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'text!templates/home/todoView.html',
    'helpers/Message'
], function($, _, Backbone, Handlebars, todoView, Message) {

    var TodoView = Backbone.View.extend({

        template: Handlebars.compile(todoView),

        initialize: function(options) {
            this.model = options.model;
            this.listenTo(this.model, "remove", this._removeModel);
            this.listenTo(this.model, "change", this._changeModel);
            this.message = Message.getInstance();
            this.render();
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        _removeModel: function() {
            var that = this;
            
            that.model.destroy(
            {
                url: that.model.url + that.model.get('id'),
                success: function(model, response, options) {
                    that.message._setFlashMessage(response);
                },
                error: function() {
                    that.message._setFlashMessage('There has been an error, please try again later.');
                }
            });            
        },

        _changeModel: function() {
            var that = this;

            that.model.save({
                'title': that.model.get('title'),
                'done': that.model.get('done')
            }, 
            { 
                url: that.model.url + that.model.get('id'),
                success: function(model, response, options) {
                    that.message._setFlashMessage(response);
                }, 
                error: function(model, response, options) {
                    console.log(model);
                    console.log(response);
                    console.log(options);

                    that.message._setFlashMessage('There has been an error, please try again later.');
                }
            });
        }
    });

    return TodoView;

});
