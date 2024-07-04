import React, {createContext, useContext, useState} from "react";

interface ExtensionState {
    extensionContainer : any,
    extensionOpen : boolean,
    extensionTheme : string | null,
    extensionLoading : boolean,
    extensionPanel : string,
    extensionVideoId : string,
    extensionData : any
}

const initialState : ExtensionState = {
    extensionContainer : null,
    extensionOpen : false,
    extensionTheme : null,
    extensionLoading : false,
    extensionPanel : 'Summary',
    extensionVideoId : '',
    extensionData : null
}

interface ExtensionActions {
    setExtensionContainer : (container : any) => void
    setExtensionOpen : (isOpen : boolean) => void
    setExtensionTheme : (theme : string | null) => void
    setExtensionLoading : (loading : boolean) => void
    setExtensionPanel : (panel : string) => void
    setExtensionVideoId : (videoId : string) => void
    setExtensionData : (data : any) => void
    resetExtension : () => void
}

interface ExtensionContext extends ExtensionState, ExtensionActions {}

const ExtensionContext = createContext < ExtensionContext | undefined > (undefined)

export function useExtension(){
    const context = useContext(ExtensionContext)
    if(context === undefined){
        throw new Error('useExtension must be used within a ExtensionProvider')
    }
    return context
}

interface ExtensionProviderProps {
    children : React.ReactNode
}

export function ExtensionProvider({children} : ExtensionProviderProps){
    const [extensionContainer,setExtensionContainer] = useState<any>(initialState.extensionContainer)
    const [extensionOpen,setExtensionOpen] = useState<boolean>(initialState.extensionOpen)
    const [extensionTheme,setExtensionTheme] = useState<string | null>(initialState.extensionTheme)
    const [extensionLoading,setExtensionLoading] = useState<boolean>(initialState.extensionLoading)
    const [extensionPanel,setExtensionPanel] = useState<string>(initialState.extensionPanel)
    const [extensionVideoId,setExtensionVideoId] = useState<string>(initialState.extensionVideoId)
    const [extensionData,setExtensionData] = useState<any>(initialState.extensionData)

    function resetExtension(){
        setExtensionContainer(initialState.extensionContainer)
        setExtensionOpen(initialState.extensionOpen)
        setExtensionTheme(initialState.extensionTheme)
        setExtensionLoading(initialState.extensionLoading)
        setExtensionPanel(initialState.extensionPanel)
        setExtensionVideoId(initialState.extensionVideoId)
        setExtensionData(initialState.extensionData)
    }

    const value = {
        extensionContainer,
        extensionOpen,
        extensionTheme,
        extensionLoading,
        extensionPanel,
        extensionVideoId,
        extensionData,
        setExtensionContainer,
        setExtensionOpen,
        setExtensionTheme,
        setExtensionLoading,
        setExtensionPanel,
        setExtensionVideoId,
        setExtensionData,
        resetExtension
    }
    return (
        <ExtensionContext.Provider value={value}>
            {children}
        </ExtensionContext.Provider>
    )
}
