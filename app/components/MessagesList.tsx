import React from 'react'
import {Message as TMessges} from 'ai/react'
import Messages from './Messages'

const MessagesList = ({messages} : {messages :TMessges[]}) => {
  return (
    <div className='space-y-2'>
        {messages.map((message , index)=>(
            <Messages key={index} content={message.content} isUserMessage={message.role === "user"}></Messages>
        ))}
    </div>
  )
}

export default MessagesList