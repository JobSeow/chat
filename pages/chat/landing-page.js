import { useState, FormEvent } from 'react'
import { addMessage } from '../../lib/dynamodb';
import { analyze } from '../../utils/ai'
import addMessageAPI from '../api/add-message';
export default function FirstPost() {
    const [message, setMessage] = useState('')
    const [chat, setChat] = useState('')

    const sendMessage = async () => {
        result = await addMessageAPI("user123",message)
        console.log(result)
    }

    return (
        <div className="bg-[#44465371] text-white rounded-lg text-md">
            {/* <form onSubmit={sendMessage} className="p-5 space-x-5 flex"> */}
                <textarea
                    className="
                        bg-transparent 
                        focus:outline-none 
                        flex-1
                        disabled:cursor-not-allowed 
                        disabled:text-grey-300"
                    // disabled={!session}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    type="text"
                    placeholder="Send a message."
                />

                {/* send button */}
                <button
                    // disabled={!prompt || !session}
                    type="submit"
                    className="text-gray-200 
                                hover:  px-2 py-1 rounded
                                disabled:text-gray-500 disabled:cursor-not-allowed"
                    onClick={sendMessage}
                >
                    {/* <PaperAirplaneIcon className="h-4 w-4 -rotate-45 " /> */}
                    Submit
                </button>
            {/* </form> */}

            <div>{message}</div>
        </div>
    )
}
