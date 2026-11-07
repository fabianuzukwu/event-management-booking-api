const express = require('express');
const router = express.Router();

const { createBooking, getOneBooking, getUserBookings, updateBookingStatus, cancelBooking} = require('../controllers/bookingController.js');

router.post('/bookings/:userId', createBooking);
router.get('/bookings/:id', getOneBooking);
router.get('/bookings/:userId', getUserBookings);
router.put('/bookings/:bookingId', updateBookingStatus);
router.patch('/bookings/:bookingId/cancel', cancelBooking);

module.exports = router;