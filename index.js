const express = require('express')
const knex = require('knex')
const knexConfig = require('./knexfile')
const db = knex(knexConfig.development)
const server = express()
const PORT = 5100

server.use(express.json())

server.post('/api/projects', (req, res) => {
  if (project.name && project.description && project.is_complete) {
    db('projects')
      .insert(project)
      .then(ids => {
        res.status(201).json(ids)
      })
      .catch(() => {
        res
          .status(500)
          .json({ error: 'Failed to insert project into database' })
      })
  } else {
    res
      .status(400)
      .json({
        error:
          'Please provide a name and description for the project as well as whether or not it has been completed.'
      })
  }
})

server.post('/api/actions', (req, res) => {
  if (action.name && action.description && action.is_completed) {
    db('actions')
      .insert(action)
      .then(ids => {
        res.status(201).json(ids)
      })
      .catch(() => {
        res.status(500).json({ error: 'Failed to insert action into database' })
      })
  } else {
    res
      .status(400)
      .json({
        error:
          'Please provide a name and description for the action and whether or not it has been completed.'
      })
  }
})

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
