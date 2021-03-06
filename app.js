import http from 'http';
import https from 'https'
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import routes from './server/routes';
import axios from 'axios';
import underscore from 'underscore';
import cors from 'cors';

const hostname = '127.0.0.1';
const port = 3001;
const app = express() 
const server = http.createServer(app);

app.use(logger('dev')); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

routes(app);

app.get('*', (req, res) => res.status(200).send({
    message: 'Default Api Route',
}));

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

axios.get('https://s3-eu-west-1.amazonaws.com/sentiance.solutions/datasets/public/user1.json')
  .then(response => {
    const outputData = {
        "moments": response.data.data.user.moment_history,
        "events": response.data.data.user.event_history
    }

    outputData.moments = Object.keys(outputData.moments).map(key => {
        delete outputData.moments[key].analysis_type
        return Object.assign({}, outputData.moments[key], {
            start: new Date(outputData.moments[key].start),
            end: new Date(outputData.moments[key].end),
            moment_definition_id: outputData.moments[key].moment_definition_id,
            duration: ( - (new Date(outputData.moments[key].start) - new Date(outputData.moments[key].end))),
        }
    )})
    
    outputData.moments.sort(function(a,b){
        return new Date(b.start) - new Date(a.start);
      });

    
    outputData.moments.forEach((moment) =>{
        axios.post('http://127.0.0.1:3001/api/moments', moment,
          {
            headers: {
             'Content-Type': 'application/json'
            }
          }
        )
    })
    outputData.events = Object.keys(outputData.events).map(key => {
        delete outputData.events[key].analysis_type
        delete outputData.events[key].latitude
        delete outputData.events[key].longitude
        delete outputData.events[key].waypoints
        delete outputData.events[key].trajectory
        return Object.assign({}, outputData.events[key], {
            start: new Date(outputData.events[key].start),
            end: new Date(outputData.events[key].end),
            duration: ( - (new Date(outputData.events[key].start) - new Date(outputData.events[key].end))),
            type: outputData.events[key].type,
            location: outputData.events[key].location,
            distance: outputData.events[key].distance,
            mode: outputData.events[key].mode
        }
    )})
    outputData.events.sort(function(a,b){
        return new Date(b.start) - new Date(a.start);
      });

    outputData.events.forEach((event) =>{
        axios.post('http://127.0.0.1:3001/api/events', event,
          {
            headers: {
             'Content-Type': 'application/json'
            }
          }
        )
    })

    // let aggregate_items = []
    // for(let i = 0; i < outputData.events.length; i++){
    //     if(outputData.events[i].mode != undefined){
    //         aggregate_items.push(outputData.events[i].mode);
    //    }
    // }
    // let uniq_items = [...new Set(aggregate_items)];
    // console.log('uniq_items: ', uniq_items)

    // let aggregates = {}
    // for(let j = 0; j < uniq_items.length; j++){
    //     aggregates[uniq_items[j]] = { [uniq_items[j]]: []}
    // }
    
    // console.log('aggregates: ', aggregates)
    
    // for(let k = 0; k < outputData.events.length ; k++){
    //     if(outputData.events[k].mode != undefined){
    //         aggregates[outputData.events[k].mode][outputData.events[k].mode].push(outputData.events[k])
    //    }
    // }
    // console.log('train: ', aggregates['train']['train'])

    // axios.post('http://127.0.0.1:3001/api/aggregates', aggregates,
    //       {
    //         headers: {
    //          'Content-Type': 'application/json'
    //         }
    //       }
    //     ).catch(error => {
    //         console.log(error);
    //       });
    
    // uniq_items.forEach((item) =>{
    //     console.log('item: ' , item)
        
    // })
  })
  .catch(error => {
    console.log(error);
  });