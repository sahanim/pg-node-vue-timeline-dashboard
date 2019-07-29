import Moments from '../controllers/moment';
import Events from '../controllers/event';


export default (app) => {

    app.get('/api', (req, res) => res.status(200).send({
        message: 'Default Api',
    }));

    app.post('/api/moments', Moments.addMoment); 
    app.post('/api/events', Events.addEvent);
    app.get('/api/moments', Moments.list);
};