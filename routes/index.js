const init = dbConnection => {
    const router = require('express').Router()

    const admin = require('./admin')
    const site = require('./site')
    
    router.use('/', site(dbConnection))
    router.use('/admin', admin(dbConnection))

    return router
}

module.exports = init