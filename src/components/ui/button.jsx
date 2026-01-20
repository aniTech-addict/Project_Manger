import * as React from "react"
import { cn } from "../../lib/utils"

const Button = React.forwardRef(({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
        <button
            ref={ref}
            className={cn(
                "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-white",
                {
                    "bg-blue-600 text-white hover:bg-blue-700 shadow-sm": variant === "default",
                    "bg-red-50 text-red-600 hover:bg-red-100": variant === "destructive",
                    "border border-gray-200 bg-white hover:bg-gray-50 text-gray-700": variant === "outline",
                    "hover:bg-gray-100 text-gray-700": variant === "ghost",
                    "bg-gray-100 text-gray-900 hover:bg-gray-200": variant === "secondary",
                    "h-10 py-2 px-4": size === "default",
                    "h-9 px-3": size === "sm",
                    "h-11 px-8": size === "lg",
                    "h-9 w-9 p-0": size === "icon",
                },
                className
            )}
            {...props}
        />
    )
})
Button.displayName = "Button"

export { Button }
