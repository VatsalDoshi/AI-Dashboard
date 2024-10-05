import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { object, z } from 'zod';
import dotenv from 'dotenv';
dotenv.config();

async function main(user_prompt: string) {
 
  const { object } = await generateObject({
    model: openai('gpt-4-turbo'),
    maxTokens: 512,
    system: "You are an expert in image captioning in one line. User will give you a text or explaination of what that user has in image and you will generate 5 different image captions for instagram, strictly in one line, \
    using safe words and harmonal tone. If user give sexsual image you avoid generating image caption.",
    schema: z.object({
      caption_1: z.string(),
      caption_2: z.string(),
      caption_3: z.string(),
      caption_4: z.string(),
      caption_5: z.string(),
    }),
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: user_prompt,
          }
        ],
      },
    ],
  });

  return JSON.stringify(object);
}

main("So yesterday I went to a beach. It had white sands and the blue pritine water. I was even able to spot some sting rays near the coast. I finf them interesting.\
    The beach was really beautiful.").then(response => console.log(response));