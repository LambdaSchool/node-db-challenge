const db = require('../data/db-config.js');

// Get all projects
function find() {
  return db('projects');
}

// Add a projects
function add(projectsData) {
  return db('projects').insert(projectsData);
}

// Find Project by ID
function findById(id) {
  return db('projects')
    .where({ id })
    .first();
}

// Get resource for project
function findResources(id){
  return db('resources')
}

// Get task
function findTask(id){
  return db('tasks as t')
    .join('projects as p', 'p.id', 't.project_id')
    .select('t.id', 'p.name', 't.description')
    .where({project_id: id})
}

// Add tasks
function addTask(taskData) {
  return db('tasks').insert(taskData)
  .then(ids => {
    const [ id ] = ids;
    return findById(id);
  })
}

// Add resource
function addResources(resourcesData) {
  return db('resources').insert(resourcesData)
  .then(ids => {
    const [ id ] = ids;
    return findById(id);
  })
}

// Delete Project
function remove(id) {
  return db('projects').where({ id }).del();
}

module.exports = {
  find,
  add,
  findResources,
  remove, 
  findById,
  addResources,
  findTask, 
  addTask
}