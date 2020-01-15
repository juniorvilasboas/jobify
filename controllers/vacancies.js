const init = db => {
    const vacancyModels = require('../models/vacancies')(db)
    const categoryModels = require('../models/categories')(db)

    const getVacancies = async(req, res) => {
        const vagas = await vacancyModels.getVacancies(db)

        res.render('admin/vagas', {
            vagas
        })
    }

    const createProcess = async(req, res) => {
        const categorias = await categoryModels.getCategories()
        if (req.method === 'GET') {
            res.render('admin/nova-vaga', {
                categorias,
                form    : {},
                errors  : []
            })
        } else {
            try {
                await vacancyModels.createVacancy(req.body)
                res.redirect('/admin/vagas')
            } catch(err) {
                console.log(err)
                res.render('admin/nova-vaga', {
                    categorias,
                    form    : req.body,
                    errors  : err.errors.fields
                })
            }
        }
    }

    const editProcess = async(req, res) => {
        const categorias = await categoryModels.getCategories()
        const vagas = await vacancyModels.getVacancyById(req.params.id)
        vaga = vagas[0]

        if (req.method === 'GET') {
            res.render('admin/editar-vaga', {
                categorias,
                form    : vaga,
                errors  : []
            })
        } else {
            try {
                await vacancyModels.editVacancy(req.params.id, req.body)
        
                res.redirect('/admin/vagas')
            } catch(err) {
                res.render('admin/editar-vaga', {
                    categorias,
                    form    : req.body,
                    errors  : err.errors.fields
                })
            }
        }
    }

    const deleteOne = async(req, res) => {
        await vacancyModels.deleteVacancy(req.params.id)

        res.redirect('/admin/vagas')
    }

    return {
        getVacancies,
        createProcess,
        editProcess,
        deleteOne
    }
}

module.exports = init