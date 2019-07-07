const path = require('path');
const express = require('express');
const hbs = require('hbs');
const weatherapp = require('./utils/utils');
const request = require('request');

const app = express();
const extdir = path.join(__dirname,'../public');
const partialpath = path.join(__dirname,'../partials');

app.set('view engine','hbs');
hbs.registerPartials(partialpath);
app.use(express.static(extdir));

app.get('', (req,res) => {
    
    res.render('index', {
    });
})

app.get('/index', (req,res) => {
    
    res.render('index', {
    });
})

app.get('/weather', (req,res) => {
    
    if(!req.query.search)
        return res.send({error: "Please enter a location"});
    

    const location = req.query.search;
    weatherapp.geoCode(location, (error, {latitude, longitude, place} = {}) => {
        if(error) 
            return res.send({error: error});
    
        weatherapp.forecast(latitude,longitude, (error, { temperature, precip, summary} = {}) => {
        if(error) 
            return res.send({error: error});
    
        res.send({
            Place : place,
            Temperature : temperature,
            Precip : precip,
            Status : summary
            
        });
     })
   // res.send('Demo page');
})
})
app.get('*', (req,res) => {
    res.render('404', {
        title : '404',
        message: 'Page not found'
    });
})

app.listen(3000, () => {
    console.log("Server has started");
})