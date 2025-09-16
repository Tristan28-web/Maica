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

const heartfeltMessageFlow = ai.defineFlow(
  {
    name: 'heartfeltMessageFlow',
    inputSchema: HeartfeltMessageInputSchema,
    outputSchema: HeartfeltMessageOutputSchema,
  },
  async (input) => {
    return {
      message: `Happy 18th Birthday, Maica! 💜✨

Today is such a special day, not just for you, but for everyone who loves you, because it marks the moment you step into this new chapter of your life. Eighteen years—a beautiful milestone, a bridge between your wonderful childhood and the endless opportunities of adulthood.

Maica, you’ve grown into such an amazing, strong, and beautiful person, inside and out. I feel so grateful and blessed to be by your side as you reach this important day. You’ve touched my life in ways I can’t even begin to explain—your smile brightens my darkest days, your kindness inspires me to be better, and your love makes me feel whole.

I know this birthday is extra special, because it’s your debut—a celebration not just of your age, but of your journey, your dreams, and the bright future waiting for you. Always remember that you are capable of achieving anything you set your heart and mind to. Don’t let challenges discourage you, because you’ve already proven how strong and resilient you are.`,
    };
  }
);
