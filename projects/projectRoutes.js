const express = require('express');
const projects = require('./projectModels');
const actions = require('../actions/actionModels');
const router = express.Router();
const errHelper = (status, message, res) => {
  console.log('Error.')
  res.status(status).json({ Error: message });
}

router.route('/')
  .get((req, res) => {
    projects.get()
      .then(projects => res.status(200).json(projects))
      .catch(err => errHelper(500, 'Error getting projects.', res))
  })
  .post((req, res) => {
    const project = req.body
    projects.insert(project)
      .then(project => res.status(201).json(project))
      .catch(err => errHelper(500, 'Error adding projects.', res))
  })

router.route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    projects.getById(id)
      .then(project => {
        if(!project || project < 1) {
          return errHelper(404, 'No records found.', res);
        } else {
          actions.get()
          .where('project_id', id)
          .then(actions => res.status(200).json({...project, actions:actions}))
        }
      })
      .catch(err => errHelper(500, 'Error getting project with actions.', res))
  })


module.exports = router;

// router.route('/:id')
//   .get((req, res) => {
//     const { id } = req.params;
//     projects.get()
//       .then(project => {
//         if(!project || project < 1) {
//           return errHelper(404, 'No records found.', res);
//         } else {
//           res.status(200).json(project)
//         }
//         actions.get()
//         .where({project_id: id })
//         .then(actions => res.status(200).json({...project, actions:actions}))
//       })
//       .catch(err => errHelper(500, 'Error getting project.', res))
//   })