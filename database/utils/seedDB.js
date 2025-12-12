/*==================================================
/database/utils/seedDB.js

It seeds the database with several initial students and campuses.
==================================================*/
const { Campus, Student } = require('../models');  // Import database models

// Seed database
const seedDB = async () => {
  // Create campuses
  const hunter = await Campus.create({
    name: "Hunter College",
    address: "695 Park Ave, New York, NY 10065",
    description: "This is a school in New York, New York.",
    imageUrl: "https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg"
  });

  const queens = await Campus.create({
    name: "Queens College",
    address: "65-30 Kissena Blvd, Queens, NY 11367",
    description: "This is a school in Queens, New York.",
    imageUrl: "https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg"
  });

  const brooklyn = await Campus.create({
    name: "Brooklyn College",
    address: "2900 Bedford Ave, Brooklyn, NY 11210",
    description: "This is a school in Brooklyn, New York.",
    imageUrl: "https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg"
  });

  // Create students (REMEMBER: email is required!)
  const joe = await Student.create({
    firstname: "Joe",
    lastname: "Smith",
    email: "joe.smith@example.com",
    gpa: 3.2,
    imageUrl: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg"
  });

  const mary = await Student.create({
    firstname: "Mary",
    lastname: "Johnson",
    email: "mary.johnson@example.com",
    gpa: 3.8,
    imageUrl: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg"
  });

  // Assign students to campuses
  await joe.setCampus(hunter);
  await mary.setCampus(queens);

  console.log("-------- Successfully seeded database --------");
};

// Export the database seeding function
module.exports = seedDB;