import {ExtensionProvider} from "../contexts/extension-context";

export default function Providers({children}){
    return <ExtensionProvider>
        {children}
    </ExtensionProvider>
}