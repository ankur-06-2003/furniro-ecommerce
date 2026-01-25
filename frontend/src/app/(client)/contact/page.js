"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import useAuth from "@/stores/userStore";

const Page = () => {
  const { user } = useAuth();

  const { register, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      subject: "",
      message: "",
    },
  });

  const name = watch("name");
  const email = watch("email");
  const message = watch("message");

  const onSubmit = async (data) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/messages`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      reset();

      toast.success(result.message);
    } catch (error) {
      toast.error("Failed to send message");
    }
  };
  return (
    <div className="px-2 md:px-4 lg:px-8 py-8 space-y-12">
      <div className="max-w-[520px] mx-auto flex flex-col items-center text-center">
        <h2 className="text-2xl font-bold">Get In Touch with Us</h2>
        <p className="text-muted-foreground">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae, eius
          facere. Quae, eius facere.
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-[5%] lg:gap-[10%]">
        <div className="max-w-[360px]">
          <div className="space-y-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <MapPin />
                <h4 className="font-semibold">Address</h4>
              </div>
              <p className="text-secondary-foreground">
                236 5th SE Avenue, New York NY10000, <br /> United States
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Phone />
                <h4 className="font-semibold">Phone</h4>
              </div>
              <p className="text-secondary-foreground">
                Mobile: <Link href={"tel:+845466789"}> +(84) 546-6789</Link>
                <br />
                Hotline: <Link href={"tel:+845466789"}>+(84) 456-6789</Link>
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Clock />
                <h4 className="font-semibold">Working Time</h4>
              </div>
              <p className="text-secondary-foreground">
                Monday-Friday: 9:00 - 22:00 <br /> Saturday-Sunday: 9:00 - 21:00
              </p>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-[360px]"
        >
          <FieldGroup className="gap-4">
            <Field className="gap-2">
              <FieldLabel htmlFor="name">Your Name</FieldLabel>
              <Input
                id="name"
                type="name"
                placeholder="John Doe"
                {...register("name")}
                readOnly={user}
                className={user && "cursor-not-allowed"}
              />
            </Field>
            <Field className="gap-2">
              <FieldLabel htmlFor="email">Email address</FieldLabel>

              <Input
                id="email"
                type="email"
                placeholder="john@doe.com"
                {...register("email")}
                readOnly={user}
                className={user && "cursor-not-allowed"}
              />
            </Field>
            <Field className="gap-2">
              <FieldLabel htmlFor="subject">Subject</FieldLabel>

              <Input
                id="subject"
                type="subject"
                placeholder="Product Inquiry"
                {...register("subject")}
              />
            </Field>
            <Field className="gap-2">
              <FieldLabel htmlFor="message">Message</FieldLabel>

              <Textarea
                id="message"
                type="message"
                placeholder="Your message here..."
                {...register("message")}
              />
            </Field>

            <Button
              disabled={!name || !email || !message}
              type="submit"
              aria-label="Submit"
              className="cursor-pointer"
            >
              Submit
            </Button>
          </FieldGroup>
        </form>
      </div>
    </div>
  );
};

export default Page;
