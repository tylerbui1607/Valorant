const express = require('express');
const router = express.Router();

const productsController = require('../app/controllers/ProductsController');

router.get('/chair', productsController.chair);

router.get('/table', productsController.table);

router.get('/decor', productsController.decor);

router.get('/bed', productsController.bed);

router.get('/search/:name', productsController.search)

router.get('/', productsController.index);

module.exports = router;