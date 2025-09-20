export interface ChatProps {
  id: number;
  title: string;
  selectedModel: string;
  createdAt: string;
  updatedAt: string;
  providerId: number;
}

export interface CreateChatProps {
  messages: { role: string; content: string; imagePath?: string }[];
  providerName: string;
  selectedModel: string;
  messageId: number;
}

export interface AIProviderProps {
  id: number;
  name: string;
  title?: string;
  desc?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
  models: string[];
}

export type MessageStatus = "loading" | "streaming" | "finished";

export interface MessageProps {
  id: number;
  content: string;
  type: "question" | "answer";
  chatId: number;
  status?: MessageStatus;
  createdAt: string;
  updatedAt: string;
  imagePath?: string;
}

export interface UpdatedStreamData {
  messageId: number;
  data: {
    is_end: boolean;
    result: string;
  };
}

export type OnUpdatedCallback = (data: UpdatedStreamData) => Promise<void>;
