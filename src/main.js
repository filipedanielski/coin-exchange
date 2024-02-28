import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { router } from "./router";
import "/node_modules/flag-icons/css/flag-icons.min.css";

const app = createApp(App);

app.use(router);

app.mount("#app");
