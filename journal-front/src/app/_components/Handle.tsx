import { GripVertical } from "lucide-react";
import { forwardRef } from "react";

export const Handle = forwardRef<HTMLSpanElement>(
     (props, ref) => {
          return (
               <span
                    className="cursor-grab"
                    ref={ref}
                    {...props}
               >
                    <GripVertical />
               </span>
          );
     }
);

Handle.displayName = "Handle"