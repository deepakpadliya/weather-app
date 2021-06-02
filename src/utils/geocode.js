const request  = require('request');
const mapBoxAPIKEY = 'pk.eyJ1IjoiZGVlcGFrcGFkbGl5YTMxIiwiYSI6ImNrcGI2ZjhhZzB6bHcybm1wMWtqY2ZtaHYifQ.g-HCzB1W6hT182OKK_c_2Q';

const getGeoCode = (address,callback) =>{
    const geoCodeURL =`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${mapBoxAPIKEY}&limit=1`;
    request({ url: geoCodeURL, json: true }, (error, response) => {
        if (error) {
            callback(error,undefined);
        }
        else if(response.body.features.length==0){
            callback(response.body,undefined);
        }
        else if(response.body){
            let {place_name} = response.body.features[0];
            let [longitude,latitude] = response.body.features[0].center;

            callback('',{long:longitude,lat:latitude,location:place_name});
        }
    });
}
module.exports = getGeoCode;