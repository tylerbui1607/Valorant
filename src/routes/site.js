const express = require('express');
const router = express.Router();
const siteController = require('../app/controllers/SiteController');

router.get('/admin', siteController.admin);

router.get('/customer/orders', siteController.cusOrder);

router.post('/api/create/product', siteController.createProduct);

router.post('/api/create/supplier', siteController.createSupplier);

router.post('/api/create/staff', siteController.createStaff);

router.post('/api/update/product', siteController.updateProduct);

router.post('/api/update/supplier', siteController.updateSupplier);

router.post('/api/update/staff', siteController.updateStaff);

router.post('/api/register', siteController.createCustomer);

router.post('/api/login', siteController.login);

router.post('/api/logout', siteController.logout);

router.get('/api/orders/:id', siteController.getOrder);

router.put('/api/orders/:id', siteController.updateOrder);

router.post('/api/order', siteController.order);

router.get('/',siteController.index);

router.get('*',siteController.notfound);

module.exports = router;