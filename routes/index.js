const init = db => {
    const router = require('express').Router()
    const auth = require('../controllers/auth')

    const admin = require('./admin/index')
    const site = require('./site')
    
    router.get('/login', auth.loginForm)
    router.post('/login', auth.login(db))
    router.get('/logout', auth.logout)

    router.use('/', site(db))
    router.use('/admin', admin(db))

    return router
}

module.exports = init