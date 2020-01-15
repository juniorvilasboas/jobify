const init = db => {
    const router = require('express').Router()
    const vacancieController = require('../../controllers/vacancies')(db)

    router.get('/', vacancieController.getVacancies)
    router.get('/nova', vacancieController.createProcess)
    router.post('/nova', vacancieController.createProcess)
    router.get('/editar/:id', vacancieController.editProcess)
    router.post('/editar/:id', vacancieController.editProcess)
    router.get('/delete/:id', vacancieController.deleteOne)

    return router
}

module.exports = init