const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const products = require('./products/products.json');
// handlebars middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// body parse middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// render homepage route
app.get('/', (req, res) =>
  res.render('index', {
    title: 'Products',
    products,
  })
);

// init routes
app.use('/api/products', require('./routes/products'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
