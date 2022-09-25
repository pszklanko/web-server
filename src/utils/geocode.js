const request = require("request");

const MAPBOX_API_KEY = 'pk.eyJ1IjoieGFzZXBhdjU0NiIsImEiOiJjbDg5dXoxbW8wYXY2M3duM3Rncjc2bWFjIn0.Ng727-kn8fKV0tLObBZ_6w';
const MAPBOX_URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?limit=1&access_token=${MAPBOX_API_KEY}`

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?limit=1&access_token=${MAPBOX_API_KEY}`

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services', undefined);
        } else if (response.body.features.length === 0) {
            callback('Couldn\'t find location!', undefined);
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            });
        }
    })
}

module.exports = geocode;
