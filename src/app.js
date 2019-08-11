const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const weather = require('./utils/forecast')
const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handle bars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve 
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
  res.render('index', {  
    title: 'Weather App',
    name: 'Sogyal Sherpa'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Sogyal Sherpa'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    helpText: 'Helpful text',
    name: 'Sogyal Sherpa'
  })
})

app.get('/weather', (req, res) => {

  if(!req.query.address){
    return res.send({
      error: 'Address must be specified.'
    })
  }

  geocode(req.query.address,(error,{latitude,longitude,location} = {})=>{
    if(error){
      return res.send({
        error: error
      })
    }

    weather(latitude,longitude,(error,weather)=>{
      if(error){
        return res.send({
          error: error
        })
      }

      res.send({
        lat:latitude,
        long:longitude,
        forecast: weather,
        location:location
      })
    })
  })
})

app.get('/help/*',(req, res) => {
  res.render('404',{
    title: '404',
    name: 'Andrew Mead',
    message:'Help article not found'
  })
})

app.get('*',(req, res) => {
  res.render('404',{
    title: '404',
    name:'Andrew Mead',
    message: 'Page not found'
  })
})

app.listen(port, () => {
  console.log('Server is up on port ' + port)
})