/*==================================================
/database/db.js

It sets up Sequelize with Postgres database. 
- Create a Sequelize instance to connect to the database specifying database name, username, and password.
==================================================*/
/* INSTANTIATE DATABASE */ 

// Import module dependencies
const Sequelize = require('sequelize');  // Import Sequelize
const {dbName, dbUser, dbPwd} = require('./utils/configDB');  // Import database name, username, password

// Display a confirmation message for opening a database connection
console.log('Opening database connection');

// This is the Sequelize entry point for connecting to the database. 
// Instantiate the Sequelize instance with database name, username, and password. Then connect to the database.
const db = new Sequelize(dbName, dbUser, dbPwd, {
  host: 'localhost',
  dialect: 'postgres'
});




/*==================================================
  MODEL DEFINITIONS
==================================================*/

// Campus model:
//  - name: not null / not empty
//  - address: not null / not empty
//  - description: large text string, can be null
//  - imageUrl: default value, can be null
const Campus = db.define('campus', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: Sequelize.TEXT,    // “large text string”
    allowNull: true,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue:
      'https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg',
  },
});

// Student model:
//  - firstName: not null / not empty
//  - lastName: not null / not empty
//  - email: not null / not empty, must be a valid email
//  - imageUrl: default value, can be null
//  - gpa: decimal(2,1), 0.0–4.0, can be null
const Student = db.define('student', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true,
    },
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue:
      'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg',
  },
  gpa: {
    type: Sequelize.DECIMAL(2, 1),
    allowNull: true,
    validate: {
      min: 0.0,
      max: 4.0,
    },
  },
});

/*==================================================
  ASSOCIATIONS
==================================================*/

// A campus can have many students
Campus.hasMany(Student);

// A student belongs to at most one campus
Student.belongsTo(Campus);

/*==================================================
  EXPORTS
==================================================*/

// Export the Sequelize instance AND the models
module.exports = {
  db,
  Campus,
  Student,
};