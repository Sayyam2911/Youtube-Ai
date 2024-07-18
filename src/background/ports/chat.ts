import {GoogleGenerativeAI} from "@google/generative-ai";
const genAI = new GoogleGenerativeAI("AIzaSyDr47xqvHXeipm2WwsSMCOxD4d4GaiNDFU");

const SYSTEM = `
    You are a helpful assistant, Given the metadata and transcript of a YouTube video. Your primary task is to provide accurate and relevant answers to any questions based on this information. Use the available details effectively to assist users with their inquiries about the video's content, context, or any other related aspects.
    
    START OF METADATA
    Video Title: {title}
    END OF METADATA
    
    START OF TRANSCRIPT
    {transcript}
    END OF TRANSCRIPT
`

async function createChatCompletion(model: string, messages:any, context: any) {
    const model1 = genAI.getGenerativeModel({ model: model});
    const parsed = context.transcript.events
        .filter((x: { segs: any }) => x.segs)
        .map((x: { segs: any[] }) =>
            x.segs.map((y: { utf8: any }) => y.utf8).join(" ")
        )
        .join(" ")
        .replace(/[\u200B-\u200D\uFEFF]/g, "")
        .replace(/\s+/g, " ")
    const SYSTEM_WITH_CONTEXT = SYSTEM.replace("{title}", context.metadata.title).replace("{transcript}", parsed);
    messages.unshift(SYSTEM_WITH_CONTEXT);
    const result = await model1.generateContent(messages);
    const response = result.response
    const text = response.text();
    console.log(text);
    return text;
}

async function generateChatCompletion(model: string, messages: any, context: any) {
    try{
        const completion = await createChatCompletion(model, messages, context)
        console.log("Completion", completion)
        return {message : completion, error : false}
    }
    catch(e){
        return {message : "Getting Error from Gemini Summary Completion", error : true}
    }
}

export default generateChatCompletion;