const express = require("express");
const cors = require("cors");
const process = require('process');

const bcrypt = require('bcryptjs');

const app = express();

const corsOptions = {
  origin: "http://localhost:4200"
};

console.log(`NODE_ENV=${process.env.NODE_ENV}`);

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const { user } = require("./app/models");

const Role = db.role;
const User = db.user;

db.sequelize.sync();
// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });

app.use((error, req, res, next)=>{
  res.status(408).send(error)
  next();
})

// simple route
app.get("/", (req, res, next) => {
  console.log('Base route!!!')
  try{
    throw new Error("ERROR TEST!")
  }catch(err){
    next(err)
  }
  
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  //Pupulate table Roles with role: user, moderator and admin
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });

  User.create({
    id: 1,
    username: 'test@gmail.com',
    email: "test@gmail.com",
    password: bcrypt.hashSync("test@gmail.com", 8)
  }).then(async user=>{
    await user.setRoles([1,2,3]);
    await user.save();
  }).catch(err => {
    console.log(err.message)
  });

}