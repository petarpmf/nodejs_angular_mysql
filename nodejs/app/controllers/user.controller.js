const db = require("../models");
const {user: User, role: Role, refreshToken: RefreshToken} = db;
const bcrypt = require('bcryptjs');

const Op = db.Sequelize.Op;

exports.getAllModUsers = (req, res) =>{
    User.findAll({
      attributes: ['id', 'email', 'username'],
      include: {
        model: Role,
        as: 'roles',
        attributes: ['id', 'name']
      },
      // group: "id",
      // raw: true,
      // nest: true,
    })
    //.map(el => el.get({ plain: true })) // Get nested object for roles
    .then(users=>{
        res.status(200).send(users)
    }).catch(err=>{
        res.status(500).send({ message: err.message });
    });
}

exports.getModUser = (req, res) =>{
    User.findOne({
        where: {
          id: req.params.id
        },
        attributes: ['id', 'email', 'username'],
        include: {
          model: Role,
          as: 'roles',
          attributes: ['id', 'name']
        },
      })
      .then(user=>{
        res.status(200).send(user);
      }).catch(err=>{
        res.status(500).send({ message: err.message });
      })
}

exports.addModUser = (req, res) => {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8)
    })
    user.save().then(user=>{
        user.setRoles(req.body.roles).then(userRole=>{
          return user.save().then(()=>{
            res.send({ message: "User registered successfully!" });
        });    
        })
    }).catch(err=>{
        res.status(500).send({ message: err.message });
    })
}

exports.deleteModUser = (req, res) => {
    User.destroy({
        where: {id: req.params.id}
    }).then(()=>{
        res.status(200).send({message: "The user was removed."})
    }).catch(err=>{
        res.status(500).send({ message: err.message });
    });
}

exports.updateModUser = (req, res) => {
    User.findOne({
        where: {id: req.body.id}
    }).then(user=>{
      user.username = req.body.username;
      user.email = req.body.email,
      user.password = bcrypt.hashSync(req.body.password, 8);
        Role.findAll({
            where: {
              name: {
                [Op.or]: req.body.roles
              }
            }
          }).then(roles => {
            return user.setRoles(roles).then(() => {
                return user.update().then(()=>{
                    res.send({ message: "User updated successfully!" });
                });              
            });
          });
    }).catch(err=>{
        res.status(500).send({message: err})
    });
}

exports.getRoles = (req, res)=>{
  Role.findAll({
    attributes: ['id', 'name'],
  })
  .then(roles=>{
    res.status(200).send(roles);
  })
  .catch(err=>{
    res.status(500).send({message: err});
  })
}