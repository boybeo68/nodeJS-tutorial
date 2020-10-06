
var personModel = require("../models/person")
module.exports.person = (req, res) => {
    const person = new personModel({
        name: "tung dep new",
        height: 85, 
        weight: 23,
        favoriteFoods: ['food', 'milk', 'egg']
    })
    console.log(person)
    person.save((err)=>{
        if(err){
            res.json({
                err: err
            })
        }else{
            res.json({kq: 1})
        }
    })
};
