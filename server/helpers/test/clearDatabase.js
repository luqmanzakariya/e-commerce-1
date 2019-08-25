const User = require('../../models/User')
const Product = require('../../models/Product')

module.exports = function (done){
  if (process.env.NODE_ENV == 'test'){
    let clear = [User.deleteMany({}), Product.deleteMany({})]

    Promise.all(clear)
      .then(function(){
        done()
      })
      .catch(function(err){
        done(err)
      })
  }
}