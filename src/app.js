const path = require('path');

const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const e = require("express");

const app = express();
const port = process.env.PORT || 3000;

const publicDir = path.join(__dirname, '../public');
const viewsDir = path.join(__dirname, '../templates/views');
const partialsDir = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsDir);
hbs.registerPartials(partialsDir);

app.use(express.static(publicDir));

app.get('', (req, res) => {
    res.render('index', { title: 'Weather App', name: 'Piotr' });
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About Page', name: 'Piotr' });
})

app.get('/help', (req, res) => {
    res.render('help', { title: 'Help Page', name: 'Piotr', message: 'Help message'});
})

app.get('/weather', (req, res) => {
    const query = req.query;
    if (query.address) {
        geocode(query.address, (error, {longitude, latitude, location} = {}) => {
            if (error) {
                res.send({error});
            } else {
                forecast(longitude, latitude, (error, data) => {
                    if (error) {
                        res.send({error});
                    } else {
                        res.send({...data, location});
                    }
                })
            }
        })
    } else {
        res.send({ error: 'Provide an address!' });
    }

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'I am not able to help you with that :('
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page Not Found'
    })
})

app.listen(port, () => {
    console.log('App Started!');
});