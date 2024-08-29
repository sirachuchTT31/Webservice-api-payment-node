const { check } = require('express-validator');

const creditValidate = [
    // check('transactionId')
    //     .trim()
    //     .not()
    //     .isEmpty()
    //     .withMessage('transactionId can not be empty!'),

    // check('price')
    //     .trim()
    //     .not()
    //     .isEmpty()
    //     .isFloat()
    //     .withMessage("price can not be empty!")
]

module.exports = {
    creditValidate
}