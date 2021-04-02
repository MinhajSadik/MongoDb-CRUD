const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

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

    // get multiple products in database
    app.get('/products', (req, res) => {
        collection.find({})
            .toArray((err, documents) => {
                res.send(documents);
            })
    })

    // get single product in database
    app.get('/product/:id', (req, res) => {
        collection.find({ _id: ObjectId(req.params.id) })
            .toArray((err, documents) => {
                res.send(documents[0]);
            })
    })

    // post product in database
    app.post('/addProduct', (req, res) => {
        const product = req.body;
        collection.insertOne(product)
            .then(result => {
                console.log('data add successfully')
                res.send('success')
            })
    })

    app.patch('/update/:id', (req, res) => {
        collection.updateOne({ _id: ObjectId(req.params.id) },
            {
                $set: { name: req.params.name, price: req.params.price, quantity: req.params.quantity }
            })
            .then(result => {
                console.dir(result)
            })
    })

    // delete product in database
    app.delete('/delete/:id', (req, res) => {
        collection.deleteOne({ _id: ObjectId(req.params.id) })
            .then(result => {
                console.log(result)
            })
    })

});

app.listen(545, console.log('Server Runnig Port: 545'))


