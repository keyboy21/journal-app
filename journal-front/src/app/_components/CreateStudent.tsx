'use client'

import { createUser } from "@/actions/createUser.actions";
import { Button } from "@/components/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/form";
import { Input } from "@/components/input";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/sheet";
import { useSheet } from "@/hooks/useModal";
import { createStudentSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const CreateStudent = () => {

     const { close, open, visible } = useSheet()

     const form = useForm<z.infer<typeof createStudentSchema>>({
          resolver: zodResolver(createStudentSchema),
          defaultValues: {
               name: "",
               surname: "",
               email: "",
          },
     });

     const onSave = async (formData: z.infer<typeof createStudentSchema>) => {
          const res = await createUser(formData);

          if (res.ok) {
               form.reset();
               close();
          }

     };

     return (
          <Sheet open={visible}>
               <Button onClick={open}>
                    Create User
               </Button>

               <SheetContent>
                    <SheetHeader>
                         <SheetTitle>
                              Create User
                         </SheetTitle>
                    </SheetHeader>
                    <SheetContent>
                         <Form {...form}>
                              <form
                                   onSubmit={form.handleSubmit(onSave)}
                                   className="flex flex-col gap-y-3"
                              >
                                   <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                             <FormItem>
                                                  <FormLabel>Student Name</FormLabel>
                                                  <FormControl>
                                                       <Input required placeholder="Name" {...field} />
                                                  </FormControl>
                                                  <FormMessage />
                                             </FormItem>
                                        )}
                                   />
                                   <FormField
                                        control={form.control}
                                        name="surname"
                                        render={({ field }) => (
                                             <FormItem>
                                                  <FormLabel>Student Surname</FormLabel>
                                                  <FormControl>
                                                       <Input required placeholder="Surname" {...field} />
                                                  </FormControl>
                                                  <FormMessage />
                                             </FormItem>
                                        )}
                                   />
                                   <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                             <FormItem>
                                                  <FormLabel>Student Email</FormLabel>
                                                  <FormControl>
                                                       <Input required placeholder="Email" {...field} />
                                                  </FormControl>
                                                  <FormMessage />
                                             </FormItem>
                                        )}
                                   />
                                   <SheetFooter className="flex gap-3">
                                        <Button color="green" type="submit">
                                             Create
                                        </Button>
                                        <Button onClick={close} color="red">
                                             Cancel
                                        </Button>
                                   </SheetFooter>
                              </form>
                         </Form>
                    </SheetContent>
               </SheetContent>
          </Sheet>
     )
}

