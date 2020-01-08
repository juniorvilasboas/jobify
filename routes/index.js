const init = db => {
    const router = require('express').Router()

    const admin = require('./admin/index')
    const site = require('./site')
    
    router.use('/', site(db))
    router.use('/admin', admin(db))

    return router
}

module.exports = init