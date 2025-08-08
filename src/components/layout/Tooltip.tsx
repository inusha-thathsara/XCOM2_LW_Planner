import React from 'react';
interface TooltipProps {
  content: string;
  children: React.ReactNode;
}
const Tooltip: React.FC<TooltipProps> = ({
  content,
  children
}) => {
  return <div className="relative group">
      {children}
      <div className="absolute z-10 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 bottom-full left-1/2 -translate-x-1/2 mb-2 w-48">
        <div className="bg-gray-900 text-gray-100 text-xs rounded-lg py-2 px-3 shadow-lg">
          {content}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-1">
            <div className="border-4 border-transparent border-t-gray-900" />
          </div>
        </div>
      </div>
    </div>;
};
export default Tooltip;