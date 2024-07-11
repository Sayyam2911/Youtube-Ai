import {type Model, models, type Prompt, prompts} from '@/utils/constants';
import {createContext, useContext, useEffect, useState} from 'react';
import React from "react";
import generateCompletion from "~background/ports/completion";
import {useExtension} from "./extension-context";

interface SummaryContextInterface {
    summaryModel : Model,
    setSummaryModel : (model : Model) => void,
    summaryPrompt : Prompt,
    setSummaryPrompt : (prompt : Prompt) => void,
    summaryContent : string | null,
    setSummaryContent : (content : string | null) => void,
    summaryIsError : boolean,
    setSummaryIsError : (isError : boolean) => void,
    summaryIsGenerating : boolean,
    setSummaryIsGenerating : (isGenerating : boolean) => void,
    generateSummary : (e: any) => void
}

const SummaryContext = createContext<SummaryContextInterface | undefined>(undefined);

export function useSummary() {
    const context = useContext(SummaryContext)
    if (!context) {
        throw new Error('useSummary must be used within a SummaryProvider')
    }
    return context
}

interface SummaryProvideProps {
    children : React.ReactNode
}

export function SummaryProvider({children} : SummaryProvideProps) {
    const [summaryModel, setSummaryModel] = useState<Model>(models[0]);
    const [summaryPrompt, setSummaryPrompt] = useState<Prompt>(prompts[0]);
    const [summaryContent, setSummaryContent] = useState<string | null>(null);
    const [summaryIsError, setSummaryIsError] = useState<boolean>(false);
    const [summaryIsGenerating, setSummaryIsGenerating] = useState<boolean>(false);

const {extensionData, extensionLoading} = useExtension()
    const summaryGenerate = {
        message: undefined,
        error: false,
    }

    function delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function generateSummary(e: any) {
        e.preventDefault();
        if(summaryContent !== null) {
            setSummaryContent(null)
        }
        setSummaryIsGenerating(true)
        setSummaryIsError(false)
        try{
            const response = await generateCompletion(summaryModel.content, summaryPrompt.content, extensionData)
            let summaryContent = ""
            for(let i=0; i<response.message.length; i++){
                await delay(10);
                summaryContent += response.message[i]
                setSummaryContent(summaryContent)
            }
            setSummaryIsGenerating(false)
            setSummaryIsError(false)
        }
        catch(e){
            setSummaryIsError(true)
            setSummaryIsGenerating(false)
            setSummaryContent(null);
            console.log("Error Recieved at Summary Context",e);
        }
        //const summaryGenerate = generateCompletion(summaryModel.content, summaryPrompt.content, extensionData).then((response) => {console.log("response",response)})
        console.log("Port Send Request Completed")
    }

    useEffect(() => {
        setSummaryContent(null);
        setSummaryIsGenerating(false)
        setSummaryIsError(false)
    },[extensionLoading])

    const value = {
        summaryModel,
        setSummaryModel,
        summaryPrompt,
        setSummaryPrompt,
        summaryContent,
        setSummaryContent,
        summaryIsError,
        setSummaryIsError,
        summaryIsGenerating,
        setSummaryIsGenerating,
        generateSummary
    }

    return (<SummaryContext.Provider value = {value}>
        {children}
    </SummaryContext.Provider>)
}