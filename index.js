const db = require('knex')({
    client: 'mysql2',
    connection: {
        host:   'https://databases-auth.000webhost.com/db_structure.php?server=1&db=id12030384_jobify',
        user:   'id12030384_serveware',
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