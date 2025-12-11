"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const { toast } = useToast();
  const [status, setStatus] = useState<FormStatus>("idle");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setStatus("submitting");
    try {
      // NOTE: Replace with your own form endpoint
      const response = await fetch("https://formspree.io/f/YOUR_FORM_ID_HERE", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      setStatus("error");
      toast({
        variant: "destructive",
        title: "Error",
        description: "Your message could not be sent. Please try again later.",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-normal tracking-widest uppercase text-xs text-foreground/60">Name</FormLabel>
              <FormControl>
                <Input {...field} />
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
              <FormLabel className="font-normal tracking-widest uppercase text-xs text-foreground/60">Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-normal tracking-widest uppercase text-xs text-foreground/60">Message</FormLabel>
              <FormControl>
                <Textarea
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col items-center pt-6 gap-6">
            {status === 'success' ? (
                <p className="text-center text-green-600">Thank you for your message. We will respond if the inquiry is qualified.</p>
            ) : (
                <>
                    <Button type="submit" variant="outline" size="lg" disabled={status === "submitting"} className="w-full md:w-auto px-16 tracking-widest uppercase text-xs">
                        {status === "submitting" ? "Submitting..." : "Submit Inquiry"}
                    </Button>
                    <p className="text-xs text-center text-foreground/50 max-w-sm">
                        Sohn Enterprises responds exclusively to qualified professional inquiries.
                    </p>
                </>
            )}
        </div>
      </form>
    </Form>
  );
}
