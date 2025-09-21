import { ChatMessageProps, UniversalChunkProps } from "../types";
export abstract class BaseProvider {
  abstract chat(
    messages: ChatMessageProps[],
    modelName: string,
  ): Promise<unknown>;
  protected abstract transformResponse(chunk: unknown): UniversalChunkProps;
}
