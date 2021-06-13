const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Product = require('./Product');
const Convert = require('../../util/mongoose');

const Instalment = new Schema({
    customer_id: { type: String, required: true },
    customer_name: {type: String, require: true},
    list_product: [{
        type: String,
        },
    ],
    totalprice: {type: String, require: true},
    pay_date : {type: Date, default: Date.now()},
    pay_number : {type: String, default: '6'},
    status : {type : String, default: 'Pending'}
},{
    versionKey : false,
});


const instal = mongoose.model('instals', Instalment);

class Instal {
    async create(data, result){
        let ins = new instal(data);
        await ins.save()
        .then(()=>{
            result.status = 'success';
            console.log(result.status);
        })
        .catch((error)=>{
            console.log(error);
            result.status = 'instal fail';
            console.log(result.status);
        })
    }

    async findAll(data){
        instal.find({})
        .then((instals)=>{
            instals = Convert.cvDataToObjects(instals);
            data.instals = instals;
        })
        .catch(()=>{
            data.instals = [];
        })
    }
}

module.exports = new Instal;