"use client";

import { SiteHeader } from "@/components/site-header";
import { FadeIn } from "@/components/fade-in";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <FadeIn duration={1600}>
        <section className="py-36 md:py-48">
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

              <form action="https://api.web3forms.com/submit" method="POST" className="mt-12 max-w-lg mx-auto text-left space-y-6">
                <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE" />
                 <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="name" className="text-xs text-foreground/50 tracking-widest uppercase">Name</Label>
                    <Input type="text" id="name" name="name" required />
                </div>
                 <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="email" className="text-xs text-foreground/50 tracking-widest uppercase">Email</Label>
                    <Input type="email" id="email" name="email" required />
                </div>
                 <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="message" className="text-xs text-foreground/50 tracking-widest uppercase">Message</Label>
                    <Textarea id="message" name="message" required rows={4} />
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

              <div className="mt-16">
                 <p className="text-xs text-foreground/50 tracking-widest uppercase mb-2">Or email directly</p>
                <a
                  href="mailto:operations@sohnenterprises.com"
                  className="text-base md:text-lg text-foreground/90 hover:underline break-all"
                >
                  operations@sohnenterprises.com
                </a>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>
    </>
  );
}
