import type OpenAI from 'openai';
import { Stream } from 'openai/streaming';

type ChatCompletion = OpenAI.Chat.ChatCompletion;
type ChatCompletionChunk = OpenAI.Chat.ChatCompletionChunk;
type Message = OpenAI.Chat.Completions.ChatCompletionMessageParam;
type MessageContent = string;
type NoStreamCompletions = Promise<ChatCompletion & { _request_id?: string }>;
type StreamCompletionsOutput = Promise<
  Stream<ChatCompletionChunk> & { _request_id?: string }
>;

export type ChatCompletionCreateParamsNonStreaming =
  OpenAI.Chat.Completions.ChatCompletionCreateParamsNonStreaming;

export type ChatCompletionCreateParamsStreaming =
  OpenAI.Chat.Completions.ChatCompletionCreateParamsStreaming;

export type Messages = Array<Message>;

export interface OpenaiUseCase {
  (content: MessageContent, openai: OpenAI): Promise<string>;
}

export interface OpenaiNoStreamCompletions {
  (
    openai: OpenAI,
    params: ChatCompletionCreateParamsNonStreaming
  ): NoStreamCompletions;
}

export interface OpenaiStreamCompletions {
  (
    openai: OpenAI,
    params: ChatCompletionCreateParamsStreaming
  ): StreamCompletionsOutput;
}
