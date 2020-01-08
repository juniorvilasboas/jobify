const init = db => {
    const router = require('express').Router()

    router.get('/', async(req, res) => {
        const vagas = await db('vacancies')
                            .select('*')
    
        res.render('admin/vagas', {
            vagas
        })
    })
    
    router.get('/nova', async(req, res) => {
        const categorias = await db('categories')
                                    .select('*')
    
        res.render('admin/nova-vaga', {
            categorias
        })
    })
    
    router.post('/nova', async(req, res) => {
        await db('vacancies').insert(req.body)
    
        res.redirect('/admin/vagas')
    })
    
    router.get('/editar/:id', async(req, res) => {
        const { id } = req.params
        const categorias = await db('categories').select('*')
        const vagas = await db('vacancies').select('*').where({ id: id })

        vaga = vagas[0]
    
        res.render('admin/editar-vaga', {
            categorias,
            vaga
        })
    })
    
    router.post('/editar/:id', async(req, res) => {
        const { id } = req.params
        await db('vacancies').where({ id: id }).update(req.body)
    
        res.redirect('/admin/vagas')
    })
    
    router.get('/delete/:id', async(req, res) => {
        const { id } = req.params
        await db('vacancies').where({ id: id }).del()
    
        res.redirect('/admin/vagas')
    })

    return router
}

module.exports = init