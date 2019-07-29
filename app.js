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
const port = 3000;
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

// https.get('https://s3-eu-west-1.amazonaws.com/sentiance.solutions/datasets/public/user1.json', (resp) => {
//     let data = '';  
//     resp.on('data', (chunk) => {
//     data += chunk;
//     });
//     resp.on('end', () => {
//     });
// }).on("error", (err) => {
// });

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
        axios.post('http://127.0.0.1:3000/api/moments', moment,
          {
            headers: {
             'Content-Type': 'application/json'
            }
          }
        )
    })    
  })
  .catch(error => {
    console.log(error);
  });