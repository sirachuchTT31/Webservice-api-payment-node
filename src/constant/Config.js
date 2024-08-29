require('dotenv').config()

module.exports = {
    Config: {
        Payment: {
            OMISE_PUBLIC_KEY: process.env.OMISE_PUBLIC_KEY,
            OMISE_SECRET_KEY: process.env.OMISE_SECRET_KEY,
            OMISE_ENDPOINT_TOKEN: process.env.OMISE_ENDPOINT_TOKEN
        }
    }
}