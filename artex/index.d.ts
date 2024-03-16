/**
 * Create a Chatbot for your application at your ease just by following simple steps
 * @param {object} dataset - Your personalised dataset for chatbot to work with
 * @param {number} temperatue - Manage randomness by using numbers between 1 - 100
 */

declare class ChatBot {
    constructor(dataset: object, temperature?: number)
    /**
     * chat with the bot and get response as per your dataset
     * @param {string} query - Enter the user query
     */
    chat(query: string): string[]
}

export default ChatBot