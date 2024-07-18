import type {RefObject} from "react";
import {useRef} from "react";
import React from "react";

export function useEnterSubmit():{
    formRef: RefObject<HTMLFormElement>
    onKeyDown : (e: React.KeyboardEvent<HTMLTextAreaElement>) => void
    onKeyUp : (e: React.KeyboardEvent<HTMLTextAreaElement>) => void
}{
    const formRef = useRef<HTMLFormElement>(null)
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>):void =>{
        e.stopPropagation()
        if(e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing){
            formRef.current?.requestSubmit()
            e.preventDefault()
        }
    }
    const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>):void =>{
        e.stopPropagation()
    }
    return {formRef, onKeyDown: handleKeyDown, onKeyUp: handleKeyUp}
}