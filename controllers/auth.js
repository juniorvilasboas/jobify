const init = db => {
    const userModels = require('../models/user')(db)

    const loginForm = (req, res) => {
        res.render('auth/login')
    }

    const login = async(req, res) => {
        try {
            const user = await userModels.login(req.body.email, req.body.password)
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

    return {
        loginForm,
        login,
        logout
    }
}

module.exports = init