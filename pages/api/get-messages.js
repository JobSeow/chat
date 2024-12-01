import { getMessagesByMessageId, getMessagesByUserId } from '../../lib/dynamodb';

export default async function  handler(req, res) {
    const { messageId } = req.query;
    const { userId } = req.query;

    try {
        if (userId){
            const data = await getMessagesByUserId(userId);
            res.status(200).json(data);
        }else if(messageId){
            const data = await getMessagesByMessageId(messageId);
            res.status(200).json(data);
        }
      
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch item' });
    }
}
