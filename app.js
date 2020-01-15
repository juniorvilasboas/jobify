const init = db => {
    const express = require('express')
    const path = require('path')
    const bodyParser = require('body-parser')
    const session = require('express-session')

    const app = express()

    app.set('views', path.join(__dirname, 'views'))
    app.set('view engine', 'ejs')
    app.use(express.static(path.join(__dirname, 'public')))
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(session({
        secret  : 'MyJobifyRoles!',
        name    : 'sessionId'
    }))

    // Middleware
    app.use(async(req, res, next) => {
        const { user } = req.session

        res.locals = {
            user
        }
        next()
    })
    
    const routes = require('./routes/index')(db)
    
    app.use(routes)

    return app
}

module.exports = init