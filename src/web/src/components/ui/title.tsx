import type { HasChildrenProps } from "@/types/generalTYpes";
import type { JSX } from "react";


export function Title1({children , className = "" , ...props} : HasChildrenProps) : JSX.Element {
    return (
        <h1 className={className + "scroll-m-20 text-xl font-semibold text-neutral-900"} {...props}>
            {children}
        </h1>
    )
}