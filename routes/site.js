const init = dbConnection => {
    const router = require('express').Router()

    router.get('/', async(req, res) => {
        const db = await dbConnection
        const categoriasDb = await db.all('select * from categorias;')
        const vagas = await db.all('select * from vagas;')
        const categorias = categoriasDb.map(cat => {
            return {
                ...cat,
                vagas: vagas.filter( vagas => vagas.categoria === cat.id )
            }
        })
    
        res.render('home', {
            categorias
        })
    })

    router.get('/vagas/:id', async(req, res) => {
        const db = await dbConnection
        const vaga = await db.get('select * from vagas where id = ' + req.params.id)
    
        res.render('vaga', {
            vaga
        })
    })

    return router
}

module.exports = init