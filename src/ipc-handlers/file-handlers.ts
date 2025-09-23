import { ipcMain, app } from "electron";
import fs from "node:fs/promises";
import path from "node:path";

export const setupFileHandlers = () => {
  ipcMain.handle("copy-image-to-user-dir", async (event, filePath: string) => {
    // Get the path to the user's application data directory
    const userDataPath = app.getPath("userData");

    // Define the path to the 'images' directory within the user data directory
    const imagesDir = path.join(userDataPath, "images");

    // Ensure the 'images' directory exists, create it if it doesn't (recursive allows nested dirs)
    await fs.mkdir(imagesDir, { recursive: true });

    // Extract the file name from the filePath
    const fileName = path.basename(filePath);

    // Define the destination path for the copied image
    const destPath = path.join(imagesDir, fileName);

    // Copy the image file from the filePath to the destination path
    await fs.copyFile(filePath, destPath);

    // Return the destination path of the copied image
    return destPath;
  });
};
