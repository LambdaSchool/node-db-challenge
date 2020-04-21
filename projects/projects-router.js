
const express = require('express');

const projects = require('./projects-model.js');

const router = express.Router();
// const db = require('../data/db-config.js');

// /api/projects
// retrieving a list of projects
router.get('/', (req, res) => {
  projects.find()
    .then((projectList) => {
      res.json(projectList);
    })
    .catch((err) => {
      res.status(500).json({ message: 'Failed to get projectList', error: err });
    });
});

// returns the project with a specific id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  projects.findById(id)
    .then((project) => {
      if (!project === []) {
        res.status(404).json({ message: 'Could not find project with given id.' });
      } else {
        res.status(200).json(project);
      }
    })
    .catch((err) => {
      res.status(500).json({ message: 'Failed to get project', error: err });
    });
});

// add a new project
// req body shape ==>
//  {
//  "project_name": "",
//  "project_description": " ",
//  "completed": true
//  }
router.post('/', (req, res) => {
  const projectData = req.body;

  projects.addProject(projectData)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch(() => {
      res.status(500).json({ message: 'Failed to create new project' });
    });
});

// returns the list of resources for a specific project
router.get('/:id/resources', (req, res) => {
  const { id } = req.params;
  projects.findProjectResources(id)
    .then((resource) => {
      if (!resource === []) {
        res.status(404).json({ message: 'Could not find resource with given id.' });
      } else {
        res.status(200).json(resource);
      }
    })
    .catch((err) => {
      res.status(500).json({ message: 'problem with the db', error: err });
    });
});

router.get('/:id/tasks', (req, res) => {
  const { id } = req.params;
  projects.findProjectTasks(id)
    .then((tasks) => {
      if (!tasks === []) {
        res.status(404).json({ message: 'Could not find task with given id.' });
      } else {
        res.status(200).json(tasks);
      }
    })
    .catch((err) => {
      res.status(500).json({ message: 'problem with the db', error: err });
    });
});

// updates a given PROJECT
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  projects.findById(id)
    .then((project) => {
      if (project) {
        projects.update(changes, id)
          .then((updatedproject) => {
            res.json(updatedproject);
          });
      } else {
        res.status(404).json({ message: 'Could not find project with given id' });
      }
    })
    .catch(() => {
      res.status(500).json({ message: 'Failed to update project' });
    });
});

// removes a given PROJECT
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  projects.remove(id)
    .then((deleted) => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res.status(404).json({ message: 'Could not find project with given id' });
      }
    })
    .catch(() => {
      res.status(500).json({ message: 'Failed to delete project' });
    });
});


// adds a new resource but not under the project, in the general list of resoureces :(
// router.post('/:id/addresources', (req, res) => {
//   const stepData = req.body;
//   const { id } = req.params;

//   projects.findById(id)
//     .then((scheme) => {
//       if (scheme) {
//         projects.addResources(stepData, id)
//           .then((step) => {
//             res.status(201).json(step);
//           });
//       } else {
//         res.status(404).json({ message: 'Could not find scheme with given id.' });
//       }
//     })
//     .catch(() => {
//       res.status(500).json({ message: 'Failed to create new step' });
//     });
// });

module.exports = router;
