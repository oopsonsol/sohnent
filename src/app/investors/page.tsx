"use client";

import { useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { FadeIn } from "@/components/fade-in";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function InvestorsPage() {
  const [showForm, setShowForm] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [error, setError] = useState("");

  const handleSignInClick = () => {
    setShowForm(true);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError("Invalid access credentials.");
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAccessCode(event.target.value);
    if (error) {
      setError("");
    }
  };

  return (
    <>
      <SiteHeader />
      <FadeIn>
        <section className="py-36 md:py-48">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-normal tracking-widest uppercase">
                INVESTOR PORTAL
              </h1>
              <p className="mt-4 text-base text-foreground/60">
                {showForm ? "Please provide your access credentials." : "Please sign in to continue."}
              </p>
              
              <div className="mt-12 w-full max-w-sm mx-auto">
                {!showForm ? (
                  <Button
                    onClick={handleSignInClick}
                    variant="outline"
                    className="bg-transparent text-foreground hover:bg-foreground hover:text-background border-foreground/30 hover:border-foreground w-full"
                  >
                    SIGN IN
                  </Button>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6 text-left">
                    <div className="grid w-full items-center gap-1.5">
                      <Label htmlFor="access-code" className="text-xs text-foreground/50 tracking-widest uppercase">Access Code</Label>
                      <Input 
                        type="password" 
                        id="access-code" 
                        placeholder="••••••••"
                        value={accessCode}
                        onChange={handleInputChange}
                        className="text-center tracking-widest"
                      />
                    </div>
                    {error && (
                        <p className="text-xs text-destructive text-center pt-1">{error}</p>
                    )}
                    <Button
                      type="submit"
                      variant="outline"
                      className="bg-transparent text-foreground hover:bg-foreground hover:text-background border-foreground/30 hover:border-foreground w-full"
                    >
                      CONTINUE
                    </Button>
                  </form>
                )}
              </div>

              <p className="mt-12 text-xs text-foreground/40">
                Access available only to pre-approved investors.
              </p>
            </div>
          </div>
        </section>
      </FadeIn>
    </>
  );
}
