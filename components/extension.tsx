import {Collapsible} from "../@/components/ui/collapsible";
import {useExtension} from "../contexts/extension-context";

export default function Extension(){
    const {
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
    } = useExtension()
    return (
      <main className={'antialiased w-full mb-3 z-10'}>
        <div className={'w-full'}>
            <Collapsible className={'space-y-3'}>
                <p>Extension Page</p>
            </Collapsible>
        </div>
      </main>
    )
}