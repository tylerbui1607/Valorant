const Product = require('../models/Product');
const Convert = require('../../util/mongoose');
const Supplier = require('../models/Supplier');
const { param } = require('../../routes/site');
class ProductsController {

    // [GET] /products
    async index(req, res, next) {
        let data = {};
        await Product.findAll(data, false);
        res.render('products', { data });
    }

    async chair(req, res, next) {
        let data = {};
        data.Title = 'Chair & Sofa';
        await Product.findByType(1, data);
        await Supplier.findAll(data);
        res.render('category', { data });
    }

    async table(req, res, next) {
        let data = {};
        data.Title = 'Table';
        await Product.findByType(2, data);
        await Supplier.findAll(data);
        res.render('category', { data });
    }

    async decor(req, res, next) {
        let data = {};
        data.Title = 'Decoration';
        await Product.findByType(3, data);
        await Supplier.findAll(data);
        res.render('category', { data });
    }

    async bed(req, res, next) {
        let data = {};
        data.Title = 'Bed';
        await Product.findByType(4, data);
        await Supplier.findAll(data);
        res.render('category', { data });
    }

    async search(req, res, next) {
        let data = {};
        await Product.findByName(req.params.name, data);
        res.render('products', { data });
    }
}

module.exports = new ProductsController;