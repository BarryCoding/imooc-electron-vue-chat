import "./index.css";

import { createApp } from "vue";
import { createMemoryHistory, createRouter } from "vue-router";
import { createPinia } from "pinia";
import App from "./App.vue";
import Home from "./views/Home.vue";
import Chat from "./views/Chat.vue";
import Settings from "./views/Settings.vue";
import { useChatStore } from "./stores/chat";

const routes = [
  { path: "/", component: Home },
  { path: "/chat/:id", component: Chat },
  { path: "/settings", component: Settings },
];
const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

router.beforeEach((to) => {
  const store = useChatStore();
  if (!to.path.startsWith("/chat/")) {
    store.currentChatId = -1;
  }
});

const pinia = createPinia();

createApp(App).use(router).use(pinia).mount("#app");
