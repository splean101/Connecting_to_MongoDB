import mongoose from 'mongoose';
import express from 'express';
import { Product } from './model/product.js';
//import { Customer } from './model/customer.js';

const url = 'mongodb://localhost:27017/shop';
const PORT = 3000;
const app = express();

mongoose
  .connect(url)
  .then(() => {
    console.log('Connected to DB');
    app.listen(PORT, () => {
      console.log(`Server started on http://localhost:${PORT}`);
    });
    app.get('/', (req, res) => {
      Product.find()
        .then((products) => {
          const productsHtml = products.map(
            (product) => `
        <div style="border: 1px solid black; 
        width: fit-content; 
        margin: 0 0 20px 0; 
        padding: 0 10px">
        ${product.name}: ${product.title} Price: ${product.price}
        </div>
         `
          );
          const html = `<h1>Users purchases:</h1> ${productsHtml.join('')}`;
          res.send(html);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  })
  .catch((err) => {
    console.log(`DB connection error: ${err}`);
  });
