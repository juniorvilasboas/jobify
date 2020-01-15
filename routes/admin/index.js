const init = db => {
    const router = require('express').Router()
    const category = require('./categories')(db)
    const vacancie = require('./vacancies')(db)
    
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

    router.use('/categorias', category)
    router.use('/vagas', vacancie)

    return router
}

module.exports = init