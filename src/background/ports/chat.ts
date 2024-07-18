import {GoogleGenerativeAI} from "@google/generative-ai";
const genAI = new GoogleGenerativeAI("AIzaSyDBAn1NIwh94uwHXnNDOVjvOmHvAIqyBUk");

const SYSTEM = `
    You are a helpful assistant, Given the metadata and transcript of a YouTube video. Your primary task is to provide accurate and relevant answers to any questions based on this information. Use the available details effectively to assist users with their inquiries about the video's content, context, or any other related aspects.
    
    START OF METADATA
    Video Title: {title}
    END OF METADATA
    
    START OF TRANSCRIPT
    {transcript}
    END OF TRANSCRIPT
    
    GENERATE RESPONSE TO THE LAST QUERY/STATEMENT IN THE CHAT BASED ON CONVERSATION, METADATA, AND TRANSCRIPT.
    START OF CHAT
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
    const messagesBody = messages.map((message: any) => message.content).join("\n");
    const newBody = `${SYSTEM_WITH_CONTEXT}\n${messagesBody}`;
    const result = await model1.generateContent(newBody);
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
        console.log(e)
        return {message : "Getting Error from Gemini Chat Completion", error : true}
    }
}

export default generateChatCompletion;