    define([
    'underscore',
    'backbone'
], function(_, Backbone) {

    var TodoModel = Backbone.Model.extend({

        url: 'http://localhost/RESTodo/backend/api/todos/',

        defaults: {
            title: '',
            done: 0
        },
        
        _customErrors: {
            title: {
                empty: 'Please enter a Title.',
                tooLong: 'Title is too long.'
            },
            done: {
                empty: 'Please enter a valid value for Done.'
            }
        },

        _validate: function() {
            var title = $.trim(this.attributes.title),
                done = $.trim(this.attributes.done);

            var errors = [];

            if (title === '' || title === this._customErrors.title.empty) {
                errors.push({
                    key: 'title',
                    value: this._customErrors.title.empty
                });
            } else if( title.length > 255 || title === this._customErrors.title.tooLong) {
                 errors.push({
                    key: 'title',
                    value: this._customErrors.title.tooLong
                });               
            }

            if (done === '' || done === this._customErrors.done.empty) {
                errors.push({
                    key: 'done',
                    value: this._customErrors.done.empty
                });
            }

            return errors;
        }

    });

    return TodoModel;

});
