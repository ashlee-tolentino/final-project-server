/*==================================================
/routes/campuses.js

It defines all the campuses-related routes.
==================================================*/
// Import Express module
const express = require('express');
// Create an Express router function called "router"
const router = express.Router();
// Import database models
const { Student, Campus } = require('../database/models');

// Import a middleware to replace "try and catch" for request handler, for a concise coding (fewer lines of code)
const ash = require('express-async-handler');

/* GET ALL CAMPUSES: async/await using "try-catch" */
// router.get('/', async (req, res, next) => {
//   try {
//     let campuses = await Campus.findAll({include: [Student]});
//     res.status(200).json(campuses);
//   } 
//   catch(err) {
//     next(err);
//   }
// });

/* GET ALL CAMPUSES */
router.get('/', ash(async(req, res) => {
  const campuses = await Campus.findAll({include: [Student]});  // Get all campuses and their associated students
  res.status(200).json(campuses);  // Status code 200 OK - request succeeded
}));

/* GET CAMPUS BY ID */
router.get('/:id', ash(async(req, res) => {
  // Find campus by Primary Key
  const campus = await Campus.findByPk(req.params.id, {include: [Student]});  // Get the campus and its associated students
  
  // If campus not found, respond with 404
    if (!campus) {
      return res.status(404).json({ error: 'Campus not found' });
    }
  
  res.status(200).json(campus);  // Status code 200 OK - request succeeded
}));

/* DELETE CAMPUS */
router.delete('/:id', ash(async(req, res) => {
  const campus = await Campus.findByPk(req.params.id);

    // If campus not found, respond with 404
    if (!campus) {
      return res.status(404).json({ error: 'Campus not found' });
    }

    await campus.destroy();
    // 204 No Content - successfully deleted, no body returned
    res.status(204).end();
}));

/* ADD NEW CAMPUS */
router.post('/', ash(async(req, res) => {
  const newCampus = await Campus.create(req.body);
  res.status(201).json(newCampus);  // Status code 201 OK - request succeeded
}));

/* EDIT CAMPUS */
router.put('/:id', ash(async(req, res) => {
  // Find campus first
    const campus = await Campus.findByPk(req.params.id);

    if (!campus) {
      return res.status(404).json({ error: 'Campus not found' });
    }

    // Update with request body; model validations still apply
    await campus.update(req.body);

    // Reload with associated students so the client gets fresh data
    const updatedCampus = await Campus.findByPk(req.params.id, {
      include: [Student],
    });

    // 200 OK - successful update
    res.status(200).json(updatedCampus);
}))

/* REMOVE A STUDENT FROM THIS CAMPUS (UNASSIGN, BUT DO NOT DELETE STUDENT)
   e.g. DELETE /api/campuses/3/students/10
*/
router.delete(
  '/:campusId/students/:studentId',
  ash(async (req, res) => {
    const { campusId, studentId } = req.params;

    // Make sure campus exists (optional but nicer error)
    const campus = await Campus.findByPk(campusId);
    if (!campus) {
      return res.status(404).json({ error: 'Campus not found' });
    }

    // Find the student
    const student = await Student.findByPk(studentId);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // If the student is not currently enrolled in this campus, return 400/404
    if (student.campusId !== Number(campusId)) {
      return res
        .status(400)
        .json({ error: 'Student is not enrolled at this campus' });
    }

    // Unassign student from campus, but do NOT delete the student
    await student.update({ campusId: null });

    // 200 OK - return the updated student
    res.status(200).json(student);
  })
);



// Export router, so that it can be imported to construct the apiRouter (app.js)
module.exports = router;