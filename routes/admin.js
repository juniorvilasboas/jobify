const init = dbConnection => {
    const router = require('express').Router()

    router.get('', (req, res) => {
        res.render('admin/home')
    })
    
    router.get('/categorias', async(req, res) => {
        const db = await dbConnection
        const categorias = await db.all('select * from categorias')
    
        res.render('admin/categorias', {
            categorias
        })
    })
    
    router.get('/categorias/nova', async(req, res) => {
        const db = await dbConnection
    
        res.render('admin/nova-categoria')
    })
    
    router.post('/categorias/nova', async(req, res) => {
        const { categoria } = req.body
        const db = await dbConnection
        await db.run(`insert into categorias(categoria) values('${categoria}')`)
    
        res.redirect('/categorias')
    })
    
    router.get('/categorias/editar/:id', async(req, res) => {
        const db = await dbConnection
        const { id } = req.params
        const categoria = await db.get(`select * from categorias where id = '${id}'`)
    
        res.render('admin/editar-categoria', {
            categoria
        })
    })
    
    router.post('/categorias/editar/:id', async(req, res) => {
        const { categoria } = req.body
        const { id } = req.params
        const db = await dbConnection
        await db.get(`update categorias set categoria = '${categoria}' where id = '${id}'`)
    
        res.redirect('/categorias')
    })
    
    router.get('/categorias/delete/:id', async(req, res) => {
        const db = await dbConnection
        const { id } = req.params
        await db.run(`delete from categorias where id = '${id}';`)
    
        res.redirect('/categorias')
    })
    
    router.get('/vagas', async(req, res) => {
        const db = await dbConnection
        const vagas = await db.all('select * from vagas')
    
        res.render('admin/vagas', {
            vagas
        })
    })
    
    router.get('/vagas/nova', async(req, res) => {
        const db = await dbConnection
        const categorias = await db.all('select * from categorias')
    
        res.render('admin/nova-vaga', {
            categorias
        })
    })
    
    router.post('/vagas/nova', async(req, res) => {
        const { categoria, titulo, descricao } = req.body
        const db = await dbConnection
        await db.run(`insert into vagas(categoria, titulo, descricao)
                        values('${categoria}', '${titulo}', '${descricao}')`)
    
        res.redirect('/vagas')
    })
    
    router.get('/vagas/editar/:id', async(req, res) => {
        const db = await dbConnection
        const { id } = req.params
        const categorias = await db.all('select * from categorias')
        const vaga = await db.get(`select * from vagas where id = '${id}'`)
    
        res.render('admin/editar-vaga', {
            categorias,
            vaga
        })
    })
    
    router.post('/vagas/editar/:id', async(req, res) => {
        const { categoria, titulo, descricao } = req.body
        const { id } = req.params
        const db = await dbConnection
        await db.get(`update vagas set categoria = '${categoria}', titulo = '${titulo}', descricao = '${descricao}'
                            where id = '${id}'`)
    
        res.redirect('/vagas')
    })
    
    router.get('/vagas/delete/:id', async(req, res) => {
        const db = await dbConnection
        const { id } = req.params
        await db.run(`delete from vagas where id = '${id}';`)
    
        res.redirect('/vagas')
    })

    return router
}

module.exports = init