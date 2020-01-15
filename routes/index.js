const init = db => {
    const router = require('express').Router()
    const auth = require('../controllers/auth')(db)

    const admin = require('./admin/index')(db)
    const site = require('./site')(db)
    
    router.get('/login', auth.loginForm)
    router.post('/login', auth.login)
    router.get('/logout', auth.logout)

    router.use('/', site)
    router.use('/admin', admin)

    return router
}

module.exports = init