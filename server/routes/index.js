import Moments from '../controllers/moment';
import Events from '../controllers/event';
import Aggregates from '../controllers/aggregate'


export default (app) => {

    app.get('/api', (req, res) => res.status(200).send({
        message: 'Default Api',
    }));

    app.post('/api/moments', Moments.addMoment); 
    app.post('/api/events', Events.addEvent);
    app.post('api/aggregates', Aggregates.addAggregate)
    
    app.get('/api/moments', Moments.list);
    app.get('/api/events', Events.list);
    
};