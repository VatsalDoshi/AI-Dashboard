import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';
import dotenv from 'dotenv';
dotenv.config();
import fs from 'fs/promises';
import path from 'path';

async function imageToBase64(imagePath: string): Promise<string> {
  const image = await fs.readFile(imagePath);
  return image.toString('base64');
}

async function main(user_prompt: string, imagePath: string) {
  const base64Image = await imageToBase64(imagePath);

  const { object } = await generateObject({
    model: openai('gpt-4-turbo'),
    maxTokens: 512,
    system: "You are an expert in image captioning in one line. User will give you an image and you will generate 5 different image captions for instagram, strictly in one line, \
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
          },
          {
            type: 'image',
            image: base64Image
          },
        ],
      },
    ],
  });

  return JSON.stringify(object);
}

main("generate captions for me for given image", "/Users/surajdesai/SignalOps/lambda-source/the-treasure-1203251.jpg").then(response => console.log(response));