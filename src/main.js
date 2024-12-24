import { createApp} from "vue";
import App from "./App.vue";
import router from "./router";

// Bootstrap CSS & JS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

import { createPinia } from 'pinia';
const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.mount("#app");