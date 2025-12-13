"use client";

import { SiteHeader } from "@/components/site-header";
import { FadeIn } from "@/components/fade-in";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, useRef } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useToast } from "@/hooks/use-toast";

export default function ContactPageContent() {
  const [token, setToken] = useState<string | null>(null);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!token) {
      toast({
        title: "Captcha Required",
        description: "Please complete the captcha before submitting.",
        variant: "destructive",
      });
      return;
    }

    const formData = new FormData(event.currentTarget);
    formData.append("h-captcha-response", token);
    
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      });

      const jsonResponse = await response.json();

      if (jsonResponse.success) {
        window.location.href = jsonResponse.redirect;
      } else {
        toast({
          title: "Submission Failed",
          description: jsonResponse.message || "An unexpected error occurred.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Network Error",
        description: "Could not submit the form. Please try again later.",
        variant: "destructive",
      });
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

              <form 
                ref={formRef}
                onSubmit={handleSubmit} 
                className="mt-12 max-w-lg mx-auto text-left space-y-6"
              >
                <input type="hidden" name="access_key" value="4983e55d-b31e-4582-b796-08e7ef7a4701" />
                <input type="hidden" name="redirect" value="https://web3forms.com/success" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-6 gap-y-6">
                  <div className="grid w-full items-center gap-1.5">
                      <Label htmlFor="name" className="text-xs text-foreground/50 tracking-widest uppercase">Name</Label>
                      <Input type="text" id="name" name="name" required />
                  </div>
                  <div className="grid w-full items-center gap-1.5">
                      <Label htmlFor="email" className="text-xs text-foreground/50 tracking-widest uppercase">Email</Label>                      
                      <Input type="email" id="email" name="email" required />
                  </div>
                </div>
                 <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="message" className="text-xs text-foreground/50 tracking-widest uppercase">Message</Label>
                    <Textarea id="message" name="message" required rows={4} maxLength={360} />
                </div>
                <div className="flex justify-center pt-4">
                  <HCaptcha
                    sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
                    onVerify={setToken}
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
            </div>
          </div>
        </section>
      </FadeIn>
    </>
  );
}
