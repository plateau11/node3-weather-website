const request = require('request')

const geocode = (address, callback) => {
    //const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYW5kcmV3bWVhZDEiLCJhIjoiY2pvOG8ybW90MDFhazNxcnJ4OTYydzJlOSJ9.njY7HvaalLEVhEOIghPTlw&limit=1'

    const url = 'https://api.tomtom.com/search/2/geocode/'+address+'.json?key=mxdlEYFG5Km1TGMPc2abkOv0iO0gEci8&limit=1'

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if(response.body.errorText){
        //console.log("Unable to find location")
         callback('Unable to find location', undefined)
         } else {

            if(response.body.summary.numResults===0){

                //console.log(response.body.results)

                callback('unable to find location',undefined)

                return
            }

            else{
                callback(undefined, {
                
                    latitude: response.body.results[0].position.lat,
                    longitude: response.body.results[0].position.lon
                    //location: response.body.features[0].place_name
                })
            }

           
        }
    })
}

const forecast = (a,b, callback) => {
    //const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYW5kcmV3bWVhZDEiLCJhIjoiY2pvOG8ybW90MDFhazNxcnJ4OTYydzJlOSJ9.njY7HvaalLEVhEOIghPTlw&limit=1'

    //const url = 'https://api.tomtom.com/search/2/geocode/'+address+'.json?key=mxdlEYFG5Km1TGMPc2abkOv0iO0gEci8&limit=2'

    const url = 'http://api.weatherapi.com/v1/current.json?key=e0d99f36916f42749a5133439230607&q='+a+','+b


    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if(response.body.error){
        //console.log("Unable to find location")
        callback('unable to find location', undefined)
         } else {
            callback(undefined, {
                temperature: response.body.current.temp_c,
                location: response.body.location.name
            })
        }
    })
}

module.exports = {
    geocode: geocode,
    forecast : forecast
}