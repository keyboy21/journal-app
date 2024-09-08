'use client'

import { useState } from "react";
import { Item } from "./Item";
import { Column } from "./Column";
import { Class, Student } from "@/types";
// DnD
import {
     DndContext,
     DragEndEvent,
     DragOverlay,
     DragStartEvent,
     KeyboardSensor,
     PointerSensor,
     closestCorners,
     useSensor,
     useSensors,
} from '@dnd-kit/core';
import {
     SortableContext,
     sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';


export const MultipleContainer = ({ classes, newStudents }: MultipleContainerProps) => {

     const [containers, setContainers] = useState<Class[]>(classes)
     const [unassignedStudents, setUnassignedStudents] = useState<Student[]>(newStudents);
     // Store drag source and target ids
     const [activeStudent, setActiveStudent] = useState<Student | null>(null);
     // DND Handlers
     const sensors = useSensors(
          useSensor(PointerSensor),
          useSensor(KeyboardSensor, {
               coordinateGetter: sortableKeyboardCoordinates,
          }),
     );

     const handleDragStart = (event: DragStartEvent) => {
          console.log('start-event', event)
          setActiveStudent({
               id: event.active.data.current?.id,
               name: event.active.data.current?.name,
               surname: event.active.data.current?.surname,
               email: event.active.data.current?.email
          });
     };

     const handleDragEnd = (event: DragEndEvent) => {
          const { active, over } = event;
          console.log('over', over)
     };

     return (
          <DndContext
               sensors={sensors}
               collisionDetection={closestCorners}
               onDragStart={handleDragStart}
               onDragEnd={handleDragEnd}
          >
               <div className="flex flex-row gap-5 justify-start overflow-x-scroll py-10 w-full">
                    {containers.map((container) => (
                         <Column
                              id={container.code}
                              key={container.code}
                              classId={container.id}
                              classCode={container.code}
                              classColor={container.classColor}
                              className={container.name}
                         >
                              <SortableContext items={container.students.map((i) => i.id)}>
                                   <div className="flex items-start flex-col gap-y-4">
                                        {container.students.map((student) => (
                                             <Item
                                                  id={student.id}
                                                  key={student.id}
                                                  name={student.name}
                                                  surname={student.surname}
                                                  email={student.email}
                                             />
                                        ))}
                                   </div>
                              </SortableContext>
                         </Column>
                    ))}
                    <Column
                         id={`newStudents${unassignedStudents.length + 1}`}
                         key={'newStudents'}
                         classId={unassignedStudents.length + 1}
                         classCode={'newStudents'}
                         className={'New Students'}
                    >
                         <SortableContext items={unassignedStudents}>
                              <div className="flex items-start flex-col gap-y-4">
                                   {unassignedStudents.map((student) => (
                                        <Item
                                             id={student.id}
                                             key={student.id}
                                             name={student.name}
                                             surname={student.surname}
                                             email={student.email}
                                        />
                                   ))}
                              </div>
                         </SortableContext>
                    </Column>
               </div>
               <DragOverlay adjustScale={false}>
                    {activeStudent &&
                         <Item
                              id={activeStudent.id}
                              name={activeStudent.name}
                              surname={activeStudent.surname}
                              email={activeStudent.email}

                         />}
               </DragOverlay>
          </DndContext>
     )
}

interface MultipleContainerProps {
     classes: Class[];
     newStudents: Student[]
}