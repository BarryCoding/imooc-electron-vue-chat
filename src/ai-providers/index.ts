import { BaseProvider } from "./base";
import { OpenAIProvider } from "./open-ai";

export function createProvider(providerName: string): BaseProvider {
  switch (providerName) {
    case "dashscope":
      return new OpenAIProvider(
        process.env["ALI_API_KEY"] as string,
        "https://dashscope.aliyuncs.com/compatible-mode/v1",
      );
    default:
      throw new Error(`Unsupported provider: ${providerName}`);
  }
}
