const express = require('express')
const mysql = require('mysql')

const app = express()
const port = 8080

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
}

app.get('/', (req, res) => {
  const connection = mysql.createConnection(config)
  connection.query("SELECT * FROM people", (err, result, fields) => {
    const resultList = result
      .map(r => `<h2>${r.id} - ${r.name}</h2>`)
      .reduce((acc, val) => acc += val, "")
    res.send(resultList)
  }).on('error', err => {
    res.send('<h2>Error</h2>')
  });

  connection.end();
})

app.post('/:name', (req, res) => {
  const { name } = req.params

  const connection = mysql.createConnection(config)

  const sql = `insert into people(name) values ('${name}')`
  connection.query(sql)

  connection.end()

  res.send(`<h1>Usuário ${name} cadastrado!</h1>`)
})

app.listen(port, () => {
  console.log("Running! Port: " + port)
})