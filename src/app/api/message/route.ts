import { openai } from '@ai-sdk/openai';
import { streamText, convertToCoreMessages } from 'ai';
import {initialProgrammerMessages} from "@/app/api/message/messages"
export const runtime = 'edge';
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Ensure messages is an array and contains valid CoreMessage objects
    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response("Invalid request body", { status: 400 });
    }

    const result = await streamText({
      model: openai('gpt-4-turbo'), // Use a valid model name
      messages: convertToCoreMessages(messages),
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Error processing request:', error);
    return new Response("Error processing request", { status: 500 });
  }
}
