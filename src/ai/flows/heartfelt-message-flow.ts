'use server';
/**
 * @fileOverview A flow for generating a heartfelt birthday message.
 *
 * - generateHeartfeltMessage - A function that creates a heartfelt message.
 * - HeartfeltMessageInput - The input type for the generateHeartfeltMessage function.
 * - HeartfeltMessageOutput - The return type for the generateHeartfeltMessage function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const HeartfeltMessageInputSchema = z.object({
  name: z.string().describe('The name of the person celebrating their birthday.'),
});
export type HeartfeltMessageInput = z.infer<typeof HeartfeltMessageInputSchema>;

const HeartfeltMessageOutputSchema = z.object({
  message: z.string().describe('The generated heartfelt birthday message.'),
});
export type HeartfeltMessageOutput = z.infer<
  typeof HeartfeltMessageOutputSchema
>;

export async function generateHeartfeltMessage(
  input: HeartfeltMessageInput
): Promise<HeartfeltMessageOutput> {
  return heartfeltMessageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'heartfeltMessagePrompt',
  input: { schema: HeartfeltMessageInputSchema },
  output: { schema: HeartfeltMessageOutputSchema },
  prompt: `You are an expert at writing warm, personal, and heartfelt birthday messages.
You are writing a message for someone named {{{name}}} who is turning 18.
The message should feel like a long, touching essay.
It should be filled with warmth, encouragement, and beautiful wishes for their future.
Make it sound personal and deeply meaningful, celebrating their journey into adulthood.
Reflect on the significance of turning 18, the adventures that lie ahead, and the wonderful person they have become.
Keep the tone celebratory, a little nostalgic, and very hopeful.

Do not include a salutation (like "Dear {{{name}}},") or a closing (like "With love,"). Just provide the body of the message. Write at least 4 paragraphs.
`,
});

const heartfeltMessageFlow = ai.defineFlow(
  {
    name: 'heartfeltMessageFlow',
    inputSchema: HeartfeltMessageInputSchema,
    outputSchema: HeartfeltMessageOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
