const rateLimit = require('express-rate-limit')

const apiLimiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000,
    max: 5,
    message: {
        message: 'Daily email limit reached'
    }
})

module.exports = apiLimiter
