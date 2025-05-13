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
import { useEffect } from "react";
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

import { CinemaSchema } from "@/schemas";
import { add_new_cinema } from "@/actions/cinemanager_features/add_new_cinema";
import { getVerifiedCinemas } from "@/actions/cinemanager_features/getVerifiedCinemas";
import { useSession } from "next-auth/react";

const AddNewCinema = () => {
    const { data: session, status } = useSession();
    const [success, setSuccess] = useState<string | undefined>("");
    const [error, setError] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    
    function handleSubmit(values : z.infer<typeof CinemaSchema>): void {
      setError("");
      setSuccess("");
      startTransition(()=>{
        add_new_cinema(values).then((data)=>{
          setError(data?.error);
          setSuccess(data?.success);
        })
      })
    }
  
   
    const form = useForm<z.infer<typeof CinemaSchema>>({
      resolver: zodResolver(CinemaSchema),
      defaultValues: {
        name_of_cinema : "",
        address_of_cinema: "", 
        city_of_cinema: "", 
        country_of_cinema: "",
        tagline_of_cinema: "",
        name_of_owner: "",
        aadhar_number_of_owner: "",
        pan_number_of_owner: "",
        registered_by: session?.user.id
      },
    });
  return (
    <Dialog>
        <DialogTrigger asChild>
          <Button variant={"outline_red"}>Add New Cinema</Button>
        </DialogTrigger>
        <DialogContent  className="sm:max-w-[400px]  border-red-300 border-2">
          <DialogHeader className="heading text-transparent bg-clip-text bg-gradient-to-r to-red-600 from-orange-500">Add New Cinema</DialogHeader>
          <DialogDescription>
            Please give proper details to add Cinema
          </DialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name_of_cinema"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Enter Name of Cinema</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="@cinema_name"
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
                    name="address_of_cinema"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address of Cinema</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            disabled={isPending}
                            placeholder="@address"
                          ></Textarea>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  ></FormField>
                </div>

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="city_of_cinema"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Enter city of Cinema</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="@city"
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
                    name="country_of_cinema"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country of Cinema</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="@country"
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
                    name="tagline_of_cinema"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Enter Tagline of your Cinema</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="@tagline"
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
                    name="name_of_owner"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Enter your Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="@nameOfOwner"
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
                    name="aadhar_number_of_owner"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Enter your Aadhar Number</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="XXXXXXXXXX"
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
                    name="pan_number_of_owner"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Enter your PAN Number</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="XXXXXXXXXXX"
                            type="text"
                          ></Input>
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
                    Don't add cinema that is existing already!
                  </AlertDescription>
                </Alert>

                <DialogFooter>
                  <Button type="submit" variant={"outline_red"}>Get Verified🙂</Button>
                </DialogFooter>
              </form>
            </Form>
        </DialogContent>
      </Dialog>
  )
}

export default AddNewCinema
