const request = require("request");

const API_KEY = 'dc9c97f47246d3f2f9f93f89c956c476';
const URL = 'http://api.weatherstack.com/'; // current
const units = 'm'; // (m)etrics - default, (s)cientific ,(f)ahrenheit

// xasepav546@bongcs.com
// Kraków 50.0647° N, 19.9450° E

const forecast = (longitude, latitude, callback) => {
    request({
            url: `${URL}current?access_key=${API_KEY}&query=${longitude},${latitude}`, // &units=${units}`,
            json: true
        },
        (error, { body }) => {
            if (error) {
                callback('Unable to connect to weather service.', undefined);
            } else {

                if (!body.error) {
                    const { weather_descriptions, temperature, feelslike } = body.current;
                    callback(undefined, {
                        weather_description: weather_descriptions[0],
                        temperature: temperature,
                        feelslike: feelslike
                    });
                } else {
                    callback(body.error.info, undefined);
                }
            }
        })
}

module.exports = forecast;