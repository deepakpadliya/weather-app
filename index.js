const express = require('express');
const path = require('path');
const hbs = require('hbs');
const getGeoCode = require('./src/utils/geocode');
const forecast = require('./src/utils/forecast');

require('dotenv').config();
const app = express();

//Define paths for Express config
const publicDir = path.join(__dirname, '/public');
const viewsPath = path.join(__dirname, '/templates/views');
const partialPath = path.join(__dirname, '/templates/partial');

//setup handlebars and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);

hbs.registerPartials(partialPath);

//setup static driectory to serv
app.use(express.static(publicDir));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Deepak Padliya'
    });
});

app.get('/wather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'please provide address'
        })
    }
    let address = req.query.address;
    getGeoCode(address, (error, { long, lat,location } = {}) => {
        if (error) {

            return res.send({ error });
        }
        console.log(long,lat,location);
        forecast(long, lat, (error, data) => {
            if (error) {
                res.status(400).send({ error });
            } else {
                
                const {temperature,feelslike, weather_descriptions} = data;
                res.send({
                    forecast:`${weather_descriptions[0]}. It is currently ${temperature} degree out. It feels like ${feelslike} degree out.`,
                    location:location,
                    address: req.params.address
                })
            }
        });
    });

});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Deepak Padliya'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        name: 'Deepak Padliya',
        title: 'Help',
        message: 'Deepak Padliya'
    });
});


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Deepak Padliya',
        errorMessage: 'Help Article Not Found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Deepak Padliya',
        errorMessage: 'Page Not Found.'
    })
});
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});