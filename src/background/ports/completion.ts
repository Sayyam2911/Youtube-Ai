import {GoogleGenerativeAI} from "@google/generative-ai";
const genAI = new GoogleGenerativeAI("AIzaSyDBAn1NIwh94uwHXnNDOVjvOmHvAIqyBUk");

async function createCompletion(model: string, prompt: string, context: any) {
    const model1 = genAI.getGenerativeModel({ model: model});
    const parsed = context.transcript.events
        .filter((x: { segs: any }) => x.segs)
        .map((x: { segs: any[] }) =>
            x.segs.map((y: { utf8: any }) => y.utf8).join(" ")
        )
        .join(" ")
        .replace(/[\u200B-\u200D\uFEFF]/g, "")
        .replace(/\s+/g, " ")
    const USER = `${prompt}\n\nVideo Title: ${context.metadata.title}\nVideo Transcript: ${parsed}`;
    console.log("User", USER)
    const result = await model1.generateContent(USER);
    const response = result.response
    const text = response.text();
    console.log(text);
    return text;
}

async function generateCompletion(model: string, prompt: string, context: any) {
    try{
        const completion = await createCompletion(model, prompt, context)
        console.log("Completion", completion)
        return {message : completion, error : false}
    }
    catch(e){
        return {message : "Getting Error from Gemini Summary Completion", error : true}
    }
}

export default generateCompletion;