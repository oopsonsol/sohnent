"use client";

import { SiteHeader } from "@/components/site-header";
import { FadeIn } from "@/components/fade-in";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function ContactPageContent() {
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();

  const [isSuccess, setIsSuccess] = useState(false);
  const [scriptKey, setScriptKey] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (pathname !== "/contact") return;

    const params = new URLSearchParams(window.location.search);
    const successParam = params.get("success") === "1";
    setIsSuccess(successParam);

    // Force Web3Forms client script to re-run when returning to /contact via internal navigation
    // (so it re-initializes the hCaptcha div each time)
    setScriptKey((k) => k + 1);
  }, [pathname]);

  const handleSendAnother = () => {
    router.replace("/contact");
    setIsSuccess(false);
    setScriptKey((k) => k + 1);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const form = formRef.current;
    if (!form) return;

    // Web3Forms docs: validate by checking textarea[name="h-captcha-response"]
    const captchaValue =
      (form.querySelector('textarea[name="h-captcha-response"]') as HTMLTextAreaElement | null)
        ?.value?.trim() ?? "";

    if (!captchaValue) {
      toast({
        title: "Captcha Required",
        description: "Please fill out captcha field.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const fd = new FormData(form);

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: fd,
        headers: { Accept: "application/json" },
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data || data.success !== true) {
        toast({
          title: "Submission Failed",
          description:
            (data && (data.message || data.error)) ||
            "Form submission failed. Please try again.",
          variant: "destructive",
        });

        // Re-init captcha so user can retry cleanly
        setScriptKey((k) => k + 1);
        return;
      }

      // Success: show OUR success UI (no Web3Forms pages)
      router.replace("/contact?success=1");
      setIsSuccess(true);
    } catch {
      toast({
        title: "Network Error",
        description: "Could not submit the form. Please try again.",
        variant: "destructive",
      });
      setScriptKey((k) => k + 1);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Web3Forms docs Step 2: Add the Web3Forms script */}
      {/* Key changes forces reload on internal nav so captcha initializes every time */}
      <Script
        key={scriptKey}
        src="https://web3forms.com/client/script.js"
        strategy="afterInteractive"
        async
        defer
      />

      <SiteHeader />
      <FadeIn duration={1600}>
        <section className="pt-28 md:pt-36 pb-24 md:pb-32">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-normal tracking-widest uppercase">
                CONTACT
              </h1>
              <p className="mt-4 text-base text-foreground/60">
                Inquiries are reviewed by our U.S. operations team.
                <br />
                Qualified inquiries only. Response within 1–2 business days.
              </p>

              {isSuccess ? (
                <div className="mt-12 max-w-lg mx-auto text-center space-y-6 bg-transparent p-8">
                  <h2 className="text-2xl font-medium tracking-wide">MESSAGE SENT</h2>
                  <p className="text-foreground/70">
                    Thank you — your message has been successfully submitted. We'll review it and
                    get back to you within 1–2 business days.
                  </p>
                  <div className="pt-4">
                    <Button
                      onClick={handleSendAnother}
                      variant="outline"
                      className="bg-transparent text-foreground hover:bg-foreground hover:text-background border-foreground/30 hover:border-foreground w-full max-w-xs mx-auto"
                    >
                      SEND ANOTHER MESSAGE
                    </Button>
                  </div>
                </div>
              ) : (
                <form
                  ref={formRef}
                  action="https://api.web3forms.com/submit"
                  method="POST"
                  onSubmit={handleSubmit}
                  className="mt-12 max-w-lg mx-auto text-left space-y-6"
                  id="contact-form"
                >
                  <input
                    type="hidden"
                    name="access_key"
                    value="4983e55d-b31e-4582-b796-08e7ef7a4701"
                  />
                  <input
                    type="hidden"
                    name="redirect"
                    value="https://sohnenterprises.com/contact?success=1"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-6 gap-y-6">
                    <div className="grid w-full items-center gap-1.5">
                      <Label
                        htmlFor="name"
                        className="text-xs text-foreground/50 tracking-widest uppercase"
                      >
                        Name
                      </Label>
                      <Input type="text" id="name" name="name" required />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                      <Label
                        htmlFor="email"
                        className="text-xs text-foreground/50 tracking-widest uppercase"
                      >
                        Email
                      </Label>
                      <Input type="email" id="email" name="email" required />
                    </div>
                  </div>

                  <div className="grid w-full items-center gap-1.5">
                    <Label
                      htmlFor="message"
                      className="text-xs text-foreground/50 tracking-widest uppercase"
                    >
                      Message
                    </Label>
                    <Textarea id="message" name="message" required rows={4} maxLength={360} />
                  </div>

                  {/* Web3Forms docs Step 1: Add a <div> inside your form */}
                  <div className="flex justify-center pt-4">
                    <div className="h-captcha" data-captcha="true" />
                  </div>

                  <div className="text-center pt-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      variant="outline"
                      className="bg-transparent text-foreground hover:bg-foreground hover:text-background border-foreground/30 hover:border-foreground w-full max-w-xs mx-auto"
                    >
                      {isSubmitting ? "SENDING..." : "SUBMIT INQUIRY"}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
      </FadeIn>
    </>
  );
}