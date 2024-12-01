import { addMessage, getMessagesByUserId } from '../../lib/dynamodb';
import { v4 as uuidv4 } from 'uuid';
import { analyze } from '../../utils/ai';
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { userId, content } = req.body;
        
        if (!userId || !content) {
            return res.status(400).json({ error: 'userId and content are required' });
        }

        const messageId = `${userId}-${Date.now()}`;  // Example: Generate a unique messageId using userId and current timestamp

        try {

            const result = await addMessage(messageId, userId, {role: 'user', content:content});
            const previousMessages =await getMessagesByUserId(userId)
            console.log(previousMessages)
            const context = previousMessages.map(message => message.messageContent);
            const analysisResult = await analyze(context, {role: 'user', content:content})
            // console.log(analysisResult)
            const { refusal, ...analysisResultToSave } = analysisResult.message;

            await addMessage(messageId, userId, analysisResultToSave);
            return res.status(200).json(analysisResult.message.content);
        } catch (error) {
            return res.status(500).json({ error: 'Failed to add message' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}