const sqlite = require('sqlite')

const path = require('path')
const port = process.env.PORT || 3000
const dbConnection = sqlite.open(path.resolve(__dirname, 'banco.sqlite'), { Promise })

const app = require('./app')(dbConnection)

const init = async() => {
    const db = await dbConnection
    await db.run('create table if not exists categorias(id INTEGER PRIMARY KEY, categoria TEXT);')
    await db.run('create table if not exists vagas(id INTEGER PRIMARY KEY, categoria INTEGER, titulo TEXT, descricao TEXT);')
    const categoria = 1
    const titulo = "Fullstack Developer (remote)"
    const descricao = "Vaga para fullstack developer que fez o Fullstack Lab"
    //await db.run(`insert into categorias(categoria) values('${categoria}')`)
    await db.run(`insert into vagas(categoria, titulo, descricao)
                    values('${categoria}', '${titulo}', '${descricao}')`)
}

//init()

app.listen(port, (err) => {
    if(err) {
        console.log('Não foi possível iniciar o servidor do Jobify')
    }
})