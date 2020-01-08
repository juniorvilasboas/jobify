const init = db => {
    const router = require('express').Router()
    const vacancieController = require('../../controllers/vacancies')

    router.get('/', vacancieController.getVacancies(db))    
    router.get('/nova', vacancieController.createForm(db))    
    router.post('/nova', vacancieController.createProcess(db))    
    router.get('/editar/:id', vacancieController.editForm(db))    
    router.post('/editar/:id', vacancieController.editProcess(db))    
    router.get('/delete/:id', vacancieController.deleteOne(db))

    return router
}

module.exports = init