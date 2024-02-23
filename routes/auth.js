/* 
  User | Auth routes
  host + /api/auth
 */
const { Router } = require('express');
const router = Router();
const {
  createUser,
  loginUser,
  renewToken
} = require('../controllers/auth');

const { check } = require('express-validator');
const { validateFields } = require('../middlewares/field-validator');
const { validateJWT } = require('../middlewares/validate-jwt');

router.post('/',
  [
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Email is not valid').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    check('password', 'Password must be at least 6 characters').isLength({min:6}),
    validateFields
  ],
  loginUser
)
router.post(
  '/new',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Email is not valid').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    check('password', 'Password must be at least 6 characters').isLength({min:6}),
    validateFields
  ],
  createUser
);
router.get('/renew', validateJWT, renewToken)

module.exports = router;