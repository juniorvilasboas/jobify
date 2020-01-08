const getVacancies = db => {
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

const getVacancyById = db => async(id) => {
    const vacancy = await db('vacancies').select('*').where({ id: id })

    return vacancy
}

const createVacancy = db => async(data) => {
    await db('vacancies').insert(data)
}

const editVacancy = db => async(id, data) => {
    await db('vacancies')
            .where({ id: id })
            .update(data)
}

const deleteVacancy = db => async(id) => {
    await db('vacancies').where({ id: id }).del()
}

module.exports = {
    getVacancies,
    getVacancyById,
    createVacancy,
    editVacancy,
    deleteVacancy
}