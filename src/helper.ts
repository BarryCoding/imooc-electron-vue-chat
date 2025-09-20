import { lookup } from "mime-types";
import { readFile } from "node:fs/promises";

export async function convertMessages(
  messages: { role: string; content: string; imagePath?: string }[],
) {
  const convertedMessages = [];
  for (const message of messages) {
    let convertedContent:
      | string
      | (
          | { type: string; text: string }
          | { type: string; image_url: { url: string } }
        )[];
    if (message.imagePath) {
      const imageBuffer = await readFile(message.imagePath);
      const base64Image = imageBuffer.toString("base64");
      const mimeType = lookup(message.imagePath);
      convertedContent = [
        {
          type: "text",
          text: message.content || "",
        },
        {
          type: "image_url",
          image_url: {
            url: `data:${mimeType};base64,${base64Image}`,
          },
        },
      ];
    } else {
      convertedContent = message.content;
    }
    const { imagePath, ...messageWithoutImagePath } = message;
    convertedMessages.push({
      ...messageWithoutImagePath,
      content: convertedContent,
    });
  }
  return convertedMessages;
}
