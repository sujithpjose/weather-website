const request = require('request');

const forecast = (lat, lng, callback) => {
    // https://api.darksky.net/forecast/8a4b7a7ca5c653159d368a605598373e/37.8267,-122.4233?exclude=currently,minutely,flags
    const url = `https://api.darksky.net/forecast/8a4b7a7ca5c653159d368a605598373e/${lat},${lng}`;

    request({ url, json: true }, (err,{ body }) => {
        if (err) {
            callback('Unable to connect to server')
        } else if (body.error) {
            callback(body.error)
        } else {
            const message = `Current temperature is ${body.currently.temperature} and there is ${body.currently.precipProbability} chance for rain`;
            callback(undefined, message);
        }
    })
}

module.exports = forecast;