import {ExtensionProvider} from "@/contexts/extension-context";
import {SummaryProvider} from "@/contexts/summary-context";
import {TranscriptProvider} from "@/contexts/transcript-context";
import {ChatProvider} from "@/contexts/chat-context";

export default function Providers({children}){
    return <ExtensionProvider>
        <SummaryProvider>
            <TranscriptProvider>
                <ChatProvider>
                    {children}
                </ChatProvider>
            </TranscriptProvider>
        </SummaryProvider>
    </ExtensionProvider>
}