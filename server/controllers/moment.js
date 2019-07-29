import model from '../models';

const { Moment } = model;

class Moments {
    static addMoment(req, res) {
    const { start, end, moment_definition_id, duration } = req.body
        return Moment
        .create({
            start,
            end,
            moment_definition_id,
            duration
        })
        .then((MomentData) => res.status(201).send({
            success: true,
            message: 'Moment successfully created',
            MomentData
        }))
    }
    static list(req, res) {
        return Moment
            .findAll()
            .then(moments => res.status(200).send(moments));
    }
}

export default Moments;