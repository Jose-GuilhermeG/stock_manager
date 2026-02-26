import type { HasChildrenProps } from "@/types/generalTYpes";
import type { JSX } from "react";
import { Title1 } from "./ui/title";

interface PageTitle extends HasChildrenProps{
    subTitle? : string
}

export default function PageTitle({children , subTitle , className = "" , props} : PageTitle) : JSX.Element {
 return (
    <div className={className + "mb-6"} {...props}>
        <Title1>
            {children}
        </Title1>
        {
            subTitle &&
            <p className="text-sm text-neutral-400 mt-0.5">
            {subTitle}
            </p>
        }
    </div>
 )
}