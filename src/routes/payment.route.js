const paymentController = require('../controllers/payment.controller');
const { creditValidate } = require('../validate/payment.validate')

var router = require('express').Router();

router.post("/credit",
    [
        creditValidate
    ],
    paymentController.credit
);

router.post('/promptpay', [], paymentController.promtpay);


module.exports = router;

