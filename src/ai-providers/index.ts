import { BaseProvider } from "./base";
import { OpenAIProvider } from "./open-ai";

export function createProvider(providerName: string): BaseProvider {
  switch (providerName) {
    case "dashscope":
      return new OpenAIProvider(
        process.env["ALI_API_KEY"] as string,
        "https://dashscope.aliyuncs.com/compatible-mode/v1",
      );
    case "deepseek":
      return new OpenAIProvider(
        process.env["DEEPSEEK_API_KEY"] as string,
        "https://api.deepseek.com/v1",
      );
    default:
      throw new Error(`Unsupported provider: ${providerName}`);
  }
}
