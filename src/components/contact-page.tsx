"use client";

import { SiteHeader } from "@/components/site-header";
import { FadeIn } from "@/components/fade-in";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useRef, useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { usePathname, useRouter } from "next/navigation";

export default function ContactPageContent() {
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();

  const [isSuccess, setIsSuccess] = useState(false);
  const [token, setToken] = useState("");
  const [captchaKey, setCaptchaKey] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hcaptchaRef = useRef<HCaptcha>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Web3Forms docs (React/Next.js + free plan):
  const sitekey = "50b2fe65-b00b-4b9e-ad62-3ba471098be2";

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (pathname !== "/contact") return;

    const params = new URLSearchParams(window.location.search);
    const successParam = params.get("success") === "1";
    setIsSuccess(successParam);

    // If we're on the success state, do NOT reset captcha/token.
    if (successParam) return;

    // Ensure captcha is visible + fresh whenever we enter /contact via internal nav
    setToken("");
    setCaptchaKey((k) => k + 1);
    setTimeout(() => hcaptchaRef.current?.resetCaptcha(), 0);
  }, [pathname]);

  const handleSendAnother = () => {
    router.replace("/contact");
    setIsSuccess(false);
    setToken("");
    setCaptchaKey((k) => k + 1);
    setTimeout(() => hcaptchaRef.current?.resetCaptcha(), 0);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const trimmed = (token || "").trim();
    if (!trimmed) {
      toast({
        title: "Captcha Required",
        description: "Please complete the captcha before submitting.",
        variant: "destructive",
      });
      return;
    }

    const form = formRef.current;
    if (!form) return;

    setIsSubmitting(true);

    try {
      const fd = new FormData(form);

      // Web3Forms expects this field name EXACTLY:
      fd.set("h-captcha-response", trimmed);

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

        // reset captcha so the user can retry cleanly
        setToken("");
        setCaptchaKey((k) => k + 1);
        setTimeout(() => hcaptchaRef.current?.resetCaptcha(), 0);
        return;
      }

      // Show OUR success UI (no Web3Forms success/fail page)
      router.replace("/contact?success=1");
      setIsSuccess(true);
    } catch {
      toast({
        title: "Network Error",
        description: "Could not submit the form. Please try again.",
        variant: "destructive",
      });

      setToken("");
      setCaptchaKey((k) => k + 1);
      setTimeout(() => hcaptchaRef.current?.resetCaptcha(), 0);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
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
                  onSubmit={handleSubmit}
                  className="mt-12 max-w-lg mx-auto text-left space-y-6"
                  id="contact-form"
                >
                  <input
                    type="hidden"
                    name="access_key"
                    value="4983e55d-b31e-4582-b796-08e7ef7a4701"
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

                  <div className="flex justify-center pt-4">
                    <HCaptcha
                      key={captchaKey}
                      ref={hcaptchaRef}
                      sitekey={sitekey}
                      reCaptchaCompat={false}
                      onVerify={(t) => setToken(t ?? "")}
                      onExpire={() => setToken("")}
                      onError={() => setToken("")}
                    />
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
