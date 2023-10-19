// imports
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()

// express server initialization
const app = express();
const PORT = process.env.PORT || 5000;

// necessary middlewares
app.use(cors());
app.use(express.json());

// mongodb
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cyycawz.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        // brand shop database
        const brandShopDatabase = client.db('brandShop');

        // brands collection
        const brandCollection = brandShopDatabase.collection('brands')
        app.get('/brands', async (req, res) => {
            const cursor = brandCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        // products collection
        const productCollection = brandShopDatabase.collection('products')
        app.get('/products/:brand', async (req, res) => {
            const brand = req.params.brand;
            console.log(brand);
            const cursor = productCollection.find({brand: brand});
            const result = await cursor.toArray();
            res.send(result);
        })



        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


// server paths
app.get('/', (req, res) => {
    res.send('Brand Shop Server is running.')
})

// server listener
app.listen(PORT, () => {
    console.log(`Brand Shop Server is running on port: ${PORT}`);
});