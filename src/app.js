const path = require('path');
const express = require('express');
const hbs = require('hbs');

const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();
const port = process.env.PORT || '3000';

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location 
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Sujith P Jose'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Sujith P Jose'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Sujith P Jose',
        message: 'test message'
    });
})

app.get('/weather', (req, res) => {
    const adress = req.query.address;
    if (!adress) {
        return res.send({
            error: 'address required!'
        })
    }

    geocode(adress, (error, { latitude, longitude, location } = {}) => {

        if (error) {
            return res.send({
                error: error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                })
            }

            res.send({
                forecast: forecastData,
                location: location,
                address: adress
            });
        });
    });


})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Search term required!'
        })
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (re, res) => {
    res.render('404', {
        title: 'Help',
        name: 'Sujith P Jose',
        errorMessage: 'Help article not found'
    });
})

app.get('*', (re, res) => {
    res.render('404', {
        title: '404',
        name: 'Sujith P Jose',
        errorMessage: 'Page not found'
    });
})

app.listen(port, () => {
    console.log(`server is up on ${port}`);
});