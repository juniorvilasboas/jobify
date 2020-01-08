const db = require('knex')({
    client: 'mysql2',
    connection: {
        host:   '127.0.0.1',
        user:   'root',
        password: '',
        database: 'jobify'
    }
})

db.on('query', query => {
    console.log('SQL: '+query.sql)
})

const port = process.env.PORT || 3000

const app = require('./app')(db)

app.listen(port, (err) => {
    if(err) {
        console.log('Não foi possível iniciar o servidor do Jobify')
    }
})