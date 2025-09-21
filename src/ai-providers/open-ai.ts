import OpenAI from "openai";
import { BaseProvider } from "./base";
import { ChatMessageProps } from "../types";

export class OpenAIProvider extends BaseProvider {
  private client: OpenAI;

  constructor(apiKey: string, baseURL: string) {
    super();
    this.client = new OpenAI({
      apiKey,
      baseURL,
    });
  }

  async chat(messages: ChatMessageProps[], model: string) {
    const stream = await this.client.chat.completions.create({
      model,
      messages: messages as any,
      stream: true,
    });

    // return an async iterator
    return {
      async *[Symbol.asyncIterator]() {
        for await (const chunk of stream) {
          yield chunk;
        }
      },
    };
  }
}
