const router = require('express').Router()
const ProductController = require('../controllers/ProductController')
const {authentication} = require('../middlewares/authentication')
const {authorization} = require('../middlewares/authorization')
const file = require('../helpers/file')

router.get('/findAll', ProductController.findAll)
router.get('/product/:id', ProductController.findDetail)
router.use(authentication)
router.post('/create', file.multer.single('file'), file.sendUploadToGCS, ProductController.create)
router.patch('/:id', authorization, file.multer.single('file'), file.sendUploadToGCS, ProductController.edit)
router.delete('/:id', authorization, ProductController.delete)

module.exports = router