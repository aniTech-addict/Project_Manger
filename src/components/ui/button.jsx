import * as React from 'react';
import { cn } from '../../lib/utils';

const Button = React.forwardRef(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-white active:scale-95',
          {
            'bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-md active:shadow-sm':
              variant === 'default',
            'bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 shadow-sm':
              variant === 'destructive',
            'border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 hover:border-gray-400 shadow-sm hover:shadow':
              variant === 'outline',
            'hover:bg-gray-100 text-gray-700 hover:text-gray-900':
              variant === 'ghost',
            'bg-gray-100 text-gray-900 hover:bg-gray-200 shadow-sm':
              variant === 'secondary',
            'h-10 py-2 px-4 text-sm': size === 'default',
            'h-9 px-3 text-sm': size === 'sm',
            'h-11 px-8 text-base': size === 'lg',
            'h-9 w-9 p-0': size === 'icon',
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };
