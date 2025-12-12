/*==================================================
/database/models/Campus.js

It defines the campus model for the database.
==================================================*/
const Sequelize = require('sequelize');  // Import Sequelize
const db = require('../db');  // Import Sequelize database instance called "db"

// Define the campus model
const Campus = db.define("campus", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,        // cannot be empty string
    },
  },

  address: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,        // cannot be empty string
    },
  },

  description: {
    // large text string
    type: Sequelize.TEXT,
    allowNull: true,         // optional
  },

  imageUrl: {
    type: Sequelize.STRING,
    allowNull: true,
    // default campus image if none is provided
    defaultValue:
      'https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg',
  },
});

// Export the campus model
module.exports = Campus;