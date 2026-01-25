"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import ImageUpload from "./ImageUpload";
import { Field, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Controller, useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const CategoryForm = () => {
  const { register, watch, handleSubmit, control, reset } = useForm({
    defaultValues: {
      name: "",
      images: [],
    },
  });

  const [loading, setLoading] = useState(false);

  const name = watch("name");
  const images = watch("images");

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const formData = new FormData();

      formData.append("name", data.name);
      if (data.images && data.images.length) {
        formData.append("image", data.images[0]);
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.message);
      else {
        reset();
        toast.success(result.message);
      }
    } catch (err) {
      toast.error(err.message || "Failed to add category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold">Category Info</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="py-2 space-y-2">
        <Field className="flex flex-col gap-2">
          <FieldLabel>Category Name</FieldLabel>
          <Input type="text" {...register("name")} />
        </Field>

        <Field>
          <FieldLabel>Image</FieldLabel>
          <Controller
            control={control}
            name="images"
            render={({ field }) => (
              <ImageUpload
                maxFiles={1}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </Field>

        <div className="flex justify-center">
          <Button
            type="submit"
            disabled={!name || !images}
            aria-label="Add category"
            className="cursor-pointer"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Add Category"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
