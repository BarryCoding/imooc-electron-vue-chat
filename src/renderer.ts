import "./index.css";

import { createApp } from "vue";
import { createMemoryHistory, createRouter } from "vue-router";
import App from "./App.vue";
import Home from "./views/Home.vue";
import Conversation from "./views/Chat.vue"; // TODO: rename to Chat
import Settings from "./views/Settings.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/chat/:id", component: Conversation },
  { path: "/settings", component: Settings },
];
const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

createApp(App).use(router).mount("#app");
