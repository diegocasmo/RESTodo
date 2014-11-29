require.config({
  paths: {
    jquery: 'libs/jquery/jquery-min',
    underscore: 'libs/underscore/underscore-min',
    backbone: 'libs/backbone/backbone-min',
    templates: '../templates',
    handlebars: 'libs/handlebars/handlebars'
  }

});

require([
  'app',
  'helpers/Message'
], function(App, Message) {

	/**
	 * Initial app call to set up CSRF
	 * protection
	 */
	$.get('http://localhost/RESTodo-master/backend/api/', function(data) {
		
			$.ajaxPrefilter(function(options, originalOptions, jqXHR) {
				// send CSRF token through headers
				if(typeof(data) === 'string')				
					data = JSON.parse(data);
				return jqXHR.setRequestHeader('X-CSRF-Token', data.csrf_token);
			});
			
			// set up application
			App.initialize();
			
		}).fail(function() {
			// error occured, don't initialize aplication
			// and show appropiate message to user
			var message = Message.getInstance();
			message._setStaticMessage(message._customErrors.error);
		});

});