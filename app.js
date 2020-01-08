const init = dbConnection => {
    const express = require('express')
    const path = require('path')
    const bodyParser = require('body-parser')

    const app = express()

    app.get('/admin', (req, res, next) => {
        if(req.hostname === 'localhost') {
            next()
        } else {
            res.send('Not allowed')
        }
    })
    
    app.set('views', path.join(__dirname, 'views'))
    app.set('view engine', 'ejs')
    app.use(express.static(path.join(__dirname, 'public')))
    app.use(bodyParser.urlencoded({ extended: true }))
    
    const routes = require('./routes/index')
    
    app.use(routes(dbConnection))

    return app
}

module.exports = init