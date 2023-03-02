const express = require('express');
const app = express();
const cors = require('cors');

const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion} = require('mongodb');

// middlware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://listing_page:wuGQ8Rxb8wNGbZFu@cluster0.wfqwiph.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
  try{
    const productsCollection = client.db('listingPage').collection('products');

        app.get('/products', async(req,res)=>{
            const query ={}
            const cursor =productsCollection.find(query);
            const products = await cursor.toArray();
            res.send(products);
        })
        app.get('/products/:id', async(req,res)=>{
            const id = req.params.id
            const query ={ id: (id) }
            const product = await productsCollection.findOne(query);
            res.send(product);
        })
  }
  finally{

  }
}
run().catch(err => console.error(err));

app.get('/',(req,res)=>{
    res.send('look mama ')
});

app.listen(port,()=>{
    console.log(`server is running mama ${port}`)
})