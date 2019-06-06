const router = require("express").Router();
const knex = require("knex");
const knexConfig = require("../knexfile");

const database = knex(knexConfig.development);

router.get("/", (req, res) => {
  database("cohorts")
    .then(cohort => res.status(200).json(cohort))
    .catch(err => res.status(500).json({ success: false, err }));
});

router.get("/:id", (req, res) => {
  database("cohorts")
    .where({ id: req.params.id })
    .then(cohort => {
      if (cohort) {
        res.status(200).json(cohort);
      } else {
        res.status(404).json({ message: "That cohort not there brah" });
      }
    })
    .catch(err => res.status(500).json(err));
});

router.get("/:id/students", (req, res) => {
  database("students")
    .where({ id: req.params.id })
    .then(student => {
      if (student) {
        res.status(200).json(student);
      } else {
        res.status(404).json({ message: "That student not there brah" });
      }
    })
    .catch(err => res.status(500).json(err));
});

router.post("/", (req, res) => {
  database("cohorts")
    .insert(req.body, "id")
    .then(ids => res.status(201).json(ids))
    .catch(err => {
      res.status(500).json({ success: false, err });
    });
});

router.put("/:id", (req, res) => {
  database("cohorts")
    .where({ id: req.params.id })
    .update(req.body)
    .then(cohortUpdated => {
      if (cohortUpdated > 0) {
        res.status(202).json(cohortUpdated);
      } else {
        res.status(404).json({ message: "Wow, you dun goofed again!" });
      }
    })
    .catch(err => res.status(500).json({ success: false, err }));
});

router.delete("/:id", (req, res) => {
  database("cohorts")
    .where({ id: req.params.id })
    .del()
    .then(cohortDeleted => {
      if (cohortDeleted > 0) {
        res.status(204).json(cohortDeleted);
      } else {
        res
          .status(404)
          .json({ message: "Welp, can't even delete something...sad" });
      }
    })
    .catch(err => res.status(500).json({ success: false, err }));
});

module.exports = router;
