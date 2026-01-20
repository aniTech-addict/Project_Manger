import * as React from "react"
import { cn } from "../../lib/utils"

const Badge = React.forwardRef(({ className, variant = "default", ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold same-height transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                {
                    "border-transparent bg-blue-100 text-blue-700 hover:bg-blue-200": variant === "default",
                    "border-transparent bg-gray-100 text-gray-700 hover:bg-gray-200": variant === "secondary",
                    "border-transparent bg-red-100 text-red-700 hover:bg-red-200": variant === "destructive",
                    "border-transparent bg-green-100 text-green-700": variant === "success",
                    "border-transparent bg-orange-100 text-orange-700": variant === "warning",
                    "text-gray-950 border-gray-200": variant === "outline",
                },
                className
            )}
            {...props}
        />
    )
})
Badge.displayName = "Badge"

export { Badge }
