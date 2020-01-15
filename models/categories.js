const init = db => {
    
    const Joi = require('@hapi/joi')
    const validation = require('../utils/validation')

    const createSchema = Joi.object().keys({
        description : Joi.string().min(5).required()
    })

    const getCategories = () => {
        const categories = db('categories').select('*')
        
        return categories
    }

    const getCategoryById = async(id) => {
        const category = await db('categories')
                                .select('*')
                                .where({ id: id })
        
        return category
    }

    const createCategory = async(data) => {
        const value = validation.validate(data, createSchema)
        await db('categories').insert(value)
        
        return true
    }

    const editCategory = async(id, data) => {
        const value = validation.validate(data, createSchema)
        await db('categories')
                .where({ id: id })
                .update(value)
    }

    const deleteCategory = async(id) => {
        await db('categories')
                .where({ id: id })
                .del()
    }

    return {
        getCategories,
        createCategory,
        getCategoryById,
        editCategory,
        deleteCategory
    }
}

module.exports = init