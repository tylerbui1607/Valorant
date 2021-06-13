const mongoose = require('mongoose');
const Convert = require('../../util/mongoose');
const Schema = mongoose.Schema;

const Warranty = new Schema({
    customer_name:{type: String, require: true},
    list_product: [{
        type: String,
        },
    ],
    date_expired: {type: Date, default: Date.now()}
}, {
    versionKey : false,
})

const war = mongoose.model('wars', Warranty);

class War{
    async create(data, result){
        let wars = new war(data);
        await wars.save()
        .then(()=>{
            result.status = 'success';
            console.log(result.status);
        })
        .catch((error)=>{
            console.log(error);
            result.status = 'war fail';
            console.log(result.status);
        })
    }

    async findAll(data){
        war.find({})
        .then((wars)=>{
            wars = Convert.cvDataToObjects(wars);
            data.wars = wars;
        })
        .catch(()=>{
            data.wars = [];
        })
    }
}

module.exports = new War;