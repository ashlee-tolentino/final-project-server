/*==================================================
/database/models/Student.js

It defines the student model for the database.
==================================================*/
const Sequelize = require('sequelize');  // Import Sequelize
const db = require('../db');  // Import Sequelize database instance called "db"

const Student = db.define("student", {
  firstname: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,        // cannot be empty string
    },
  },

  lastname: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,        // cannot be empty string
    },
  },

  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true,         // must be a valid email address
    },
  },

  imageUrl: {
    type: Sequelize.STRING,
    allowNull: true,
    // default student image if none is provided
    defaultValue:
      'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg',
  },

  gpa: {
    // GPA between 0.0 and 4.0, e.g., 3.5
    type: Sequelize.DECIMAL(2, 1),
    allowNull: true,         // GPA can be missing
    validate: {
      min: 0.0,
      max: 4.0,
    },
  },
});

// Export the student model
module.exports = Student;