const express = require("express");
const app = express();


const port= 3307;

app.use(express.json());


/** /json/cart */

let buyMessage = require('./json/cart/buy.json');

app.get("/cart/buy.json", (req, res) => {
    res.send(buyMessage); 
    });


/** /json/cats */


let cats = require("./json/cats/cat.json");
let categories= {};


app.get("/cats", (req, res) => {
    res.json(cats); 
    });

app.get("/cats/:id", (req,res)  => {
    for (let i=0; i<cats.length; i++){
        console.log(cats[i].id);
        if (cats[i].id==req.params.id){
            categories= cats[i];
        }
    }
    res.send(categories);
    categories={};
})

/** /json/cats_products */

app.get('/cats_products/:catid',(req,res) => {
    let catID= req.params.catid;
    let catProducts = require(`./json/cats_products/${catID}.json`);
    res.send(catProducts);
})

/** /json/products */

app.get('/products/:id', (req,res) => {
    let productID= req.params.id;
    let productInfo= require(`./json/products/${productID}.json`);
    res.send(productInfo);
})

/** /json/sell */

let sell = require("./json/sell/publish.json");


app.get("/sell", (req, res) => {
    res.json(sell); 
    });


app.listen(port, () =>{
    console.log("Servidor funcionando")

})