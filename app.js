require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Product = require('./models/Product'); 
const methodOverride = require('method-override');
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Set EJS and middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// ✅ Redirect root to /products
app.get('/', (req, res) => {
  res.redirect('/products');
});

// 🆕 GET: Show form to add a product
app.get('/products/new', (req, res) => {
  res.render('products/new');
});

// ✅ POST: Add a new product
app.post('/products', async (req, res) => {
  const { name, price, quantity, category } = req.body;
  await Product.create({ name, price, quantity, category });
  res.redirect('/products');
});

// ✅ GET: Show list of all products
app.get('/products', async (req, res) => {
  const products = await Product.find({});
  res.render('products/index', { products });
});

// ✅ GET: Show form to edit a product
app.get('/products/:id/edit', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render('products/edit', { product });
});

// ✅ PUT: Update product
app.put('/products/:id', async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true
  });
  res.redirect('/products');
});

// ✅ GET: Confirm delete page
app.get('/products/:id/delete', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render('products/delete', { product });
});

// ✅ DELETE: Delete product
app.delete('/products/:id', async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.redirect('/products');
});

// ✅ GET: Show single product details
app.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render('products/show', { product });
});

// ✅ Start server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
