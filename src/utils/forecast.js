const request = require('request');

const forecast = (latitude, longitude, callback) => {
    
    const url = 'http://api.weatherstack.com/current?access_key=a8a7c92e65a2c93546a02fab8a5b19d7&query='+latitude+','+longitude+'&units=f';
    request({url, json:true}, (error, {body}) => {
        if (error) {
            callback('No network connnection', undefined);
        } else if (body.error) {
            callback('invalid input'+response.body.error.info, undefined);
        } else  {
            callback(undefined, body.current.weather_descriptions[0]  + '. It is currently ' + body.current.temperature + 
            ' degress out. Feels like temperature is ' + body.current.feelslike + ' F.'
            )
        }
    })
};

module.exports = forecast;