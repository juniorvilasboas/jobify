const categoryModels = require('../models/categories')

const getCategories = db => async(req, res) => {
    const categorias = await categoryModels.getCategories(db)

    res.render('admin/categorias', {
        categorias
    })
}

const createForm = (req, res) => {
    res.render('admin/nova-categoria')
}

const createProcess = db => async(req, res) => {
    await categoryModels.createCategory(db)(req.body)

    res.redirect('/admin/categorias')
}

const editForm = db => async(req, res) => {
    const categorias = await categoryModels.getCategoryById(db)(req.params.id)

    categoria = categorias[0]

    res.render('admin/editar-categoria', {
        categoria
    })
}

const editProcess = db => async(req, res) => {
    await categoryModels.editCategory(db)(req.params.id, req.body)

    res.redirect('/admin/categorias')
}

const deleteOne = db => async(req, res) => {
    await categoryModels.deleteCategory(db)(req.params.id)

    res.redirect('/admin/categorias')
}

module.exports = {
    getCategories,
    createForm,
    createProcess,
    editForm,
    editProcess,
    deleteOne
}