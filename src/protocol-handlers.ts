import { protocol, net } from "electron";
import url from "node:url";

export const setupProtocolHandlers = () => {
  // Custom protocol handler for safe file access
  protocol.handle("safe-file", async (request) => {
    const filePath = decodeURIComponent(
      request.url.slice("safe-file://".length),
    );

    // understanding the raw approach:
    // const data = await fs.readFile(filePath)
    // return new Response(data, {
    //   status: 200,
    //   headers: {
    //     'Content-Type': lookup(filePath) as string
    //   }
    // })

    // url and net approach
    const newFilePath = url.pathToFileURL(filePath).toString();
    console.log(`🤖 ~ safe-file protocol ~ newFilePath:`, newFilePath);
    return net.fetch(newFilePath);
  });
};
