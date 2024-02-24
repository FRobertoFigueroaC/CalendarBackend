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

const { validateJWT } = require('../middlewares/validate-jwt');
const { userFieldValidators, loginFieldValidators } = require('../validators/authValidators')

router.post('/', loginFieldValidators(), loginUser)
router.post('/new', userFieldValidators(), createUser);
router.get('/renew', validateJWT, renewToken)

module.exports = router;