import "./index.css";

import { createApp } from "vue";
import { createMemoryHistory, createRouter } from "vue-router";
import { createPinia } from "pinia";
import App from "./App.vue";
import Home from "./views/Home.vue";
import Chat from "./views/Chat.vue";
import Settings from "./views/Settings.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/chat/:id", component: Chat },
  { path: "/settings", component: Settings },
];
const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

const pinia = createPinia();

createApp(App).use(router).use(pinia).mount("#app");
