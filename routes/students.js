/*==================================================
/routes/students.js

It defines all the students-related routes.
==================================================*/
// Import Express module
const express = require('express');
// Create an Express router function called "router"
const router = express.Router();
// Import database models
const { Student, Campus } = require('../database/models');

// Import a middleware to replace "try and catch" for request handler, for a concise coding (fewer lines of code)
const ash = require('express-async-handler');

/* GET ALL STUDENTS: async/await using "try-catch" */
// router.get('/', async (req, res, next) => {
//   try {
//     let students = await Student.findAll({include: [Campus]});
//     res.status(200).json(students);
//   } 
//   catch(err) {
//     next(err);
//   }
// });

/* GET ALL STUDENTS: async/await using express-async-handler (ash) */
// Automatically catches any error and sends to Routing Error-Handling Middleware (app.js)
// It is the same as using "try-catch" and calling next(error)
router.get('/', ash(async(req, res) => {
  const students = await Student.findAll({include: [Campus]});
  res.status(200).json(students);  // Status code 200 OK - request succeeded
}));

/* GET STUDENT BY ID */
router.get('/:id', ash(async(req, res) => {
  // Find student by Primary Key
  const student = await Student.findByPk(req.params.id, {include: [Campus]});  // Get the student and its associated campus
  
  // If student not found, respond with 404
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
  
  res.status(200).json(student);  // Status code 200 OK - request succeeded
}));

/* ADD NEW STUDENT */
router.post(
  '/',
  ash(async (req, res) => {
    // Student model validations (firstName, lastName, email, gpa, etc.) will run here
    const newStudent = await Student.create(req.body);
    // 201 Created - successful creation of a resource
    res.status(201).json(newStudent);
  })
);

/* DELETE STUDENT */
router.delete(
  '/:id',
  ash(async (req, res) => {
    const student = await Student.findByPk(req.params.id);

    // If student not found, respond with 404
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    await student.destroy();
    // 204 No Content - successfully deleted, no body returned
    res.status(204).end();
  })
);

/* EDIT STUDENT */
router.put('/:id', ash(async(req, res) => {
  // Find student first
    const student = await Student.findByPk(req.params.id);

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Update student with data from request body
    // This can include changing campusId to enroll/transfer/unassign
    await student.update(req.body);

    // Reload with associated campus so client gets updated relationship
    const updatedStudent = await Student.findByPk(req.params.id, {
      include: [Campus],
    });

    // 200 OK - successful update
    res.status(200).json(updatedStudent);
}));

// Export router, so that it can be imported to construct the apiRouter (app.js)
module.exports = router;