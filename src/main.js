import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { router } from "./router";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import Vue3Toasity, { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const app = createApp(App);

app.use(router);
app.use(Vue3Toasity, {
  autoClose: 3000,
  theme: "dark",
  position: toast.POSITION.BOTTOM_RIGHT,
  clearOnUrlChange: false,
});

app.mount("#app");
