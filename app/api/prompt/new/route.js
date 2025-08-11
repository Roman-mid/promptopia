import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';

export const POST = async (req) => {
  const { userId, prompt, tag } = await req.json();

  console.log({ userId, prompt, tag });

  try {
    await connectToDB();
    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag,
    });

    await newPrompt.save();

    console.log('Prompt saved:', newPrompt);

    return new Response(
      JSON.stringify({ message: 'Promt was created', prompt: newPrompt }),
      {
        status: 201,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error while creating prompt:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to create a new prompt' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
};
