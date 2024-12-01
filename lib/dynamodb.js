import AWS from 'aws-sdk';

AWS.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const getAllMessages = async () => {
    const params = {
        TableName: 'Messages',
    };

    try {
        const data = await dynamoDb.scan(params).promise();
        return data.Items; // Returns the messages
    } catch (error) {
        console.error('Error fetching messages:', error);
        throw new Error('Could not fetch messages');
    }
};

// Function to add a message
export const addMessage = async (messageId, userId, content) => {
    const params = {
        TableName: 'Messages',
        Item: {
            messageId,        // The unique identifier for the message
            userId,           // The ID of the user sending the message
            messageContent:content,          // The content of the message
            createdAt: new Date().toISOString(),  // Timestamp in ISO format
        },
    };

    try {
        await dynamoDb.put(params).promise();
        return { success: true, message: 'Message added successfully' };
    } catch (error) {
        console.error('Error adding message:', error);
        throw new Error('Could not add message');
    }
};

export const getMessagesByMessageId = async (messageId) => {
    const params = {
        TableName: 'Messages',
        KeyConditionExpression: 'messageId = :messageId',
        ExpressionAttributeValues: {
            ':messageId': messageId,
        },
    };

    try {
        const data = await dynamoDb.query(params).promise();
        return data.Items; // Returns the messages for the given userId
    } catch (error) {
        console.error('Error fetching messages by messageId:', error);
        throw new Error('Could not fetch messages for user');
    }
};

export const getMessagesByUserId = async (userId) => {
    const params = {
        TableName: 'Messages',
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
            ':userId': userId,
        },
    };

    try {
        const data = await dynamoDb.query(params).promise();
        return data.Items; // Returns the messages for the given userId
    } catch (error) {
        console.error('Error fetching messages by userId:', error);
        throw new Error('Could not fetch messages for user');
    }
};