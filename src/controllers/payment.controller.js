const { DatabaseSDK } = require('database-sdk');
const { validationResult } = require('express-validator')
const { Config } = require('../constant/Config')
const axios = require('axios');
var omise = require('omise')({
    publicKey: Config.Payment.OMISE_PUBLIC_KEY,
    secretKey: Config.Payment.OMISE_SECRET_KEY,
    omiseVersion: '2019-05-29'
})
exports.credit = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                statusCode: 400,
                message: "Bad Request",
                errors: errors.array(),
            });
        }
        const { amount, name, email } = req.body;
        // #### fixed token ####
        const urlEncoded = new URLSearchParams();
        urlEncoded.append('card[name]', 'Somchai Prasert');
        urlEncoded.append('card[city]', 'Bangkok');
        urlEncoded.append('card[postal_code]', '10320');
        urlEncoded.append('card[number]', '4242424242424242');
        urlEncoded.append('card[security_code]', '123');
        urlEncoded.append('card[expiration_month]', '12');
        urlEncoded.append('card[expiration_year]', '2025');
        const basicAuthentication = {
            auth: {
                username: Config.Payment.OMISE_PUBLIC_KEY,
                password: ''
            }
        }
        //Send PublicKey for get token Omise
        const { data } = await axios.post(Config.Payment.OMISE_ENDPOINT_TOKEN, urlEncoded, { auth: basicAuthentication.auth, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
        if (data.object === 'token') {
            //Verify customer
            const omiseCustomer = await omise.customers.create({
                email: email,
                description: name,
                card: data.id
            });
            //Transaction payment
            const charge = await omise.charges.create({
                amount: amount,
                currency: "thb",
                customer: omiseCustomer.id
            });

            return res.status(200).json({
                statusCode: 200,
                result: {
                    amount: charge.amount,
                    omiseStatus: charge.status
                }
            })
        }
        return res.status(401).json({
            statusCode: 401,
            message: "Unauthorized"
        })
    }
    catch (err) {
        res.status(500).json(err)
        console.log(`error : ${JSON.stringify(err)}`)
    }
}

exports.promtpay = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                statusCode: 400,
                message: "Bad Request",
                errors: errors.array(),
            });
        }
        const { amount, name, email } = req.body;
        // #### fixed token ####
        const urlEncoded = new URLSearchParams();
        urlEncoded.append('card[name]', 'Somchai Prasert');
        urlEncoded.append('card[city]', 'Bangkok');
        urlEncoded.append('card[postal_code]', '10320');
        urlEncoded.append('card[number]', '4242424242424242');
        urlEncoded.append('card[security_code]', '123');
        urlEncoded.append('card[expiration_month]', '12');
        urlEncoded.append('card[expiration_year]', '2025');
        const basicAuthentication = {
            auth: {
                username: Config.Payment.OMISE_PUBLIC_KEY,
                password: ''
            }
        }
        //Send PublicKey for get token Omise
        const { data } = await axios.post(Config.Payment.OMISE_ENDPOINT_TOKEN, urlEncoded, { auth: basicAuthentication.auth, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
        if (data.object === 'token') {
            //Verify customer
            const omiseCustomer = await omise.customers.create({
                email: email,
                description: name,
                card: data.id
            });
            //Transaction payment
            const charge = await omise.charges.create({
                amount: amount,
                currency: "thb",
                customer: omiseCustomer.id,
                source: {
                    type: "promptpay"
                }
            });

            return res.status(200).json({
                statusCode: 200,
                result: {
                    type: charge.source.type,
                    amount: charge.amount,
                    omiseStatus: charge.status,
                    qrCode: charge.source.scannable_code.image.download_uri
                }
            })
        }
        return res.status(401).json({
            statusCode: 401,
            message: "Unauthorized"
        })
    }
    catch (e) {
        res.status(500).json(err)
        console.log(`error : ${JSON.stringify(err)}`)
    }
}