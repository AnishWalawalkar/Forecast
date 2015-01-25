
function forecast(latitude, longitude) {
	var https = require('https');
	var error = require('./error');
	var request = https.get('https://api.forecast.io/forecast/d59b69c8948064cda453620a7741dcd7/' + latitude + ',' + longitude, function(response) {
		var result = '';
		response.on('data', function(chunk) {
			result += chunk;
		});
		response.on('end', function() {
			var weather; 
			if(response.statusCode === 200) {
				try {
					weather = JSON.parse(result);
					console.log('HERE ARE THE WEATHER CONDITIONS:' + '\n' + 'RIGHT NOW: ' + weather.currently.summary + '\n' + 'Actual Temperature: ' + weather.currently.temperature + '\n' + 'Feels like: ' + weather.currently.apparentTemperature + '\n' + 'Next 24 Hours: ' + weather.hourly.summary + '\n' + 'Daily: ' + weather.daily.summary);
				}catch(error) {
					error.logError(error);
					weather = 'unable to get the weather from forecast.io';
				}
			} else {
				error.logError({message: 'Unable to get the weather.' + response.statusCode});
			}
		});
	});

	request.on('error', error.logError);
	request.end();
}

module.exports.forecast = forecast;