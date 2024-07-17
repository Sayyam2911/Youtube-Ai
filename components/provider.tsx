import {ExtensionProvider} from "@/contexts/extension-context";
import {SummaryProvider} from "@/contexts/summary-context";
import {TranscriptProvider} from "@/contexts/transcript-context";

export default function Providers({children}){
    return <ExtensionProvider>
        <SummaryProvider>
            <TranscriptProvider>
                {children}
            </TranscriptProvider>
        </SummaryProvider>
    </ExtensionProvider>
}