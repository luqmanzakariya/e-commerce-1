const Product = require('../models/Product')
const User = require('../models/User')
const Cart = require('../models/Cart')

class CartController {
  static myCarts (req, res, next){
    console.log('masuk controller cart myCarts')
    Cart.find(
      {UserId:req.decode._id, status:'ordered'}
    ).populate('product')
      .then((carts)=>{
        res.status(200).json(carts)
      })
      .then(next)
  }

  static orderStatus (req, res, next){
    console.log('masuk controller cart orderStatus')
    Cart.find(
      {UserId:req.decode._id, $or:[ {'status':'purchased'}, {'status':'delivered'}]}
    ).populate('product')
      .then((carts)=>{
        res.status(200).json(carts)
      })
      .then(next)
  }

  static allOrder (req,res,next){
    Cart.find().populate('product').populate('UserId')
      .then((products)=>{
        res.status(200).json(products)
      })
      .catch(next)
  }

  static create (req, res, next){
    // console.log('masuk controller cart create',req.params.id)
    // let UserId = req.decode._id
    // console.log('ini req body', req.body)
    // console.log('ini body', req.body.product)
    Product.findOne({ _id: req.params.id})
      .then((product)=>{
        console.log(product)
        if(product.stock - req.body.quantity < 0){
          throw {
            code: 400,
            message: `Sorry,${product.name} is out of stock`
          }
        }
        return Cart.findOne({
          
          product : req.body.product,
          status: 'ordered'
        })
      })
      .then((found)=>{
        if(found){

          Cart.update({_id: found._id}, {$inc: { quantity: req.body.quantity }})
          .then(updated =>{
              res.status(201).json(updated)
          })
        }else{
          let input = {
            status: 'ordered',
            UserId: req.decode._id,
            product: req.body.product,
            quantity: req.body.quantity,
        }

        Cart.create(input)
            .then((newCart)=>{
              res.status(201).json(newCart)
            })
            .catch(next)
        }
      })
      .catch(next)
  }

  static delete(req,res,next){
    console.log('masuk controller cart delete')
    Cart.deleteOne({
      _id: req.params.id
    })
      .then((data)=>{
        res.status(200).json(data)
      })
      .catch(next)
  }

  static checkout(req,res,next){
    console.log('masuk controller cart checkout')
    let arr = []
    for (let i=0; i<req.body.length; i++){
      arr.push(Product.findOne({_id: req.body[i].product._id}))
    }
    return Promise.all(arr)
      .then((data)=>{
        let arr2 = []
        for (let i=0; i<data.length; i++){
          data[i].stock -= req.body[i].quantity 
          arr2.push(data[i].save())
        }
        return Promise.all(arr2)
          .then((result)=>{
            return Cart.update({UserId:req.decode._id, status:'ordered'}, {"$set":{"status": 'purchased'}}, { multi: true })
          })
          .then((result)=>{
            res.status(200).json(result)
          })

      })
  }

  static received(req,res,next){
    console.log('masuk controller cart received', req.params.id)
    Cart.updateOne({
      _id: req.params.id
    }, {status:'delivered'})
      .then((updated)=>{
        res.status(200).json(updated)
      })
      .catch(next)
  }
}

module.exports = CartController