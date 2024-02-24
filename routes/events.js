/* 
  User | Events routes
  host + /api/events
 */
  const { Router } = require('express');
  const router = Router();
  const { check } = require('express-validator');

  const { validateJWT } = require('../middlewares/validate-jwt');
  const {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
  } = require('../controllers/events');

  const {eventFieldValidators} = require('../validators/eventsValidators')

router.use(validateJWT)
router.get('/',getEvents);
router.post('',eventFieldValidators(), createEvent);
router.put('/:id',eventFieldValidators(), updateEvent);
router.delete('/:id', deleteEvent);
  
module.exports = router;