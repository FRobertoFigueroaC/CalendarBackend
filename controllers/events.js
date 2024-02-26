const {response} = require('express');
const Event = require('../models/Event');
const {
  errorNotExistOrUnauthorized,
  error500,
  error401,
  error404 }  = require('../helpers/errorHandler');
const { successfulMessages, errorMessages } = require('../responses/responsesMessages');

const moment = require('moment');

const getEvents = async (req, res = response) => {

  // const {start, end} = req.params;

  const events = await Event.find({
    user: req.id
  })
  .populate('user', 'name');

  return res.status(200).json({
    ok: true,
    msg: successfulMessages.default200,
    events
  })

  try {
  } catch (error) {
    return error500(res, error);
  }
 
}

const createEvent = async(req, res = response) => {
  const event = new Event(req.body);
  try {
    event.user = req.id;
    const savedEvent = await event.save();
    return res.status(201).json({
      ok: true,
      msg: successfulMessages.created200('Event'),
      event: savedEvent
    })
    
  } catch (error) {
    return error500(res, error, errorMessages.savingDBfailed('event'));
  }
 
}

const updateEvent = async(req, res = response) => {

  const { id: eventId} = req.params;
  const userId = req.id;

  try {
    let event = await Event.findById(eventId);
    errorNotExistOrUnauthorized(res,'event',event,eventId,userId);
    const updateParams = {
      ...req.body,
      user: userId
    }
    const updatedEvent = await Event.findByIdAndUpdate(eventId, updateParams, {
      new: true
    });

    return res.status(200).json({
      ok: true,
      msg: successfulMessages.updated200('Event'),
      event: updatedEvent
    })
    
  } catch (error) {
    return error500(res, error, errorMessages.savingDBfailed('event'))
  }
  
}

const deleteEvent = async(req, res = response) => {
  const { id: eventId} = req.params;
  const userId = req.id;
  try {
    let event = await Event.findById(eventId);
    return errorNotExistOrUnauthorized(res,'event',event,eventId,userId);
    await event.deleteOne()
    
    return res.status(200).json({
      ok: true,
      msg: successfulMessages.deleted200('Event'),
      event
    })
  } catch (error) {
    return error500(res, error, errorMessages.deletingDBfailed('event'))
  }
 
}

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent
}