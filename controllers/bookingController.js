const { Booking } =require('../models');

const createBooking = async (req, res) => {
    try {
        const { eventId } = req.params;
        const { quantity, totalPrice} = req.body;
        const event = await Event.findByPk( eventId );
        
        if (!event) {
            return res.status(404).json({
                message: "Error creating Booking: Event does not exist"
            })
        }

        const newBooking = await Booking.create({
            eventId,
            quantity,
            totalPrice,
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


module.exports = {
    createBooking
}