const express = require("express");
const helmet = require("helmet");
const knex = require("knex");

//==================Data Table=========================//
const dbConfig = require("./knexfile");
const db = knex(dbConfig.development);
//==================Data Table=========================//

const server = express();

server.use(express.json());
server.use(helmet());

//===================End Points=======================//
server.get("/api/project", (req, res) => {
  db("projects")
    .then(project => {
      res.status(200).json(project);
    })
    .catch(err => {
      console.log("Error: ", err);
      res.status(500).json({ Error: "Cannot be retrieved" });
    });
});

server.get("/api/project/:id", (req, res) => {
  const { id } = req.params;
  db("projects")
    .select("name")
    .where({ id })
    .then(project => {
      res.status(200).json(project);
    })
    .catch(err => {
      console.log("Error: ", err);
      res.status(500).json({ Error: "Cannot retrieve with id" });
    });
});

server.post("/api/project", (req, res) => {
  const projects = req.body;

  db.insert(projects)
    .into("projects")
    .then(ids => {
      res.status(200).json(ids);
    })
    .catch(err => {
      console.log("Error: ", err);
      res.status(500).json({ Error: "Pass in correct credentials" });
    });
});

server.put("/api/project/:id", (req, res) => {
  const changes = req.body;
  const { id } = req.params;

  db("projects")
    .where({ id })
    .update(changes)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      console.log("Error: ", err);
      res.status(500).json({ Error: "Cannot update" });
    });
});

server.delete("/api/project/:id", (req, res) => {
  const { id } = req.params;

  db("projects")
    .where({ id })
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      console.log("Error: ", err);
      res.status(500).json({ Error: "Cannot delete" });
    });
});
//===================End Points=======================//

server.listen(4000, () =>
  console.log(`\n=== Web API Running on Port:4000 ===\n`)
);
