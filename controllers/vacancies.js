const vacancyModels = require('../models/vacancies')
const categoryModels = require('../models/categories')

const getVacancies = db => async(req, res) => {
    const vagas = await vacancyModels.getVacancies(db)

    res.render('admin/vagas', {
        vagas
    })
}

const createForm = db => async(req, res) => {
    const categorias = await categoryModels.getCategories(db)

    res.render('admin/nova-vaga', {
        categorias
    })
}

const createProcess = db => async(req, res) => {
    await vacancyModels.createVacancy(db)(req.body)

    res.redirect('/admin/vagas')
}

const editForm = db => async(req, res) => {
    const categorias = await categoryModels.getCategories(db)
    const vagas = await vacancyModels.getVacancyById(db)(req.params.id)

    vaga = vagas[0]

    res.render('admin/editar-vaga', {
        categorias,
        vaga
    })
}

const editProcess = db => async(req, res) => {
    await vacancyModels.editVacancy(db)(req.params.id, req.body)

    res.redirect('/admin/vagas')
}

const deleteOne = db => async(req, res) => {
    await vacancyModels.deleteVacancy(db)(req.params.id)

    res.redirect('/admin/vagas')
}

module.exports = {
    getVacancies,
    createForm,
    createProcess,
    editForm,
    editProcess,
    deleteOne
}