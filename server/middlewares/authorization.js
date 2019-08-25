const User = require('../models/User')


module.exports = {
  authorization(req, res, next) {
    User.findById(req.decode._id)
      .then((user) => {
        if (user.isAdmin == true) {
          next()
        }
        else {
          throw { status: 400, message: "Unauthorized" }
        }
      })
      .catch(next)
  },

}