import {ExtensionProvider} from "../contexts/extension-context";
import {SummaryProvider} from "../contexts/summary-context";

export default function Providers({children}){
    return <ExtensionProvider>
        <SummaryProvider>
        {children}
        </SummaryProvider>
    </ExtensionProvider>
}