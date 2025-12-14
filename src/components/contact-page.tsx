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
  const hcaptchaRef = useRef<HCaptcha>(null);

  const sitekey = "50b2fe65-b00b-4b9e-ad62-3ba471098be2";

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (pathname !== "/contact") return;

    const params = new URLSearchParams(window.location.search);
    const successParam = params.get("success") === "1";
    
    if (isSuccess !== successParam) {
      setIsSuccess(successParam);
    }

    // Always reset token + hard remount captcha when landing on /contact via client navigation
    setToken("");
    setCaptchaKey((k) => k + 1);
    setTimeout(() => hcaptchaRef.current?.resetCaptcha(), 0);
  }, [pathname, isSuccess]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (!token || !token.trim()) {
      event.preventDefault();
      toast({
        title: "Captcha Required",
        description: "Please complete the captcha before submitting.",
        variant: "destructive",
      });
    }
  };

  const handleSendAnother = () => {
    router.replace("/contact");
    setIsSuccess(false);
    setToken("");
    setCaptchaKey((k) => k + 1);
    setTimeout(() => hcaptchaRef.current?.resetCaptcha(), 0);
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
                    Thank you — your message has been successfully submitted. We'll review it and get back to you within 1–2 business days.
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
                  action="https://api.web3forms.com/submit"
                  method="POST"
                  onSubmit={handleSubmit}
                  className="mt-12 max-w-lg mx-auto text-left space-y-6"
                  id="contact-form"
                >
                  <input type="hidden" name="access_key" value="4983e55d-b31e-4582-b796-08e7ef7a4701" />
                  <input type="hidden" name="redirect" value="https://sohnenterprises.com/contact?success=1" />
                  <textarea name="h-captcha-response" value={token} readOnly className="hidden" />

                  <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-6 gap-y-6">
                    <div className="grid w-full items-center gap-1.5">
                      <Label htmlFor="name" className="text-xs text-foreground/50 tracking-widest uppercase">
                        Name
                      </Label>
                      <Input type="text" id="name" name="name" required />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                      <Label htmlFor="email" className="text-xs text-foreground/50 tracking-widest uppercase">
                        Email
                      </Label>
                      <Input type="email" id="email" name="email" required />
                    </div>
                  </div>

                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="message" className="text-xs text-foreground/50 tracking-widest uppercase">
                      Message
                    </Label>
                    <Textarea id="message" name="message" required rows={4} maxLength={360} />
                  </div>

                  <div className="flex justify-center pt-4">
                    <HCaptcha
                      key={captchaKey}
                      ref={hcaptchaRef}
                      sitekey={sitekey}
                      onVerify={(t) => setToken(t ?? "")}
                      onExpire={() => setToken("")}
                      onError={() => setToken("")}
                      reCaptchaCompat={false}
                    />
                  </div>

                  <div className="text-center pt-4">
                    <Button
                      type="submit"
                      variant="outline"
                      className="bg-transparent text-foreground hover:bg-foreground hover:text-background border-foreground/30 hover:border-foreground w-full max-w-xs mx-auto"
                    >
                      SUBMIT INQUIRY
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
