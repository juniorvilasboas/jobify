const bcrypt = require('bcryptjs')

const generatePassHash = password => {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    return hash
}

const login = db => async(email, password) => {
    const user = await db('users')
                        .select('*')
                        .where('email', email)

    if (user.leght === 0) {
        throw new Error('Invalid user.')
    }

    if (!bcrypt.compareSync(password, user[0].password)) {
        throw new Error('Invalid password.')
    }

    return user[0]
}

module.exports = {
    initialUser,
    login
}