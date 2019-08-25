const mongoose = require('mongoose')
const Schema = mongoose.Schema

let CartSchema = new Schema({
  status : {
    type: String,
    // required: [true, "Title cannot be empty"]
  },
  UserId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User'
  },
  product : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Product'
  },
  quantity: {
    type : Number
  }
    
}, {timestamps: true})

let Cart = mongoose.model('Cart', CartSchema)

module.exports = Cart