const mongoose = require('mongoose');
const Convert = require('../../util/mongoose');
const Schema = mongoose.Schema;

const Emp = new Schema({
    name: { type: String },
    personalID: {type: String, default: ''},
    phonenumber: { type: String },
    role : {type: Number, required: true},
    status : {type: Number, default: 1},
    username: {type: String, unique: true},
    password: {type: String},
},{
    versionKey : false,
});

const employee = mongoose.model('employee', Emp);

class Employee{
    async findAll(data){
        await employee.find({role: { $gt: 0 }})
        .then((employees)=>{
            employees = Convert.cvDataToObjects(employees);
            data.employees = employees;
        })
        .catch(()=>{
            data.allEmp = [];
            console.log('[ERROR] Get employee fail');
        })
    }

    async create(data, result){
        let emp = new employee(data);
        await emp.save()
        .then(()=>{
            result.status = 'success';
        })
        .catch((err)=>{
            result.status = 'fail';
            result.err = err;
        })
    }

    async update(data, result){
        console.log(data);
        await employee.findOne({_id : data._id})
        .then(async (doc)=>{
            doc.name = data.name;
            doc.personalID = data.personalID;
            doc.phonenumber = data.pnumber;
            doc.role = data.role;
            doc.status = data.status;
            await doc.save()
            .then(()=>{
                result.status = 'success';
            })
            .catch(()=>{
                result.status = 'fail';
            })
        })
        .catch(()=>{
            result.status = 'fail';
        })
    }

    async login(data, result){
        console.log(data);
        await employee.find({ username: data.username, password: data.password })
        .then((employees)=>{
            if(employees.length > 0){
                result.status = 'success';
                result.id = employees[0]._id;
                result.name = employees[0].name;
                result.role = employees[0].role;
            }
            else{
                result.status = 'fail';
            }
        })
        .catch(()=>{
            result.status = 'fail';
        })
    }
}

module.exports = new Employee;