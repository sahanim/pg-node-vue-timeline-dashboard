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
            <template v-if="e6 == 5">
              <v-timeline v-for="moment in moment_history"  align-top :dense="$vuetify.breakpoint.smAndDown">
                <div v-if="(Date.parse(moment.start) > start) && (Date.parse(moment.end) > end)">
                  <v-timeline-item color="red lighten-1" >
                    <v-card>
                      <v-card-title class="title">{{moment.moment_definition_id}}</v-card-title>
                        <v-card-text class="white text--primary">
                          <p>Moment Detected at: {{moment.moment_definition_id}}</p>
                          <p>for {{new Date(moment.duration).toISOString().slice(11, -1)}} hours</p>
                          <p>starting at {{new Date(moment.start).toISOString().slice(0, 16).replace('T',' ')}} </p>
                          <p>ending at {{new Date(moment.end).toISOString().slice(0, 16).replace('T',' ')}}</p>
                        </v-card-text>
                    </v-card>
                  </v-timeline-item>
                </div>                
              </v-timeline>
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
    axios.get('http://127.0.0.1:3000/api/moments')
    .then(response => {
      this.moment_history = response.data;    
    })
  .catch(error => {
    console.log(error);
  });        
  }
};
</script>
