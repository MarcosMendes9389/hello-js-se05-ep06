const pessoas = [
    {id: 1, nome: 'marcos mendes',  telefone: '88888888', datadenascimento: '1989-03-09 00:00:00' },
    {id: 2, nome: 'jefferson',  telefone: '9999999', datadenascimento: '1990-05-09 00:00:00' },
    {id: 3, nome: 'icaro',  telefone: '98985282', datadenascimento: '1990-05-09 00:00:00' },
    {id: 4, nome: 'bruno',  telefone: '4417283434', datadenascimento: '190-08-06 00:00:00' },
    {id: 5, nome: 'daniele',  telefone: '968562954', datadenascimento: '1987-06-11 00:00:00' }
  ]

  exports.up = knex => knex("pessoas").insert(pessoas)

exports.down = knex => knex("pessoas").del()
  .whereIn("id", pessoas.map(e => e.id))