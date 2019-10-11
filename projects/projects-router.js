const router = require('express').Router();
const Projects = require('./projects-model.js');

router.get('/', (req,res) => {
    Projects.get()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({error: `error getting projects! `})
        })
})

router.get('/:id', (req,res) => {
    const {id} = req.params
    Projects.getById(id)
        .then(project => {
            if(project){
                res.status(200).json(project);
            }
            else{
                res.status(404).json({message: `error retrieving the project.`})
            }
        })
})

module.exports = router;