import { app } from "electron";
import started from "electron-squirrel-startup";
import "dotenv/config";
import { setupAppLifecycle } from "./app-lifecycle";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

// Setup application lifecycle and start the app
setupAppLifecycle();
