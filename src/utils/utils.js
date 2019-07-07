const request = require('request');

const geoCode = (address, callback) => {
    const geocodingurl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYXhlbGJsYXplMTQwMSIsImEiOiJjanhyNGlwZjIwNDNkM21vMXhlem1yN292In0.Hwp_JpDyb2y7tLCNTlsZqg';
    
    request({url:geocodingurl, json:true}, (error, response) => {

        if(error)
            callback('Unable to connect to Location web service.',undefined);
        else if(response.body.features.length === 0)
            callback('Unabe to find the location on MapBox',undefined);
        else {
            callback(undefined, {
                latitude : response.body.features[0].center[1],
                longitude : response.body.features[0].center[0],
                place : response.body.features[0].place_name
            })
        }
    })
 }

 const forecast = (latitude,longitude, callback) => {
    const forecasturl = 'https://api.darksky.net/forecast/6a3defe8aae377b3e633d36291f1589d/'+latitude+','+longitude+'?units=si';
    
    request({url:forecasturl, json:true}, (error, response) => {

        if(error)
            callback('Unable to connect to DarkSKY Weather web service.',undefined);
        else if(response.body.error)
            callback('Unabe to find the forecast on DarkSKY',undefined);
        else {
            callback(undefined, {
                temperature : response.body.currently.temperature,
              precip : response.body.currently.precipProbability,
             summary : response.body.daily.data[0].summary
            })
            
        }
    })
 }

module.exports = {
    geoCode ,
    forecast
}
