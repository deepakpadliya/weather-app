const request = require('request');
const wetherStackAPIKEY = '9e66950fe810c997645ed28e0e41d736';
const forecast = (longitude, latitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=${wetherStackAPIKEY}&query=${longitude},${latitude}&units=f`;

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback(error, undefined);

        }
        else if (response.body.error) {
            callback(response.body.error, undefined);

        }
        else {
            callback(undefined,response.body.current);
        }
    });
}

module.exports = forecast;