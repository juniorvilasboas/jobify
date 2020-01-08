const init = db => {
    const router = require('express').Router()
    const categoryController = require('../../controllers/categories')

    router.get('/', categoryController.getCategories(db))
    router.get('/nova', categoryController.createForm)
    router.post('/nova', categoryController.createProcess(db))    
    router.get('/editar/:id', categoryController.editForm(db))    
    router.post('/editar/:id', categoryController.editProcess(db))    
    router.get('/delete/:id', categoryController.deleteOne(db))

    return router
}

module.exports = init