const request = require('request')

const forecast = (lat,long,callback)=> {
  const url = 'https://api.darksky.net/forecast/fbf7bd7315a8b3521519ef1f7f871032/'+ encodeURIComponent(lat) +','+encodeURIComponent(long) +'?units=si&lang=en'

  request({ url, json: true }, (error, {body})=>{
        if(error){
          callback('Unable to connect to weather service!',undefined)
      	}else if(body.error){
          callback('Unable to find location',undefined)
      	}else{
      		const temp = body.currently.temperature
          const rain = body.currently.precipProbability
          callback(undefined,body.daily.data[0].summary+' It is currently ' + temp + ' degrees outside. The high today is ' + body.daily.data[0].temperatureHigh 
          + ' with a low of '+ body.daily.data[0].temperatureLow + '. There is a ' + rain +' % chance of rain')
      	}
  })
}

module.exports = forecast