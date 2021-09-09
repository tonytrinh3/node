const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

// tourRouter.route('/').get(getAllTours).post(createTour);
// tourRouter.route('/').get(getTour).patch(updateTour).delete(deleteTour);

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
