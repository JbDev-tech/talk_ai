import React from 'react'
import ReactMarkdown from 'react-markdown'

interface MessageProps {
    content: string;
    isUserMessage: boolean;
}

const Messages = ({ content, isUserMessage }: MessageProps) => {
    const filteredContent = content.startsWith("Réponds en français : ")
        ? content.replace("Réponds en français : ", "")
        : content

    return (
        <div className={`flex w-full ${isUserMessage ? 'justify-end' : ''}`}>
            <div className={`max-w-4xl p-4 break-words ${isUserMessage ? 'bg-base-300 rounded-3xl' : 'w-full'}`}>
                {isUserMessage ? (
                    filteredContent
                ) : (
                    <ReactMarkdown
                        components={{
                            p: ({ children }) => <p className="mb-3">{children}</p>,
                            ul: ({ children }) => <ul className="list-disc pl-6 mb-3 space-y-1">{children}</ul>,
                            ol: ({ children }) => <ol className="list-decimal pl-6 mb-3 space-y-1">{children}</ol>,
                            strong: ({ children }) => <strong className="font-bold">{children}</strong>,
                            code: ({ children }) => <code className="bg-base-300 px-1 rounded">{children}</code>,
                        }}
                    >
                        {filteredContent}
                    </ReactMarkdown>
                )}
            </div>
        </div>
    )
}

export default Messages