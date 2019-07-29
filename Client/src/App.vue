<template>
  <v-app>
    <v-container grid-list-md text-center>
      <v-layout wrap>
          <v-flex xs12>
            <v-stepper v-model="e6" vertical>
              
              <v-stepper-step :complete="e6 > 1" step="1" color="red lighten-1">
                Select a start date
                <small>{{start_date_picker}}</small>
              </v-stepper-step>

              <v-stepper-content step="1">
                <v-flex xs12>
                  <v-date-picker v-model="start_date_picker" color="red lighten-1"></v-date-picker>
                </v-flex>
                <br>
                <v-btn color="red lighten-1" class="white--text" @click="e6 = 2">Continue</v-btn>
                <v-btn text>Cancel</v-btn>
              </v-stepper-content>



              <v-stepper-step :complete="e6 > 2" step="2" color="red lighten-1">
                Select a start time
                <small>{{start_time_picker}}</small>
              </v-stepper-step>

              <v-stepper-content step="2">
                <v-flex xs12>
                  <v-time-picker v-model="start_time_picker" color="red lighten-1"></v-time-picker>
                </v-flex>
                <br>                
                <v-btn color="red lighten-1" class="white--text" @click="e6 = 3">Continue</v-btn>
                <v-btn text>Cancel</v-btn>
              </v-stepper-content>
              
              <v-stepper-step :complete="e6 > 3" step="3" color="red lighten-1">
                Select an end date
                <small>{{end_date_picker}}</small>
              </v-stepper-step>

              <v-stepper-content step="3">
                <v-flex xs12>
                  <v-date-picker v-model="end_date_picker" color="red lighten-1"></v-date-picker>
                </v-flex>
                <br>
                <v-btn color="red lighten-1" class="white--text" @click="e6 = 4">Continue</v-btn>
                <v-btn text>Cancel</v-btn>
              </v-stepper-content>

              <v-stepper-step step="4" color="red lighten-1">
                Select an end time
                <small>{{end_time_picker}}</small>
              </v-stepper-step>

              <v-stepper-content step="4" color="red lighten-1"> 
                <v-flex xs12>
                  <v-time-picker v-model="end_time_picker" color="red lighten-1"></v-time-picker>
                </v-flex>
                <br>                
                <v-btn color="red lighten-1" class="white--text" @click="e6 = 5">Continue</v-btn>
                <v-btn text>Cancel</v-btn>
              </v-stepper-content>
            </v-stepper>
            <template v-if="e6 == 5" >

              <v-container grid-list-md text-center>
                <v-layout wrap>
                  
                  <v-flex xs6>
                    <div>
                      <br>
                        <div class="headline">Moments</div>
                      <br>
                    </div>
                    <v-timeline v-for="moment in moment_history"  align-top >
                      <div v-show="(Date.parse(moment.start) > start) && (Date.parse(moment.end) < end)">
                      <v-timeline-item large color="red lighten-1" >
                        <v-card>
                          <v-card-title class="title">{{moment.moment_definition_id}}</v-card-title>
                            <v-card-text class="white text--primary">
                              <div class="caption">{{moment.moment_definition_id}} for {{new Date(moment.duration).toISOString().slice(11, -1)}} hours</div>
                              <div class="caption">started at {{new Date(moment.start).toISOString().slice(0, 16).replace('T',' ')}} </div>
                              <div class="caption">ended at {{new Date(moment.end).toISOString().slice(0, 16).replace('T',' ')}}</div>
                            </v-card-text>
                        </v-card>
                      </v-timeline-item>
                    </div>
                </v-timeline>
                  </v-flex>

                  <v-flex xs6>
                    <div>
                      <br>
                        <div class="headline">Events</div>
                      <br>
                    </div>
                    <v-timeline v-for="event in event_history"  align-top >
                      <div v-show="(Date.parse(event.start) > start) && (Date.parse(event.end) < end)">
                        <v-timeline-item large color="red lighten-1" >
                          <v-card>
                            <v-card-title class="title">{{event.type}}</v-card-title>
                            <v-card-text class="white text--primary">
                              <div class="caption">{{event.mode}} detected for {{new Date(event.duration).toISOString().slice(11, -1)}} hours</div>
                              <div class="caption" v-if="event.type == 'Transport'">travelled {{event.distance}} meters </div>
                              <div class="caption" v-if="event.type == 'Stationary'">significance is {{event.location.significance}}</div>
                              <div class="caption">started at {{new Date(event.start).toISOString().slice(0, 16).replace('T',' ')}} </div>
                              <div class="caption">ended at {{new Date(event.end).toISOString().slice(0, 16).replace('T',' ')}}</div>
                            </v-card-text>
                          </v-card>
                        </v-timeline-item>
                      </div>
                    </v-timeline>
                  </v-flex>               
                </v-layout>
              </v-container>
                 
            </template>
          </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';
import axios from 'axios';

export default {
  name: 'App',
  components: {
    // HelloWorld,
  },
  props: {
    
  },
  data () {
    return {
      start_date_picker: new Date().toISOString().substr(0, 10),
      start_time_picker: null,
      end_date_picker: new Date().toISOString().substr(0, 10),
      end_time_picker: null,
      e6: 1,
      moment_history: [],
      event_history: []
    }
  },
  computed: {
    start () {
      return Date.parse(this.start_date_picker + "T" + this.start_time_picker)
    },
    end () {
      return Date.parse(this.end_date_picker + "T" + this.end_time_picker)
    }
  },
  created(){
    axios.get('http://127.0.0.1:3001/api/moments')
    .then(response => {
      this.moment_history = response.data;    
    }).catch(error => {
      console.log(error);
    }); 

    axios.get('http://127.0.0.1:3001/api/events')
    .then(response => {
      this.event_history = response.data;    
    }).catch(error => {
      console.log(error);
    }); 


         
  }
};
</script>
