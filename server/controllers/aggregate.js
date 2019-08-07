import model from '../models';

const { Aggregate } = model;

class Aggregates {
    static addAggregate(req, res) {
    const { biking, car, flight, train, tram, walking } = req.body
        return Aggregate
        .create({
            biking, 
            car,
            train, 
            tram, 
            walking, 
            mode 
        })
        .then((AggregateData) => res.status(201).send({
            success: true,
            message: 'Aggregate successfully created',
            AggregateData
        }))
    }
    static list(req, res) {
        return Aggregate
            .findAll()
            .then(aggregates => res.status(200).send(aggregates));
    }
}

export default Aggregates;