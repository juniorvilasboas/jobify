const init = db => {
    const Joi = require('@hapi/joi')
    const validation = require('../utils/validation')

    const craeteSchema = Joi.object().keys({
        title       : Joi.string().min(5).max(245).required(),
        description : Joi.string().min(5).required(),
        category_id : Joi.number().integer().required()
    })

    const getVacancies = () => {
        const vacancies = db({vacancy: 'vacancies', category: 'categories'})
                            .select({
                                id          : 'vacancy.id',
                                title       : 'vacancy.title',
                                description : 'vacancy.description',
                                category    : 'category.description'
                            })
                            .whereRaw( '?? = ??', ['category.id', 'vacancy.category_id'])

        return vacancies
    }

    const getVacancyById = async(id) => {
        const vacancy = await db('vacancies').select('*').where({ id: id })

        return vacancy
    }

    const createVacancy = async(data) => {
        const value = validation.validate(data, craeteSchema)

        await db('vacancies').insert(value)
        return true
    }

    const editVacancy = async(id, data) => {
        const value = validation.validate(data, craeteSchema)

        await db('vacancies')
                .where({ id: id })
                .update(value)

        return true
    }

    const deleteVacancy = async(id) => {
        await db('vacancies').where({ id: id }).del()
    }

    return {
        getVacancies,
        getVacancyById,
        createVacancy,
        editVacancy,
        deleteVacancy
    }
}

module.exports = init