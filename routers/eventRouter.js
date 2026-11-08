const express = require('express');
const router = express.Router();

const { createEvent, getAllEvents, getOneEvent, updateEvent, deleteEvent } = require('../controllers/eventController');

router.post('/categories/:categoryId/events', createEvent);
router.get('/allEvents', getAllEvents);
router.get('/oneEvent:id', getOneEvent);
router.put('/updateEvent:id', updateEvent);
router.delete('/deleteEvent:id', deleteEvent);


modules.exports = router;
