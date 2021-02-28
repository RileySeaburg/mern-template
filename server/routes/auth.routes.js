/** Authentication routes for the application
 * The two auth APIs are defined in the auth.routes.js file using express.Router() to declare the route paths with the relevant HTTP methods. They're also assigned the corresponding controller functions, which should be called when requests are received for these routes.
 * The auth routes are as follows: 
 * '/auth/signin': POST request to authenticate the user with their email and password
 * '/auth/signout': GET request to clear the cookie containing a JWT that was set on the response object after sign-in
 */
import express from 'express';
import authCtrl from '../controllers/auth.controller'
 /** 
  * Express router authentication module
  * @name  AuthenticationRoutes
  * @const
  * 
 */
 const router = express.Router();


router.route('/auth/sigin')
    .post('authCtrl.signin')


router.route('/auth/signout')
    .get(authCtrl.signOut)


 export default router.route('/')