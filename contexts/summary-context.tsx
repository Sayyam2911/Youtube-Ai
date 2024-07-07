import {type Model, models, type Prompt, prompts} from '../utils/constants';
import {createContext, useContext, useEffect, useState} from 'react';
import {usePort} from "@plasmohq/messaging/dist/hook";
import React from "react";
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
    generateSummary : (e: any) => void,
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

    const port = usePort("completion")

    const {extensionData, extensionLoading} = useExtension()

    async function generateSummary(e: any) {
        e.preventDefault();
        if(summaryContent !== null) {
            setSummaryContent(null)
        }
        setSummaryIsGenerating(true)
        setSummaryIsError(false)
        port.send({
            prompts : summaryPrompt.content,
            model : summaryModel.content,
            context : extensionData
        })
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