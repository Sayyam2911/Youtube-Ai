import type {Message, Model, Prompt} from "@/utils/constants";
import {models} from "@/utils/constants"
import React, {createContext, useContext, useState} from "react";

interface ChatState {
    chatModel : Model
    chatIsGenerating : boolean
    chatIsError : boolean
    chatMessage : Message[] | undefined
    chatPrompt : string
    chatSuggestion : string[]
    chatIsGeneratingSuggestions : boolean
    chatIsErrorSuggestions : boolean
}

const initialState : ChatState = {
    chatModel : models[0],
    chatIsGenerating : false,
    chatIsError : false,
    chatMessage : [],
    chatPrompt : "",
    chatSuggestion : [],
    chatIsGeneratingSuggestions : false,
    chatIsErrorSuggestions : false,
}

interface ChatActions {
    setChatModel : (model : Model) => void,
    setChatIsGenerating : (isGenerating : boolean) => void,
    setChatIsError : (isError : boolean) => void,
    setChatMessage : (message: Message[]) => void,
    setChatPrompt : (prompt : string) => void,
    setChatSuggestion : (suggestion : string[]) => void,
    setChatIsGeneratingSuggestions : (isGeneratingSuggestions : boolean) => void,
    setChatIsErrorSuggestions : (isErrorGeneratingSuggestions : boolean) => void
}

interface ChatContext extends ChatState,ChatActions {}

const ChatContext = createContext<ChatContext | undefined>(undefined);

export function useChat(){
    const context = useContext(ChatContext)
    if(context === undefined){
        throw new Error('useChat must be used within a ChatProvider')
    }
    return context;
}

interface ChatProviderProps {
    children: React.ReactNode
}

export function ChatProvider({children }: ChatProviderProps){
    const [chatModel, setChatModel] = useState<Model>(initialState.chatModel)
    const [chatIsGenerating, setChatIsGenerating] = useState<boolean>(initialState.chatIsGenerating)
    const [chatIsError, setChatIsError] = useState<boolean>(initialState.chatIsError)
    const [chatMessage, setChatMessage] = useState<Message[]>(initialState.chatMessage)
    const [chatPrompt, setChatPrompt] = useState<string>(initialState.chatPrompt)
    const [chatSuggestion, setChatSuggestion] = useState<any[]>(initialState.chatSuggestion)
    const [chatIsGeneratingSuggestions, setChatIsGeneratingSuggestions] = useState<boolean>(initialState.chatIsGeneratingSuggestions)
    const [chatIsErrorSuggestions, setChatIsErrorSuggestions] = useState<boolean>(initialState.chatIsErrorSuggestions)

    const value = {
        chatModel,
        setChatModel,
        chatIsGenerating,
        setChatIsGenerating,
        chatIsError,
        setChatIsError,
        chatMessage,
        setChatMessage,
        chatPrompt,
        setChatPrompt,
        chatSuggestion,
        setChatSuggestion,
        chatIsGeneratingSuggestions,
        setChatIsGeneratingSuggestions,
        chatIsErrorSuggestions,
        setChatIsErrorSuggestions
    }

    return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}