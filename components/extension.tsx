import {Collapsible} from "../@/components/ui/collapsible";

export default function Extension(){
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