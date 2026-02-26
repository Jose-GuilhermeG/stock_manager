import type { HasChildrenProps } from "@/types/generalTYpes";

interface FeatureStyle extends HasChildrenProps{
    color? : string;
    varient? : 'fill'| 'outiline';
    orientation? : 'horizontal' | 'vertical';
}


export function FeatureCardContainer({children , className = "" , ...props} : HasChildrenProps){
    return (
        <div className={className + " grid grid-cols-3 gap-5"} {...props}>
            {children}
        </div>
    )
}

export function FeatureCard({children , color = "white" , orientation = 'horizontal' , varient = 'fill' ,className = "" , ...props} : FeatureStyle){    
    return (
        <div className={className + " border border-neutral-200 rounded-xl p-4 shadow-sm min-h-[15vh] cursor-pointer hover:scale-105 transition-transform"} {...props} style={{color : color}}>
            {children}
        </div>
    )
}

export function FeatureCardContent({children , className = "" , ...props} : HasChildrenProps){
    return (
        <div className={className + " flex items-center justify-between mb-2"} {...props}>
            {children}
        </div>
    )
}

export function FeatureCardTitle({children , className = "" , ...props} : HasChildrenProps){
    return (
        <p className={className + " text-xs font-medium text-neutral-500 uppercase tracking-wide"} {...props}>
            {children}
        </p>
    )
}

export function FeatureCardIcon({children , className = "" , ...props} : HasChildrenProps){
    return (
        <div className={className + " w-8 h-8 rounded-lg flex items-center justify-center"} {...props}>
            {children}
        </div>
    )
}
export function FeatureCardText({children , className = "" , ...props} : HasChildrenProps){
    return (
        <p className={className + " text-2xl font-semibold text-neutral-900"} {...props}>
            {children}
        </p>
    )
}