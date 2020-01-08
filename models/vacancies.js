const getVacancies = db => {
    const vacancies = db('vacancies')
                        .select('*')

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