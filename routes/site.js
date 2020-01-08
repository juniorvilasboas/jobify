const init = db => {
    const router = require('express').Router()

    router.get('/', async(req, res) => {
        const categoriasDb = await db('categories').select('*')
        const vagas = await db('vacancies').select('*')
        const categorias = categoriasDb.map(cat => {
            return {
                ...cat,
                vagas: vagas.filter( vagas => vagas.category_id === cat.id )
            }
        })
    
        res.render('home', {
            categorias
        })
    })

    router.get('/vagas/:id', async(req, res) => {
        const vagas = await db('vacancies')
                            .select('*')
                            .where({ id: req.params.id })
    
        vaga = vagas[0]
        res.render('vaga', {
            vaga
        })
    })

    return router
}

module.exports = init