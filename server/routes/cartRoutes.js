const router = require('express').Router()
const CartController = require('../controllers/CartController')
const {authentication} = require('../middlewares/authentication')

router.use(authentication)
router.get('/myCarts', CartController.myCarts)
router.get('/orderStatus', CartController.orderStatus)
router.get('/allOrder', CartController.allOrder)
router.post('/received/:id', CartController.received)
router.post('/create/:id', CartController.create)
router.delete('/:id', CartController.delete)
router.post('/checkout', CartController.checkout)

module.exports = router