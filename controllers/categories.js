const init = db => {
    const categoryModels = require('../models/categories')(db)
    
    const getCategories = async(req, res) => {
        const categorias = await categoryModels.getCategories()
        
        res.render('admin/categorias', {
            categorias
        })
    }

    const createProcess = async(req, res) => {
        if (req.method === 'GET') {
            res.render('admin/nova-categoria', {
                form    : {},
                errors  : []
            })
        } else {
            try {
                await categoryModels.createCategory(req.body)
                res.redirect('/admin/categorias')
            } catch(err) {
                res.render('admin/nova-categoria', {
                    form    : req.body,
                    errors  : err.errors.fields
                })
            }
        }
    }

    const editProcess = async(req, res) => {
        const categorias = await categoryModels.getCategoryById(req.params.id)
        categoria = categorias[0]
        
        if (req.method === 'GET') {
            res.render('admin/editar-categoria', {
                form: categoria,
                errors: []
            })
        } else {
            try {
                await categoryModels.editCategory(req.params.id, req.body)
                res.redirect('/admin/categorias')
            } catch(err) {
                res.render('admin/editar-categoria', {
                    form: req.body,
                    errors: err.errors.fields
                })
            }
        }
    }

    const deleteOne = async(req, res) => {
        await categoryModels.deleteCategory(req.params.id)
        
        res.redirect('/admin/categorias')
    }

    return {
        getCategories,
        createProcess,
        editProcess,
        deleteOne
    }
}

module.exports = init