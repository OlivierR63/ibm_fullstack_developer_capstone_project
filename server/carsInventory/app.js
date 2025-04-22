const express = require ('express');
const mongoose = require('mongoose');
const fs = require('fs');
const cors = require('');

const app = require(express());
const port = 3050;

app.use(cors);
app.use(express.urlencoded({extended: false}));

const carsData = JSON.parse(fs.readFileSync('cars_records.json'));
mongoose.connect('mongodb://mongodb:27017/', {dbName: 'dealsershipDB'})
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.error('MongoDB connection error:', err));

const Cars = require('./inventory');

try {
    Cars.deleteMany({})
        .then(() => {
            Cars.insertMany(carsData.cars);
    });
}
catch(error){
    console.error(error);
};

app.get('/', async (req, res) => {
    res.send('Welcome to the Mongoose API');
});

app.get('/cars/:id', async (req, res) => {
    try{
        const document = await Cars.find(dealers_id : req.params.id);
        req.json(document);
    } 
    catch(error){
        res.status(500).json({error: 'Error fetching reviews'});
    };
});