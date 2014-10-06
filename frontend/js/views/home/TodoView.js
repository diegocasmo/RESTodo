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

        initialize: function(options) {
            this.model = options.model;
            this.listenTo(this.model, "remove", this._removeModel);
            this.listenTo(this.model, "change", this._changeModel);
            this.render();
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        _removeModel: function() {
             console.log('triggered _removeModel');

            var that = this;
            // needs to handle success and errors better...
            that.model.destroy(
            {
                url: that.model.url + that.model.get('id'),
                success: function(model, response, options) {
                    that._setFlashMessage(response);
                },
                error: function() {
                    that._setFlashMessage('There has been an error, please try again later.');
                }
            });            
        },

        _changeModel: function() {
            console.log('triggered _changeModel');
            
            var that = this;
            // needs to handle success and errors better...
            that.model.save({
                'title': that.model.get('title'),
                'done': that.model.get('done')
            }, 
            { 
                url: that.model.url + that.model.get('id'),
                success: function(model, response, options) {
                    that._setFlashMessage(response);
                }, 
                error: function() {
                    that._setFlashMessage('There has been an error, please try again later.');
                }
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

    return TodoView;

});
