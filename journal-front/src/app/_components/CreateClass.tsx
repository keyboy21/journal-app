'use client'

import { createClass } from "@/actions/createClass.action";
import { Button } from "@/components/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/form";
import { Input } from "@/components/input";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/sheet";
import { useSheet } from "@/hooks/useModal";
import { createClassSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const CreateClass = () => {

     const { close, open, visible } = useSheet()

     const form = useForm<z.infer<typeof createClassSchema>>({
          resolver: zodResolver(createClassSchema),
          defaultValues: {
               name: "",
               classColor: "",
          },
     });

     const onSave = async (formData: z.infer<typeof createClassSchema>) => {
          const res = await createClass(formData);

          if (res.ok) {
               form.reset();
               close();
          }

     };

     return (
          <Sheet open={visible}>
               <Button onClick={open}>
                    Create Class
               </Button>

               <SheetContent closeOnEscape closeOnOutside>
                    <SheetHeader>
                         <SheetTitle>
                              Create Class
                         </SheetTitle>
                    </SheetHeader>
                    <SheetContent onClose={close}>
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
                                                  <FormLabel>Class Name</FormLabel>
                                                  <FormControl>
                                                       <Input required placeholder="Name" {...field} />
                                                  </FormControl>
                                                  <FormMessage />
                                             </FormItem>
                                        )}
                                   />
                                   <FormField
                                        control={form.control}
                                        name="classColor"
                                        render={({ field }) => (
                                             <FormItem>
                                                  <FormLabel>Class Color</FormLabel>
                                                  <FormControl>
                                                       <Input
                                                            type="color"
                                                            required placeholder="color" {...field} />
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

