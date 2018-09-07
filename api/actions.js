const router = require('express').Router();
const db = require('knex')(require('../knexfile').development);

router.get('/', (req, res) => {
  db('actions')
    .then(actions => res.status(200).json(actions))
    .catch(err => res.status(500).json(err));
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  db('actions')
    .where({ id })
    .then(action => {
      if (action) res.status(200).json(action);
      else res.status(404).json({ error: 'The action with the specified ID wasn\'t found.' });
    })
    .catch(err => res.status(500).json(err));
});

router.post('/', (req, res) => {
  db('actions')
    .insert(req.body)
    .then(id => res.status(201).json(id))
    .catch(err => res.status(500).json(err));
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db('actions')
    .where({ id })
    .del()
    .then(count => {
      if (count) res.status(200).json(count);
      else res.status(404).json({ error: 'The action with the specified ID wasn\'t found.' });
    })
    .catch(err => res.status(500).json(err));
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  db('actions')
    .where({ id })
    .update(req.body)
    .then(count => {
      if (count) res.status(200).json(count);
      else res.status(404).json({ error: 'The action with the specified ID wasn\'t found.' });
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
