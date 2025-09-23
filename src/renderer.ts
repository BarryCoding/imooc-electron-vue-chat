import "./index.css";

import { createApp } from "vue";
import { createMemoryHistory, createRouter } from "vue-router";
import { createPinia } from "pinia";
import App from "./App.vue";
import Home from "./views/Home.vue";
import Chat from "./views/Chat.vue";
import Settings from "./views/Settings.vue";
import { useChatStore } from "./stores/chat";
import i18n from "./i18n";

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
const app = createApp(App).use(router).use(pinia).use(i18n);

// Set up menu IPC handlers
if (window.electronAPI) {
  // Handle "New Chat" menu item
  window.electronAPI.onMenuNewChat(() => {
    router.push("/");
  });

  // Handle "Open Settings" menu item
  window.electronAPI.onMenuOpenSettings(() => {
    router.push("/settings");
  });
}

app.mount("#app");
