const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const password = 'MongoDB';

const uri = "mongodb+srv://MinhajSadik:MongoDB@cluster0.djohz.mongodb.net/organicsdb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
})

client.connect(err => {
    const collection = client.db("organicsdb").collection("products");

    app.get('/products', (req, res) => {
        collection.find({})
            .toArray((err, documents) => {
                res.send(documents);
        })
    })

    app.post('/addProduct', (req, res) => {
        const product = req.body;
        collection.insertOne(product)
            .then(result => {
                console.log('data add successfully')
                res.send('success')
        })
    })
    app.delete('/delete/:id', (req, res) => {
        collection.deleteOne({ _id: req.params.id })
            .then((err, result) => {
            console.log(result)
        })
    })


});

app.listen(545, console.log('Server Runnig Port: 545'))


