import { createApp } from "vue";
import Main from "./Main.vue";
import VueAxios from "vue-axios";
import axios from "axios";
// import 'bootstrap/dist/css/bootstrap.css'

import router from "./router";

createApp(Main).use(router).use(VueAxios, axios).mount("#app");
