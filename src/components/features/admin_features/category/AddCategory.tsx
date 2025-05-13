"use client"
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import React, { useTransition } from "react";
import { useState, useRef } from "react";
import { RocketIcon } from "@radix-ui/react-icons";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormLabel,
  FormControl,
  FormField,
  FormMessage,
  FormItem,
} from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import FormError from "@/components/FormError";
import FormSuccess from "@/components/FormSuccess";

import { CategorySchema } from "@/schemas";
import { add_new_category } from "@/actions/admin_features/add_new_category";

const AddCategory = () => {
    const [success, setSuccess] = useState<string | undefined>("");
    const [error, setError] = useState<string | undefined>("");
    
    const [isPending, startTransition] = useTransition();
    
    function handleSubmit(values : z.infer<typeof CategorySchema>): void {
      setError("");
      setSuccess("");
      startTransition(()=>{
        add_new_category(values).then((data)=>{
          setError(data?.error);
          setSuccess(data?.success);
        })
      })
    }
  
    const form = useForm<z.infer<typeof CategorySchema>>({
      resolver: zodResolver(CategorySchema),
      defaultValues: {
        category_name: "",
        category_description: "",
      },
    });
  return (
    <Dialog>
        <DialogTrigger asChild>
          <Button variant={"outlined_red_bordered"} size={"lg"}>Add New Category</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[400px] border-red-300 border-2">
          <DialogHeader><div className="heading text-transparent bg-clip-text bg-gradient-to-r to-red-600 from-orange-500">Add New Category</div></DialogHeader>
          <DialogDescription>
            Please give proper details to add new category
          </DialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="category_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="@category_name"
                            type="text"
                          ></Input>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  ></FormField>
                </div>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="category_description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            disabled={isPending}
                            placeholder="Describe about category"
                          ></Textarea>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  ></FormField>
                </div>
                <FormError message={error} />
                <FormSuccess message={success} />

                <Alert variant={"destructive"}>
                  <RocketIcon className="h-4 w-4" />
                  <AlertTitle>Heads up!</AlertTitle>
                  <AlertDescription>
                    Don't add already existing Category
                  </AlertDescription>
                </Alert>

                <DialogFooter>
                  <Button type="submit" variant={"outline_red"}>Save Changes</Button>
                </DialogFooter>
              </form>
            </Form>
        </DialogContent>
      </Dialog>
  )
}

export default AddCategory
