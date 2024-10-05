import { openai } from '@ai-sdk/openai';
import { CoreMessage, streamText } from 'ai';
import dotenv from 'dotenv';
dotenv.config();

export async function Questionare(req: Request) {
  const { messages }: { messages: CoreMessage[] } = await req.json();

  const result = await streamText({
    model: openai('gpt-4'),
    system: 'You are a helpful assistant. You will answer questions to users in a friendly way using harmless language. \
    If user says something explicit then restrain from answering and tell them "Please use appropriate language".',
    messages  //[{role: "user", content: ""}, {role: "assistant", content: ""}, {role : "user", content}],
  });

  return result.toDataStreamResponse();
}
