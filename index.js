// index.js
const cfg = require("./knexfile")
const knex = require("knex")(cfg.development)
const express = require("express")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const app = express()

app.use(express.static("public"))

app.use(morgan("dev"))

app.use(bodyParser.urlencoded())

app.get("/listpessoas", (req, res) => {
  knex("pessoas").select().then(ret => {
    res.send(ret)
  }).catch(err => {
    res.status(500).send(err)
    console.log(err)
  })
})

app.get("/listpessoasid/:id", (req, res) => {
    knex("pessoas").select().whereIn("id", req.params.id).then(ret => {
      res.send(ret)
    }).catch(err => {
      res.status(500).send(err)
      console.log(err)
    })
  })

  app.post("/addpessoa", (req, res) => {
    const pessoas = req.body
    knex("pessoas").insert(pessoas, "id").then(ret => {
        res.send(ret)
    }).catch(err => {
      res.status(500).send(err)
      console.log(err)
    })
  })

  app.post("/atualizarpessoa", (req, res) => {
    const id = req.body.id
    knex("pessoas").update( { nome: req.body.nome,  telefone: req.body.telefone, datadenascimento: req.body.datadenascimento })
    .where({ id })
      .then(ret => {
        console.log(ret)
        res.status(200).send(`<p>${ret}</p>`)
    }).catch(err => {
      res.status(500).send(err)
      console.log(err)
    })
  })

  app.get("/apagarpessoa/:id", (req, res) => {
    const id = req.params.id
    knex("pessoas").del().where({id}).then(ret => {
        res.send(ret)
    }).catch(err => {
      res.status(500).send(err)
      console.log(err)
    })
  })

knex.migrate.latest().then(_ =>
  app.listen(3000, _ =>
    console.log("server online!")))