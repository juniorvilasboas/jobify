const getCategories = db => {
    const categories = db('categories').select('*')

    return categories
}

const getCategoryById = db => async(id) => {
    const category = await db('categories')
                            .select('*')
                            .where({ id: id })

    return category
}

const createCategory = db => async(data) => {
    await db('categories').insert(data)
}

const editCategory = db => async(id, data) => {
    await db('categories')
            .where({ id: id })
            .update(data)
}

const deleteCategory = db => async(id) => {
    await db('categories')
            .where({ id: id })
            .del()
}

module.exports = {
    getCategories,
    createCategory,
    getCategoryById,
    editCategory,
    deleteCategory
}