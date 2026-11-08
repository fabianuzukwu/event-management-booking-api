const express = require('express');
const router = express.Router();

const { createBooking, getOneBooking, getUserBookings, updateBookingStatus, cancelBooking} = require('../controllers/bookingController.js');
const { createBookingValidation, updateBookingStatusValidation } = require('../middlewares/bookingValidator.js');

router.post('/bookings/:userId', createBookingValidation, createBooking);
router.get('/bookings/:id', getOneBooking);
router.get('/bookings/:userId', getUserBookings);
router.put('/bookings/:bookingId', updateBookingStatusValidation,updateBookingStatus);
router.patch('/bookings/:bookingId/cancel', cancelBooking);

module.exports = router;