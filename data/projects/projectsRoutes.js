const express = require("express");
const route = express.Router();
const db = require("../dbConfig");

route.get("/", async (req, res) => {
  try {
    const projects = await db("projects");
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: "Could not retrieve projects data." });
  }
});

route.get("/:id", async (req, res) => {
  const { id } = req.params;
  const project = await db("projects")
    .where({ id })
    .first();

  try {
    !project
      ? res
          .status(404)
          .json({ error: "A project with that ID does not exist." })
      : res.json({ project });
  } catch (err) {
    res.status(500).json({ error: "Could not retrieve the project data." });
  }
});

route.post("/", async (req, res) => {
  const project = req.body;
  try {
    await db("projects").insert(project);
    res.json({ message: "A new project has been created" });
  } catch (err) {
    res.status(500).json({ error: "Could not create a new project." });
  }
});

route.put("/:id", async (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  try {
    const project = await db("projects")
      .where({ id })
      .first();

    !project
      ? res
          .status(404)
          .json({ error: "A project with that ID does not exist." })
      : await db("projects").where({ id }.update(changes));

    res.json(project);
  } catch (err) {
    res.status(500).json({ error: "Could not update the project." });
  }
});

route.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const project = await db("projects")
      .where({ id })
      .first();
    !project
      ? res
          .status(404)
          .json({ error: "The project with this id does not exist." })
      : await db("projects")
          .where({ id })
          .del();

    res.json({ message: "The project has been deleted." });
  } catch (err) {
    res.status(500).json({ error: "Unable to delete the project." });
  }
});

module.exports = route;
