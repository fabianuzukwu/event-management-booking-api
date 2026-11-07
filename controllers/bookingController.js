const { Booking, User, Event } =require('../models');
const event = require('../models/event');

const createBooking = async (req, res) => {
    try {
        const { userId, eventId } = req.params;
        const { quantity, totalAmount} = req.body;
        const event = await Event.findByPk( eventId );
        
        if (!event) {
            return res.status(404).json({
                message: "Error creating Booking: Event not found"
            })
        }

        if (!Number.isInteger(quantity) || quantity <= 0) {
            return res.status(400).json({
                message: 'Please enter a valid ticket quantity'
            });
        }

        if (event.availableTickets <= 0) {
            return res.status(400).json({
                message: 'The event has reached its maximum capacity'
            });
        }

        if (new Date(event.date) <= new Date()) {
            return res.status(400).json({
                message: 'The event has already ended: you cannot book tickets for past events'
            });
        }


        const newBooking = await Booking.create({
            userId,
            eventId,
            quantity,
            totalAmount,
            status: "Pending"
        });

        res.status(201).json({
            message: "Booking created successfully",
            data: newBooking
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const getOneBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const Booking = await Booking.findByPk(id,{
            attributes: ['id', 'quantity', 'totalAmount', 'status', 'userId', 'eventId'],
            include: {
                model: events,
                as: 'event',
                attributes: ['title',
                    'description',
                    'date',
                    'location',
                    'ticketPrice',
                    'availableTickets']
            }
        });
        if (!booking) {
            return res.status(404).json({
                message: 'Booking not found'
            })
        }

        return res.status(200).json({
            message: 'Booking found',
            data: Booking
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const getUserBookings = async (req, res) => {
    try {
        const { userId } = req.params;

        const bookings = await Booking.findAll({
            where: {
                userId: userId
            },

            attributes: [
                'id',
                'quantity',
                'totalAmount',
                'status',
                'userId',
                'eventId'
            ],

            include: {
                model: Event,
                as: 'event',
                attributes: [
                    'title',
                    'description',
                    'date',
                    'location',
                    'ticketPrice',
                    'availableTickets'
                ]
            }
        });

        return res.status(200).json({
            message: 'User bookings retrieved successfully',
            data: bookings
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
              
const updateBookingStatus = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const { status } = req.body;
        const validStatuses = ['Pending', 'Confirmed', 'Cancelled'];

        const booking = await Booking.findByPk(bookingId);
        if (!booking) {
            return res.status(404).json({
                message: "Booking not found"
            })
        }
        
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid booking status: must be 'Pending', 'Confirmed', or 'Cancelled'"
            })
        }

        await booking.update({ status });
        res.status(200).json({
            message: "Booking status updated successfully",
            data: booking
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const cancelBooking = async (req, res) => {
    try {
        const { bookingId } = req.params;

        const booking = await Booking.findByPk(bookingId);

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        if (booking.status === "Cancelled") {
            return res.status(400).json({
                message: "Booking has already been cancelled"
            });
        }

        await booking.update({
            status: "Cancelled"
        });

        return res.status(200).json({
            message: "Booking cancelled successfully",
            data: booking
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    createBooking,
    getOneBooking,
    getUserBookings,
    updateBookingStatus,
    cancelBooking
}
