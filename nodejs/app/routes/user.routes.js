const { authJwt, verifySignUp } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

    //[authJwt.verifyToken, authJwt.isModerator]
    // [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],
    app.get('/api/users',controller.getAllModUsers);
    app.get('/api/user/:id', controller.getModUser);
    app.put('/api/user', controller.updateModUser);
    app.post('/api/user', controller.addModUser);
    app.delete('/api/user/:id', controller.deleteModUser);    
    app.get('/api/roles', controller.getRoles)
};