const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoic3VqaXRocGpvc2UiLCJhIjoiY2p0Ymo2anR0MGwzajN5cGM2ZGNlejVqdyJ9.DZCkny5etHsddhUnY3Wccw`;

    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback('Unable to connect to server');
        } else if (body.features.length == 0) {
            callback('Unable to find location. Do other search');
        } else {
            const data = body.features[0];
            const result = {
                latitude: data.center[1],
                longitude: data.center[0],
                location: data.place_name
            }
            callback(undefined, result);
        }
    });
}

module.exports = geocode;