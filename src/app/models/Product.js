const mongoose = require('mongoose');
const Convert = require('../../util/mongoose');
const Schema = mongoose.Schema;
const Pro = new Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    number: { type: Number, default: 1 },
    price: { type: Number, required: true },
    type: { type: Number },
    discount: { type: Number, default: 0 },
    supplier: { type: Number, required: true },
    status: { type: Number, default: 1 },
    orderTime: { type: Number, default: 0 }
}, {
    versionKey: false,
    timestamps: true,
});

const product = mongoose.model('product', Pro);

class Product {
    async findAll(data, isAdmin) {
        let minNum = 0;
        if(isAdmin){
            minNum = -1;
        }
        await product.find({ number : {$gt : minNum}})
            .then((products) => {
                products = Convert.cvDataToObjects(products);
                data.products = products;
            })
            .catch(() => {
                data.products = [];
                console.log('[ERROR] Get product fail');
            })
    }

    async findByName(pname, data) {
        await product.find({ 'name': {'$regex': pname } })
            .then((products) => {
                products = Convert.cvDataToObjects(products);
                data.products = products;
            })
            .catch((error) => {
                console.log(error);
                data.products = [];
                console.log('[ERROR] Get product fail');
            })
    }

    async findByType(ptype, data) {
        await product.find({ type: ptype,  number : {$gt : 0} })
            .then((products) => {
                products = Convert.cvDataToObjects(products);
                data.products = products;
                data.Banner = products[products.length - 1].image;
            })
            .catch(() => {
                data.products = [];
                console.log('[ERROR] Get product fail');
            })
    }

    async findBestSeller(data) {
        await product.find({number : {$gt : 0}}).sort({ orderTime: 'desc' }).limit(10)
            .then((products) => {
                products = Convert.cvDataToObjects(products);
                data.lstBestSeller = products;
            })
            .catch(() => {
                data.lstBestSeller = [];
                console.log('[ERROR] Get product fail');
            })
    }

    async findNewArrival(data) {
        await product.find({number : {$gt : 0}}).sort({ createdAt: 'desc' }).limit(10)
            .then((products) => {
                products = Convert.cvDataToObjects(products);
                data.lstNewArrivals = products;
            })
            .catch(() => {
                data.lstNewArrivals = [];
                console.log('[ERROR] Get product fail');
            })
    }

    async create(data, result) {
        let pro = new product(data);
        await pro.save()
            .then(() => {
                result.status = 'success';
            })
            .catch((err) => {
                result.status = 'fail';
                result.err = err;
            })
    }

    async update(data, result) {
        await product.findOne({ _id: data._id })
            .then(async(doc) => {
                doc.name = data.name;
                doc.price = data.price;
                doc.discount = data.discount;
                doc.number = data.number;
                doc.supplier = data.supplier;
                doc.status = data.status;
                await doc.save()
                    .then(() => {
                        result.status = 'success';
                    })
                    .catch(() => {
                        result.status = 'fail';
                    })
            })
            .catch(() => {
                result.status = 'fail';
            })
    }

    async order(id, number) {
        await product.findOne({ _id: id })
            .then(async(doc) => {
                doc.number = doc.number - number;
                doc.orderTime = doc.orderTime + 1;
                if(doc.number == 0){
                    doc.status = 2;
                }
                await doc.save();
                console.log(`order product ${doc._id}`);
            })
    }

    async unorder(id, number) {
        await product.findOne({ _id: id })
            .then(async(doc) => {
                doc.number = doc.number + number;
                doc.orderTime = doc.orderTime - 1;
                doc.status = 1;
                await doc.save();
                console.log(`order product ${doc._id}`);
            })
    }
}

module.exports = new Product;