'use client'

import { useState } from "react";
import { Column } from "./Column";
import { Item } from "./Item";
import { addToClass } from "@/actions/addToClass.action";
import { removeFromClass } from "@/actions/removeFromClass.action";
import { Class, Student } from "@/types";
import {
     DndContext,
     DragEndEvent,
     DragOverlay,
     DragStartEvent,
     KeyboardSensor,
     PointerSensor,
     useSensor,
     useSensors,
} from '@dnd-kit/core';
import {
     SortableContext,
     sortableKeyboardCoordinates,
     verticalListSortingStrategy,
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
          const { id, name, surname, email } = event.active.data.current || {};
          setActiveStudent({
               id,
               name,
               surname,
               email,
          });
     };

     const handleDragEnd = async (event: DragEndEvent) => {
          const { active, over } = event;
          console.log('over', over)
          // Check if a valid drop target exists
          if (!over) return;

          const activeId = active.id;
          const overId = over.id;

          // Case 1: Dragging a student from one class to another class
          const fromClassIndex = containers.findIndex((container) =>
               container.students.some((student) => student.id === activeId)
          );
          const toClassIndex = containers.findIndex(
               (container) => container.code === overId
          );

          // Case 2: Dragging a student from unassigned students to a class
          const isActiveFromUnassigned = unassignedStudents.some(
               (student) => student.id === activeId
          );

          // Check if student is being moved from unassigned students to a class
          const isOverUnassigned = over.data.current?.sortable.containerId === "unassigned-students";

          // Case 3: Dragging a student from one class to another class
          if (fromClassIndex !== -1 && toClassIndex !== -1) {
               // Move student between classes
               const fromClass = containers[fromClassIndex];
               const toClass = containers[toClassIndex];

               const studentToMove = fromClass.students.find(
                    (student) => student.id === activeId
               );

               if (studentToMove) {
                    const updatedFromClass = {
                         ...fromClass,
                         students: fromClass.students.filter(
                              (student) => student.id !== activeId
                         ),
                    };

                    const updatedToClass = {
                         ...toClass,
                         students: [...toClass.students, studentToMove],
                    };

                    const updatedContainers = [...containers];
                    updatedContainers[fromClassIndex] = updatedFromClass;
                    updatedContainers[toClassIndex] = updatedToClass;

                    setContainers(updatedContainers);
                    await addToClass({ classCode: toClass.code, studentId: studentToMove.id, classId: toClass.id })
               }
          } else if (isActiveFromUnassigned && toClassIndex !== -1) {
               // Move from unassigned students to a class
               const studentToMove = unassignedStudents.find(
                    (student) => student.id === activeId
               );

               if (studentToMove) {
                    const updatedUnassignedStudents = unassignedStudents.filter(
                         (student) => student.id !== activeId
                    );

                    const targetClass = containers[toClassIndex];
                    const updatedToClass = {
                         ...targetClass,
                         students: [...targetClass.students, studentToMove],
                    };

                    const updatedContainers = [...containers];
                    updatedContainers[toClassIndex] = updatedToClass;

                    // Correctly update both containers and unassigned students
                    setUnassignedStudents(updatedUnassignedStudents);
                    setContainers(updatedContainers);
                    await addToClass({ classCode: targetClass.code, studentId: studentToMove.id, classId: targetClass.id })
               }
          }
          // Case 4: Dragging a student from one class to unassigned students 
          else if (fromClassIndex !== -1 && isOverUnassigned) {
               // Move from a class to unassigned students
               const fromClass = containers[fromClassIndex];
               const studentToMove = fromClass.students.find(
                    (student) => student.id === activeId
               );

               if (studentToMove) {
                    const updatedFromClass = {
                         ...fromClass,
                         students: fromClass.students.filter(
                              (student) => student.id !== activeId
                         ),
                    };

                    const updatedUnassignedStudents = [...unassignedStudents, studentToMove];

                    const updatedContainers = [...containers];
                    updatedContainers[fromClassIndex] = updatedFromClass;

                    // Correctly update both containers and unassigned students
                    setContainers(updatedContainers);
                    setUnassignedStudents(updatedUnassignedStudents);
                    await removeFromClass({ classCode: fromClass.code, studentId: studentToMove.id, classId: fromClass.id })
               }
          }

          // Reset active student
          setActiveStudent(null);
     };

     return (
          <div className="flex flex-row gap-5 justify-start overflow-x-scroll py-10 w-full">
               <DndContext
                    sensors={sensors}
                    onDragStart={handleDragStart}     
                    onDragEnd={handleDragEnd}
               >
                    {classes.map((container) => (
                         <Column
                              id={container.code}
                              key={container.id}
                              classId={container.id}
                              classCode={container.code}
                              classColor={container.classColor}
                              className={container.name}
                         >
                              <SortableContext
                                   strategy={verticalListSortingStrategy}
                                   id={container.code}
                                   items={container.students.map((student) => student.id)}>
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
                    <div className="ml-12">
                         <h3 className="text-lg font-semibold text-center mb-5">New Students</h3>
                         <SortableContext
                              id="unassigned-students"
                              strategy={verticalListSortingStrategy}
                              items={newStudents.map((student) => student.id)}>
                              <div className="flex items-start flex-col gap-y-4">
                                   {newStudents.map((student) => (
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
          </div>
     )
}

interface MultipleContainerProps {
     classes: Class[];
     newStudents: Student[]
}