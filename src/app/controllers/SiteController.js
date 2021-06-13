const Product = require('../models/Product');
const Customer = require('../models/Customer');
const Convert = require('../../util/mongoose');
const Supplier = require('../models/Supplier');
const Employee = require('../models/Employee');
const Order = require('../models/Order');
const Instal = require('../models/Instalment');
const War = require('../models/Warranty');
const fs = require('fs');
const fetch = require('node-fetch');
const path = require('path');

class SiteController {

    async index(req, res, next) {
        let data = {};
        await Product.findBestSeller(data);
        await Product.findNewArrival(data);
        res.render('home', {data});
    }

    async admin(req, res, next) {
        // console.log(req.session.role);
        // if (req.session.role === null || req.session.role !== 0) {
        //     res.status(403).render('403');
        // } else 
        {
            let data= {};
            await Employee.findAll(data);
            await Order.findAll(data);
            await Product.findAll(data, true);
            await Supplier.findAll(data);
            await Customer.findAll(data);
            await Instal.findAll(data);
            await War.findAll(data);
            res.render('admin', {data});
        }
    }

    async cusOrder(req, res, next){
        let data = {};
        await Order.findByCustomerID(req.session.customer_id, data);
        res.render('customerOrder', {data});
    }

    async createProduct(req, res, next) {
        let product = {
            name: req.body.name,
            image: req.body.image,
            price: parseInt(req.body.price),
            type: parseInt(req.body.type),
            supplier: parseInt(req.body.supplier),
            discount: 0,
            number: parseInt(req.body.number),
        };
        let result = {};
        await Product.create(product, result);
        console.log(result);
        res.json(result);
    }

    async updateProduct(req, res, next){
        let product = {
            _id : req.body.id,
            name: req.body.name,
            price: parseInt(req.body.price),
            type: parseInt(req.body.type),
            supplier: parseInt(req.body.supplier),
            discount: parseInt(req.body.discount),
            status : parseInt(req.body.status),
            number: parseInt(req.body.number),
        };
        let result = {};
        await Product.update(product, result);
        console.log(result);
        res.json(result);
    }

    async createSupplier(req, res, next){
        let supplier = {
            name: req.body.name,
            image: '/img/' + req.body.image,
            address: req.body.address,
            phonenumber: req.body.phonenumber,
        };
        let url = req.body.url;
        let fileName = url.split('/')[4];
        console.log(fileName);
        const response = await fetch(url);
        const buffer = await response.buffer();
        fs.writeFile(`G:/Web/Shop/src/public/img/${fileName}`, buffer, () => 
        console.log('finished downloading!'));
        let result = {};
        await Supplier.create(supplier, result);
        console.log(result);
        res.json(result);
    }

    async updateSupplier(req, res, next){
        console.log(req.body);
        let data = {
            _id : req.body.id,
            name : req.body.name,
            address : req.body.address,
            pnumber : req.body.pnumber
        }
        let result = {};
        await Supplier.update(data, result);
        res.json(result);
    }

    async createStaff(req, res, next){
        let staff = {
            name : req.body.name,
            personalID : req.body.id,
            phonenumber : req.body.phonenumber,
            role : req.body.type,
            username : req.body.username,
            password : req.body.password,
        };
        let result = {};
        await Employee.create(staff, result);
        console.log(result);
        res.json(result);
    }

    async updateStaff(req, res, next){
        let data = {
            _id : req.body.id,
            name : req.body.name,
            personalID : req.body.personalID,
            pnumber : req.body.pnumber,
            role : req.body.role,
            status : req.body.status
        }
        let result = {};
        await Employee.update(data, result);
        res.json(result);
    }

    async createCustomer(req, res, next) {
        let customer = {
            name: req.body.name,
            address: req.body.address,
            phonenumber: req.body.phonenumber,
            username: req.body.username,
            password: req.body.password,
        };
        let result = {};
        await Customer.create(customer, result);
        console.log(result);
        req.session.role = result.role;
        req.session.customer_id = result.id;
        res.json(result);
    }

    async login(req, res, next) {
        let data = {
            username : req.body.username,
            password : req.body.password,
        };
        let result = {};
        await Employee.login(data, result);
        if(result.status == 'fail'){
            await Customer.login(data, result);
        }
        req.session.role = result.role;
        req.session.customer_id = result.id;
        console.log(req.session);
        res.json(result);
    }

    logout(req, res, next){
        console.log('logout');
        req.session.destroy();
        res.json({
            status : 'success',
        })
    }

    async order(req, res, next){
        let result = {};
        let insChecked  = req.body.checked;
        let data = {
            customer_name : req.body.customer_name,
            customer: req.body.customer,
            order : req.body.order,
            address : req.body.address,
            phonenumber : req.body.phonenumber,
            totalprice : req.body.totalprice,
            note : req.body.note
        }
        console.log(data);
        let ins = {
            customer_id: req.body.customer_id,
            customer_name: req.body.customer_name,
            list_product: req.body.list_product,
            totalprice: req.body.totalprice,
        }

        if(insChecked){
            await Instal.create(ins, result);
            await War.create(ins, result);
            data.status = 'Pending';
            await Order.create(data, result);
        }
        else {
            data.status = 'Paid';
            await War.create(ins, result);
            await Order.create(data, result);
        }
        res.json(result);
    }

    async getOrder(req, res, next){
        let data = {};
        await Order.findByID(req.params.id, data);
        res.json(data.order);
    }

    async updateOrder(req, res, next){
        let data = {};
        data.status = req.body.status;
        if(data.status == 'Cancel'){
            await Order.setCancel(req.params.id);
        }else{
            data.address = req.body.address;
            data.phonenumber = req.body.phonenumber;
            data.delivery_date = req.body.delivery_date;
            data.id = req.params.id;
            console.log(data.id);
            await Order.update(data);
        }
        res.json({
            status : 'success'
        });
    }

    denied(req, res, next) {
        res.status(403).render('403');
    }

    notfound(req, res, next) {
        res.status(404).render('404');
    }
}
module.exports = new SiteController;