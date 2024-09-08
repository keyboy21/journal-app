import { cn } from "@/lib/utils";
import { Handle } from "./Handle";
import { UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export const Item = ({ id, name, surname, email }: DroppableProps) => {

     const {
          attributes,
          listeners,
          setNodeRef,
          transform,
          transition,
          isDragging,
     } = useSortable({
          id: id,
          data: {
               id: id,
               name: name,
               surname: surname,
               email: email,
               type: 'item',
          },
     });

     return (
          <div ref={setNodeRef}
               {...attributes}
               style={{
                    transition,
                    transform: CSS.Translate.toString(transform),
               }}
               className={cn(
                    'shadow-lg rounded-xl w-full border border-transparent hover:border-gray-200 cursor-pointer',
                    isDragging && 'opacity-50',
               )}
          >
               <span className="flex justify-between bg-primary text-white px-4 py-4 rounded-md">
                    <p>{`${name} ${surname}`}</p>
                    <Handle {...listeners} />
               </span >
          </div>
     )
}

interface DroppableProps {
     id: UniqueIdentifier;
     name: string
     surname: string
     email: string
}