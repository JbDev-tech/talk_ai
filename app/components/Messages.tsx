import React from 'react'


interface MessageProps {
    content : string;
    isUserMessage : boolean;
}

const Messages = ({content , isUserMessage} : MessageProps) => {
    const filteredContent = content.startsWith("Réponds en français : ")
        ? content.replace("Réponds en français : ","")
        :content
  return (
    <div className={`flex w-full ${isUserMessage ? 'justify-end' : ''}`}>
        <div className={`max-w-4xl p-4 break-work ${isUserMessage ? 'bg-base-300 rounded-3xl' : 'w-full'}`}>
            {filteredContent}
        </div>
    </div>
  )
}

export default Messages