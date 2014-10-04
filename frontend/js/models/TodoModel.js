define([
    'underscore',
    'backbone',
], function(_, Backbone) {

    var TodoModel = Backbone.Model.extend({

        url: 'http://localhost/RESTodo/backend/',

        defaults: {
            title: '',
            done: 0
        },

        _validate: function() {
            var title = $.trim(this.attributes.title),
                done = $.trim(this.attributes.done);

            var errors = [];

            if (title === '') {
                errors.push({
                    key: 'title',
                    value: 'Please enter a Title'
                });
            }

            if (done === '') {
                errors.push({
                    key: 'done',
                    value: 'Please enter a valid value for Done'
                });
            }

            return errors;
        }

    });

    return TodoModel;

});
