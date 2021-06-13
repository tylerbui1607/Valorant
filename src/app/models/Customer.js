const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Convert = require('../../util/mongoose');

const Cus = new Schema({
    name: { type: String },
    address: { type: String },
    phonenumber: { type: String },
    username: {type: String, unique: true},
    password: {type: String},
    idnumber: {type: String, default: ''},
    role : {type: Number, default: 4},
},{
    versionKey : false,
});

const customer = mongoose.model('customer', Cus);

class Customer {
    async create(data, result){
        let cus = new customer(data);
        await cus.save()
        .then((cus)=>{
            result.status = 'success';
            console.log('success');
            result.name = cus.name;
            result.id = cus._id;
            result.role = 4;
            result.address = cus.address;
            result.phone = cus.phonenumber;
        })
        .catch(()=>{
            console.log('fail');
            result.status = 'fail';
        })
    }

    async login(data, result){
        console.log(data);
        await customer.find({username : data.username , password : data.password})
        .then((customers)=>{
            if(customers.length > 0){
                result.status = 'success';
                result.id  = customers[0]._id;
                result.name = customers[0].name;
                result.address = customers[0].address;
                result.phone = customers[0].phonenumber;
                result.role = 4;
            }
            else{
                result.status = 'fail';
            }
        })
        .catch(()=>{
            result.status = 'fail';
        })
    }

    async findAll(data){
        customer.find({})
        .then((customers)=>{
            customers = Convert.cvDataToObjects(customers);
            data.customers = customers;
        })
        .catch(()=>{
            data.customers = [];
        })
    }

}

module.exports = new Customer;