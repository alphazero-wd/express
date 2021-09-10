const express = require('express');
const uuid = require('uuid');
const products = require('../products/products.json');
const router = express.Router();

// get all products
router.get('/', (req, res) => res.json(products));

// get single product by its id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const isFound = products.some((product) => product.id === id);
  const product = products.filter((product) => product.id === id);
  if (isFound) {
    res.json(product);
  } else {
    res.status(400).json({ message: `No product found with the id of ${id}` });
  }
});

// create new product
router.post('/', (req, res) => {
  const product = {
    id: uuid.v4(),
    name: req.body.name,
    price: req.body.price,
  };
  if (!product.name || !product.price) {
    res.status(400).json({ message: 'Please include a name and price!' });
  } else {
    products.push(product);
    // res.json(products);
    res.redirect('/');
  }
});

// update a product
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const isFound = products.some((product) => product.id === id);
  if (isFound) {
    const updatedProduct = req.body;
    products.forEach((product) => {
      if (id === product.id) {
        product.name = updatedProduct.name ? updatedProduct.name : product.name;
        product.price = updatedProduct.price
          ? updatedProduct.price
          : product.price;
        res.json({ message: 'Member Updated', product });
      }
    });
  } else {
    res.status(400).json({ message: `No Product with the id of ${id}` });
  }
});

// delete product
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const isFound = products.some((product) => product.id === id);
  if (isFound) {
    const remainingProducts = products.filter((product) => product.id !== id);
    res.json(remainingProducts);
  } else {
    res.status(400).json({ message: `No Product with the id of ${id}` });
  }
});

module.exports = router;
