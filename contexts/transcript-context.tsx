import type {Transcript} from "@/utils/constants";
import React, {createContext} from "react";
import {useExtension} from "@/contexts/extension-context";
import {cleanJsonTranscript} from "@/utils/functions";

interface TranscriptContext{
    transcriptSearch: string,
    setTranscriptSearch: (search: string) => void,
    transcriptJSON : Transcript[],
}

const TranscriptContext = createContext<TranscriptContext | undefined>(undefined);

export function useTranscript(){
    const context = React.useContext(TranscriptContext)
    if (!context) {
        throw new Error('useTranscript must be used within a TranscriptProvider')
    }
    return context
}

interface TranscriptProviderProps {
    children : React.ReactNode
}

export function TranscriptProvider({children} : TranscriptProviderProps) {
    const [transcriptSearch, setTranscriptSearch] = React.useState<string>("");

    const {extensionLoading,extensionData} = useExtension()

    const transcriptJSON = React.useMemo(() => {
        if(!extensionData && extensionData && extensionData.transcript){
            return cleanJsonTranscript(extensionData.transcript)
        }
        return []
    },[extensionData,extensionLoading])


    const value = {
        transcriptSearch,
        setTranscriptSearch,
        transcriptJSON
    }

    return (
        <TranscriptContext.Provider value={value}>
            {children}
        </TranscriptContext.Provider>
    )
}