const db = require('knex')({
    client: 'mysql2',
    connection: {
        host:   'database.000webhost.com',
        user:   'junior.vilasboas@gmail.com',
        password: '220782@jr#',
        database: 'id12030384_jobify'
    }
})

db.on('query', query => {
    console.log('SQL: '+query.sql)
})

const port = process.env.PORT || 3000

const app = require('./app')(db)
const user = require('./models/user')

app.listen(port, (err) => {
    if(err) {
        console.log('Não foi possível iniciar o servidor do Jobify')
    }
})