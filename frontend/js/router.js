define([
    'jquery',
    'underscore',
    'backbone',
    'views/HomeLayoutManager',
    'handlebars',
], function($, _, Backbone, HomeLayoutManager) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            '': 'showTodos',
            'home': 'showTodos'
        }

    });

    var initialize = function() {

        var app_router = new AppRouter;

        app_router.on('route:showTodos', function() {
            var homeLayoutManager = new HomeLayoutManager({
                router: this
            });
        });

        Backbone.history.start();
    };
    return {
        initialize: initialize
    };
});
