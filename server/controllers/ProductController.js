const Product = require('../models/Product')
const { Storage } = require('@google-cloud/storage')
const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT,
  keyFilename: process.env.KEYFILE_PATH
})

class ProductController {
  static create(req, res, next){
    console.log('masuk controller product create')
    let {name, description, price, stock} = req.body
    let fileUrl = req.file.cloudStoragePublicUrl
    
    Product.create({name, description, fileUrl, price, stock})
      .then((product)=>{
        res.status(201).json(product)
      })
      .catch(next)
  }

  static findAll (req, res, next){
    console.log('masuk controller product find all')
    Product.find({})
      .then((products)=>{
        res.status(200).json(products)
      })
      .catch(next)
  }

  static findDetail (req,res,next){
    console.log('masuk controller product find detail')
    Product.findOne({
      _id: req.params.id
    })
      .then((product)=>{
        // console.log(product)
        res.status(200).json(product)
      })
      .catch(next)
  }

  static edit (req,res,next){
    console.log('masuk controller product edit', req.params.id)
    let input = {}
    req.body.name && (input.name = req.body.name)
    req.body.description && (input.description = req.body.description)
    req.body.price && (input.price = req.body.price)
    req.body.stock && (input.stock = req.body.stock)
    req.file && (input.fileUrl = req.file.cloudStoragePublicUrl)
    Product.updateOne({ _id: req.params.id}, input)
      .then((data)=>{
        res.status(200).json(data)
      })
      .catch(next)
  }

  static async delete(req, res, next) {
    console.log('masuk controller product delete', req.params.id)
    Product.deleteOne({
      _id: req.params.id
    })
      .then((product)=>{
        res.status(200).json(product)
      })
      .catch(next)
  }
}

module.exports = ProductController