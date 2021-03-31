const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const password = 'MongoDB';

const uri = "mongodb+srv://MinhajSadik:MongoDB@cluster0.djohz.mongodb.net/organicsdb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

app.get('/', (req, res) => {
    res.send('Hello ANIKA  I am Working');
})

client.connect(err => {
    const collection = client.db("organicsdb").collection("products");
    console.log('database connect')
    client.close();
});

app.listen(545, console.log('Server Runnig Port: 545'))