import OpenAI from 'openai';

type MessageContent = string;

type Message = OpenAI.Chat.Completions.ChatCompletionMessageParam;

export type ChatCompletionsParams =
  OpenAI.Chat.Completions.ChatCompletionCreateParamsNonStreaming;

export type Messages = Array<Message>;

export interface OpenaiUseCase {
  (content: MessageContent, openai: OpenAI): object;
}

export interface OpenAiCompletions {
  (openai: OpenAI, chatCompletionsParams: ChatCompletionsParams): object;
}
