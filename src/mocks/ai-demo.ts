// import { ChatCompletion } from "@baiducloud/qianfan";
// import path from "path";
import "dotenv/config";
import OpenAI from "openai";
import { readFile } from "fs/promises";
import fs from "fs";

// 使用百度文心一言 SDK
// export async function run1() {
//   const client = new ChatCompletion();
//   const stream = await client.chat(
//     {
//       messages: [
//         { role: "user", content: "你好" },
//         { role: "assistant", content: "如果您有任何问题，请随时向我提问。" },
//         { role: "user", content: "我在上海，周末可以去哪里玩？" },
//         {
//           role: "assistant",
//           content:
//             "上海是一个充满活力和文化氛围的城市，有很多适合周末游玩的地方。",
//         },
//         { role: "user", content: "周末这里的天气怎么样？" },
//       ],
//       stream: true,
//     },
//     "ERNIE-Speed-128K",
//   );
//   for await (const chunk of stream) {
//     console.log(chunk);
//   }
// }

// 使用阿里通义千问
const client = new OpenAI({
  apiKey: process.env["ALI_API_KEY"],
  baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
});
export async function run2() {
  const stream = await client.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "你现在是一只卡通片里面的可爱小狗，请模仿汪汪队长的口吻进行回答",
      },
      { role: "user", content: "请问队长，老鼠为什么有害呢？" },
    ],
    model: "qwen-turbo",
    stream: true,
  });
  for await (const chunk of stream) {
    console.log(chunk.choices[0].delta);
  }
}

// 使用阿里通义千问 qwen-vl 识别图片
export async function run3() {
  const imageBuffer = await readFile("/Users/viking/Desktop/dog.jpeg");
  const base64Image = imageBuffer.toString("base64");
  console.log("base64", base64Image);
  const resp = await client.chat.completions.create({
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "图中是什么动物？" },
          {
            type: "image_url",
            image_url: { url: `data:image/jpeg;base64,${base64Image}` },
          },
        ],
      },
    ],
    model: "qwen-vl-plus",
  });
  console.log(`🤖 ~ run3 ~ resp:`, resp);
}

// 使用通义千问 qwen-long 分析文件
export async function run4() {
  const fileObj = await client.files.create({
    file: fs.createReadStream("/Users/viking/Desktop/1.pdf"),
    purpose: "file-extract" as any,
  });
  console.log("resp", fileObj);
  const resp = await client.chat.completions.create({
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "system", content: `fileid://${fileObj.id}` },
      { role: "user", content: "请帮忙概括文件讲述了什么" },
    ],
    model: "qwen-long",
  });
  console.log(`🤖 ~ run4 ~ resp:`, resp);
}
