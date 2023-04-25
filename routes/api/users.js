const express = require("express");

const { users: ctrl } = require("../../controllers");
const { auth } = require("../../middlewares");
const { upload } = require("../../utils");

const router = express.Router();

/**
 * @openapi
 * components:
 *      schemas:
 *          Users:
 *              type: object
 *              required:
 *               - name
 *               - email
 *               - password
 *              properties:
 *                  name:
 *                      type: string
 *                      description: name of the registered user
 *                  password:
 *                      type: string
 *                      description: hash user password
 */

/**
 * @openapi
 * components:
 *   schemas:
 *       Users:
 *           type: object
 *           required:
 *               - name
 *               - email
 *               - password
 *           properties:
 *               name:
 *                   type: string
 *                   description: name of the registered user
 *               password:
 *                   type: string
 *                   description: hash user password
 *               avatarURL:
 *                   type: string
 *                   description: user avatar (by default null)
 *               phone:
 *                   type: string
 *                   description: user phone number
 *               birthday:
 *                   type: date
 *                   description: user birthday
 *               telegram:
 *                   type: string
 *                   description: link to user telegram
 *               token:
 *                   type: string
 *                   description: token for login user in app
 *           example:
 *               name: 'Rory'
 *               password: '$2b$10$aR8qeyhgMO./FyAP34c7oOV2M2b7.Ev3thobEdwMnXsKpUdgx55vK'
 *               avatarURL: null
 *               phone: '0634587399'
 *               birthday: '1985-04-23'
 *               telegram: '@Rory'
 *               token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDUyNGM1ZTE3ODNjYmRhZDA5MWM3NSIsImlhdCI6MTY4MjI2Mjk0MiwiZXhwIjoxNjgyMzQ5MzQyfQ.tdsUm2mujsODEMvlH7TVuLWziNlCG7lo4JTvUzcSk50'
 */

/**
 * @openapi
 * /users/register
 *      post:
 *          summary: returns user object after registration
 *          responses:
 *              '200':
 *                  description: return registered user
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *
 *
 *
 */
router.post("/register", ctrl.register);
router.post("/login", ctrl.login);
router.post("/logout", auth, ctrl.logout);

router.get("/current", auth, ctrl.current);
router.patch("/info", auth, upload.single("avatarURL"), ctrl.update);

module.exports = router;
