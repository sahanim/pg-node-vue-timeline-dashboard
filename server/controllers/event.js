import model from '../models';

const { Event } = model;

class Events {
    static addEvent(req, res) {
    const { start, end, type, location, duration, distance, mode } = req.body
        return Event
        .create({
            start, 
            end, 
            type, 
            location, 
            duration, 
            distance, 
            mode 
        })
        .then((EventData) => res.status(201).send({
            success: true,
            message: 'Event successfully created',
            EventData
        }))
    }
}

export default Events;