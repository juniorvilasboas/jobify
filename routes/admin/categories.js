const init = db => {
    const router = require('express').Router()
    const categoryController = require('../../controllers/categories')(db)

    router.get('/', categoryController.getCategories)
    router.get('/nova', categoryController.createProcess)
    router.post('/nova', categoryController.createProcess)    
    router.get('/editar/:id', categoryController.editProcess)    
    router.post('/editar/:id', categoryController.editProcess)    
    router.get('/delete/:id', categoryController.deleteOne)

    return router
}

module.exports = init