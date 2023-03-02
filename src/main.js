import { createApp } from 'vue'
import App from './App.vue'

//import router
import router from './router'

//import Bootstrap, Popper, jQuery
import 'bootstrap/dist/css/bootstrap.css'
import 'jquery/dist/jquery.min'
import 'popper.js/dist/popper.min'
import 'bootstrap/dist/js/bootstrap.min'
import VueFeather from 'vue-feather';
import VueDatePicker from '@vuepic/vue-datepicker';
// import Toasted from 'vue-toasted';

const app = createApp(App)
app.component(VueFeather.name, VueFeather);
app.component('VueDatePicker', VueDatePicker);

//use vue router
app.use(router)

// app.use(Toasted, {
//   duration: 1500
// })

app.mount('#app')