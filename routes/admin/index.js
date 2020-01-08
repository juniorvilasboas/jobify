const init = db => {
    const router = require('express').Router()
    const category = require('./categories')
    const vacancie = require('./vacancies')
    
    router.use((req, res, next) => {
        if (req.session.user) {
            next()
        } else {
            res.redirect('/login')
        }
    })

    router.get('/', (req, res) => {
        res.render('admin/home')
    })

    router.use('/categorias', category(db))
    router.use('/vagas', vacancie(db))

    return router
}

module.exports = init