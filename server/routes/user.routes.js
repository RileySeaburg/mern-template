/*
/api/users for the following:
-Listing users with GET 
-Creating a new user with POST 
/api/users/:userId for the following:  
-Fetching a user with GET 
-Updating a user with PUT 
-Deleting a user with DELETE
*/
import express from 'express'
import userCtrl from '../controllers/user.controller'
/**
 * @module UserRoutes
 */
const router = express.Router()

router.route('/api/users')
    .get(userCtrl.list)
    .post(userCtrl.create)

router.route('/api/users/:userId')
    .get(userCtrl.read)
    .put(userCtrl.update)
    .delete(userCtrl.remove)

router.param('userId', userCtrl.userByID)
router.param('userId', userCtrl.userById)
    
router.route('/api/users').post(userCtrl.create)
router.route('/api/users').get(userCtrl.list)
router.route('/api/users/:userId').get(userCtrl.read)
router.route('/api/users/:userId').put(userCtrl.update)
router.route('/api/users/:userId').delete(userCtrl.remove)
export default router