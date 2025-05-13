"use client";
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
import React, { useTransition } from "react";
import { useState, useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";

import FormError from "@/components/FormError";
import FormSuccess from "@/components/FormSuccess";

import { useSession } from "next-auth/react";

import { savePostDetailsInDb } from "@/actions/admin_features/savePostDetailsInDb";

const AddNewPost = () => {
  const { data: session, status } = useSession();
  const { register, handleSubmit } = useForm();
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const preset = "xlx4jqm1";
  const adminEmail = session?.user.email;
  const onSubmit = async (data: any) => {
    setError("");
    setSuccess("");
    try {
      const formData = new FormData();
      formData.append("file", data.post_image[0]);
      formData.append("upload_preset", preset);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dwu0hlosq/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        const imageUrl = responseData.secure_url;

        const post_title = data.post_title;
        const post_image = imageUrl;
        const post_description = data.post_description;
        const added_in_db = await savePostDetailsInDb(
          post_title,
          post_image,
          post_description,
          adminEmail
        );

        
          console.log("Image uploaded successfully:", imageUrl);
          setSuccess(added_in_db.success);
          setError(added_in_db.error);
          
      }
    } catch (error) {
      console.error("Error uploading post:", error);
      setError("Error uploading post");
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outlined_red_bordered" size={"lg"}>Add New Post</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[400px]  border-red-300 border-2">
          <DialogHeader className="heading text-transparent bg-clip-text bg-gradient-to-r to-red-600 from-orange-500">Add New Post</DialogHeader>
          <DialogDescription>
            Please give proper details to make a new post!
          </DialogDescription>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
            encType="multipart/form-data"
          >
            <Input
              {...register("post_title")}
              placeholder="Title"
              type="text"
            />
            <Input {...register("post_image")} type="file" multiple={false} />
            <Textarea
              {...register("post_description")}
              placeholder="Description"
            />
            <FormSuccess message={success}></FormSuccess>
            <FormError message={error}></FormError>
            <DialogFooter>
              <Button type="submit" variant={"outline_red"}>Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewPost;
