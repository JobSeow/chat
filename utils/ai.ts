import OpenAI from "openai";
type Message = {
    role: 'user' | 'system' | 'assistant';  // Adjust roles as needed
    content: string;
  };

export const analyze = async (  context: Message[],         // context is an array of messages
incomingMessageContent: Message ) =>{
    const openai = new OpenAI()
    const allMessages = [...context, incomingMessageContent];
    const stream = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: allMessages,
    });

    return stream.choices[0]
}
