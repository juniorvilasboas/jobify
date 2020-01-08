const init = db => {
    const router = require('express').Router()

    router.get('/', async(req, res) => {
        const categorias = await db('categories').select('*')
    
        res.render('admin/categorias', {
            categorias
        })
    })
    
    router.get('/nova', async(req, res) => {
    
        res.render('admin/nova-categoria')
    })
    
    router.post('/nova', async(req, res) => {
        await db('categories').insert(req.body)
    
        res.redirect('/admin/categorias')
    })
    
    router.get('/editar/:id', async(req, res) => {
        const { id } = req.params
        const categorias = await db('categories')
                                .select('*')
                                .where({ id: id })

        categoria = categorias[0]

        res.render('admin/editar-categoria', {
            categoria
        })
    })
    
    router.post('/editar/:id', async(req, res) => {
        const { id } = req.params
        await db('categories')
                .where({ id: id })
                .update(req.body)
    
        res.redirect('/admin/categorias')
    })
    
    router.get('/delete/:id', async(req, res) => {
        const { id } = req.params
        await db('categories')
                .where({ id: id })
                .del()
    
        res.redirect('/admin/categorias')
    })

    return router
}

module.exports = init