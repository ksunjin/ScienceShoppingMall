const express = require('express');
const router = express.Router();
const multer = require('multer');
const { admin } = require('../middleware/admin');
const { Product } = require('../models/Product');
const { auth } = require('../middleware/auth');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})

var upload = multer({ storage: storage }).single("file")

router.post('/image', (req, res) => {

    upload(req, res, err => {
        if (err) {
            return req.json({ success: false, err })
        }
        return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
    })

})


router.post('/', auth, admin, (req, res) => {

    const product = new Product(req.body)

    product.save((err) => {
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true })
    })

})

router.post('/products', (req, res) => {

    let limit = req.body.limit ? parseInt(req.body.limit) : 20;
    let skip = req.body.skip ? parseInt(req.body.skip) : 0;
    let word = req.body.searchWord

    if (word) {
        Product.find()
            .find({ $text: { $search: word } })
            .populate("writer")
            .skip(skip)
            .limit(limit)
            .exec((err, productInfo) => {
                if (err) return res.status(400).json({ success: false, err })
                return res.status(200).json({
                    success: true, productInfo,
                    PostSize: productInfo.length
                })
            })
    } else {
        Product.find()
            .populate("writer")
            .skip(skip)
            .limit(limit)
            .exec((err, productInfo) => {
                if (err) return res.status(400).json({ success: false, err })
                return res.status(200).json({
                    success: true, productInfo,
                    PostSize: productInfo.length
                })
            })
    }
})

router.get('/products_by_id', (req, res) => {

    let type = req.query.type
    let productIds = req.query.id

    if (type === 'array') {
        let ids = req.query.id.split(',')
        productIds = ids.map(item => {
            return item
        })
    }

    Product.find({ _id: { $in: productIds } })
        .populate('writer')
        .exec((err, product) => {
            if (err) return res.status(400).json({ success: false, err })
            return res.status(200).send(product)
        })
})


module.exports = router;