 const { Event, Catergory } = require('../models');


 const createEvent = async (req, res) => {
    try {
      const { cateroryId } = req.params;
      const { title, description, location, date, capacity, ticketPrice, categoryId, availableTickets } = req.body;
      const event = await Event.findByPk(categoryId);
      if (!event) {
        return res.status(404).json({
            message: "Error creating Event: category does not exist"
        })
      }
      const newEvent = await Event.create({
        title,
        description,
        location,
        date, 
        capacity,
        ticketPrice,
        categoryId,
        availableTickets
      });
      res.status(201).json({ 
        message: 'Event created successfully',
        data: event
      });
    } catch (error) {
      res.status(500).json({ 
        message: error.message });
    }
} 

const getAllEvents = async (req, res) => {
   try {
      const events = await Event.findAll();
        res.status(200).json({
           message: 'Events retrived successfully',
           data: events
        });
   } catch (error) {
    res.status(500).json({
      message: error.message
    });
   }
}

  
const getOneEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByPk(id, {
      include:{
        model: Catergory, as: 'category', attributes:['name', 'description']
      }
    });
    if (!event) {
      return res.status(404).json({
        message: 'Event not found'
      })
    }
    res.status(200).json({
      message: 'Event found successfully',
      data:event
    })
  } catch (error) {
     res.status(500).json({
      message: error.message
     })
  }
}

const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByPk(id);
    if(!event) {
      return res.status(404).json({
        message: 'Event not found'
      })
    }
    await event.updateEvent(req.body);
    res.status(200).json({
      message: 'Event upadated successfully'
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}

const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByPk(id);
    if(!event) {
      return res.status(404).json({
        message: 'Event not found'
      })
    }
    await event.destroy();
    res.status(200).json({
      message: 'Event deleted successfully'
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}

modules.exports = {
    createEvent,
    getAllEvents,
    getOneEvent,
    updateEvent,
    deleteEvent
}

