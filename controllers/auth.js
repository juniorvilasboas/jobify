const userModels = require('../models/user')

const loginForm = (req, res) => {
    res.render('auth/login')
}

const login = db => async(req, res) => {
    try {
        const user = await userModels.login(db)(req.body.email, req.body.password)
        req.session.user = user
        res.redirect('/admin')
    } catch (err) {
        res.send('Error '+err)
    }
}

const logout = (req, res) => {
    req.session.destroy(() => {

    })

    res.redirect('/')
}

module.exports = {
    loginForm,
    login,
    logout
}