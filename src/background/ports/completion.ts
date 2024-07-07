import {GoogleGenerativeAI} from "@google/generative-ai";
import type {PlasmoMessaging} from "@plasmohq/messaging";

const genAI = new GoogleGenerativeAI(process.env.API_KEY)

async function createCompletion(model : string, prompt: string, context : any){
    const parsed = context.transcript.events.filter((event :{segs : any}) => event.segs).map((x : {segs : any[]}) => x.segs.map((y : {utf8: any}) => y.utf8).join(" ")).join(" ").replace(/[\u200B-\u200D\uFEFF]/g, "").replace(/\s+/g, " ")

    const USER = `${prompt}\n\nVideo Title: ${context.metadata.title}\nVideo Transcript: ${parsed}`;

    // Create a chat model
    const chatModel = genAI.getGenerativeModel({ model: model || 'gemini-pro' });

    // Start the chat and generate content
    const chat = chatModel.startChat();
    const result = await chat.sendMessageStream(USER);

    // Convert the result to a ReadableStream
    return new ReadableStream({
        async start(controller) {
            for await (const chunk of result.stream) {
                controller.enqueue(chunk.text());
            }
            controller.close();
        },
    });
}

const handler: PlasmoMessaging.PortHandler = async (req, res) => {
    let cumulativeData = "";
    const prompt = req.body.prompt;
    const model = req.body.model;
    const context = req.body.context;

    try {
        const completionStream = await createCompletion(model, prompt, context);

        const reader = completionStream.getReader();

        while (true) {
            const { done, value } = await reader.read();

            if (done) {
                res.send({ message: "END", error: "", isEnd: true });
                break;
            }

            cumulativeData += value;
            res.send({ message: cumulativeData, error: "", isEnd: false });
        }
    } catch (error) {
        console.error('Error in Gemini completion:', error);
        res.send({ error: "Something went wrong with the Gemini API" });
    }
};


export default handler;