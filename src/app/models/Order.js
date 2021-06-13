const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Convert = require('../../util/mongoose');
const Product = require('../models/Product');

const Ord = new Schema({
    customer: { type: Schema.Types.ObjectId, ref: 'customer' },
    customer_name: {type: String, required: true},
    totalprice: { type: Number, required: true },
    address : {type: String, required: true},
    phonenumber : {type: String, required: true},
    order_date: { type: Date, default: Date.now() },
    delivery_date: { type: Date, default: "" },
    note : {type: String, default: ''},
    status: { type: String, default: 'Pending' }
}, {
    versionKey: false,
});

const OrdDetail = new Schema({
    order_id: { type: String, required: true },
    product_id: { type: String, required: true },
    product_name : {type: String, required: true},
    price : {type: Number, required: true},
    number: { type: Number, required: true }
}, {
    versionKey: false,
});

const order = mongoose.model('order', Ord);

const orderdetail = mongoose.model('orderdetail', OrdDetail);

class Order {
    async create(data, result) {
        console.log(data);
        let ord = new order({
            customer: data.customer,
            customer_name: data.customer_name,
            address : data.address,
            phonenumber : data.phonenumber,
            totalprice: data.totalprice,
            note: data.note
        });
        await ord.save()
            .then(async (rod) => {
                let orddetail;
                for (let i = 0; i < data.order.length; i++) {
                    orddetail = new orderdetail({
                        order_id: rod._id,
                        product_id: data.order[i].id,
                        number: data.order[i].num,
                        price: data.order[i].price,
                        product_name: data.order[i].name
                    });
                    await Product.order(orddetail.product_id, orddetail.number);
                    orddetail.save();
                }
                result.status = 'success';
                console.log(result.status);
            })
            .catch((error) => {
                result.status = 'fail';
                console.log(error);
                console.log(result.status);
            })
    }

    async update(data){
        await order.findOne({_id : data.id})
        .then(async (doc)=> {
            console.log(data.delivery_date);
            doc.status = data.status;
            doc.phonenumber = data.phonenumber;
            doc.address = data.address;
            doc.delivery_date = data.delivery_date;
            await doc.save();
        })
    }

    async setExpired(id){
        await order.findOne({_id : id})
        .then(async (doc)=> {
            doc.status = 'Expired';
            await doc.save();
            orderdetail.find({order_id : id})
            .then(async (orderdetails)=>{
                for(let i = 0 ; i < orderdetails.length ; i++){
                    await Product.unorder(orderdetails[i].product_id, orderdetails[i].number);
                }
            })
        })
    }

    async setCancel (id) {
        await order.findOne({_id : id})
        .then(async (doc)=> {
            doc.status = 'Cancel';
            await doc.save();
            orderdetail.find({order_id : id})
            .then(async (orderdetails)=>{
                for(let i = 0 ; i < orderdetails.length ; i++){
                    await Product.unorder(orderdetails[i].product_id, orderdetails[i].number);
                }
            })
        })
    }

    async findAll(data) {
        await order.find({}).populate('customer')
            .then(async (orders) => {
                orders = Convert.cvDataToObjects(orders);
                for (let i = 0; i < orders.length; i++) {
                    let d = new Date(orders[i].order_date);
                    if(orders[i].status == 'Pending'){
                        let now = new Date();
                        let rs =Math.round(( now.getTime() - d.getTime() ) / (1000*3600*24));
                        if(rs > 1)
                        {
                            this.setExpired(orders[i]._id);
                            orders[i].status = 'Expired'
                        }
                    }
                    orders[i].order_date = (d.toLocaleDateString());
                }
                data.orders = orders;
            })
            .catch((err) => {
                console.log(err);
                data.orders = [];
            })
    }

    async findByCustomerID(cus_id, data) {
        await order.find({customer : cus_id})
            .then(async (orders) => {
                orders = Convert.cvDataToObjects(orders);
                for (let i = 0; i < orders.length; i++) {
                    let d = new Date(orders[i].order_date);
                    if(orders[i].status == 'Pending'){
                        let now = new Date();
                        let rs =Math.round(( now.getTime() - d.getTime() ) / (1000*3600*24));
                        if(rs > 1)
                        {
                            this.setExpired(orders[i]._id);
                            orders[i].status = 'Expired'
                        }
                    }
                    orders[i].order_date = (d.toLocaleDateString());
                }
                data.orders = orders;
            })
            .catch((err) => {
                console.log(err);
                data.orders = [];
            })
    }

    async findByID(order_id, data){
        await order.findOne({_id : order_id}).populate('customer')
            .then( async (orders) => {
                orders = Convert.cvDataToObject(orders);
                var d = new Date(orders.order_date);
                orders.order_date = (d.toLocaleDateString());
                await orderdetail.find({order_id : orders._id}).select('product_name price number -_id')
                .then((products) => {
                    products = Convert.cvDataToObjects(products);
                    orders.products = products;
                    data.order = orders;
                })
                .catch((err) => {
                    console.log(err);
                })
            })
            .catch((err) => {
                console.log(err);
                data.orders = [];
            })
    }
}

module.exports = new Order;