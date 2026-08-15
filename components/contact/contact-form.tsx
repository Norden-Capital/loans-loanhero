"use client";

/* Contact form.

   Structure, field set and submission logic are UNIFIED across the network:
   same fields, same lib/contact.ts helper, same states. Only the STYLES block
   below and the button markup are site-specific — this site keeps its own
   look on purpose, so the sites don't share a visual fingerprint.

   Site-specific email config lives in app/api/contact/route.ts.            */

import React, { useState } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { NativeSelect } from "@/components/ui/native-select";
import { submitContactForm, type ContactStatus } from "@/lib/contact";

const TOPICS = [
  "General enquiry",
  "Help with my application",
  "Rates & fees",
  "Repayment & support",
  "Partnerships",
  "Something else",
];

/* ── Site styling — the only part that differs between sites ───────────── */
const STYLES = {
  card: "bg-white p-6 md:p-8 rounded-2xl shadow-xl shadow-slate-200/20 border border-slate-100",
  panel:
    "bg-white p-6 md:p-8 rounded-2xl shadow-xl shadow-slate-200/20 border border-slate-100 flex flex-col items-center justify-center text-center min-h-[360px]",
  label: "text-[10px] font-semibold text-slate-500 uppercase tracking-wider ml-1",
  field:
    "w-full p-2.5 h-auto text-xs bg-slate-50/50 border-slate-100 rounded-xl font-medium focus-visible:border-[var(--primary)] focus-visible:bg-white",
  button:
    "w-full text-white py-3 rounded-xl font-bold text-sm shadow-lg shadow-indigo-500/10 transition-all hover:scale-[1.01] hover:shadow-indigo-500/20 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 ring-2 ring-indigo-500/5 hover:ring-indigo-500/10",
  buttonStyle: { background: "var(--gradient-primary)" } as React.CSSProperties,
};
/* ─────────────────────────────────────────────────────────────────────── */

export function ContactForm() {
  const [status, setStatus] = useState<ContactStatus>("idle");
  const [subject, setSubject] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "submitting") return;

    setStatus("submitting");
    setError("");

    const result = await submitContactForm(e.currentTarget);

    if (!result.ok) {
      setError(result.error);
      setStatus("error");
      return;
    }

    setStatus("success");
  };

  if (status === "success") {
    return (
      <div className={STYLES.panel}>
        <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center mb-4">
          <CheckCircle2 className="w-6 h-6 text-indigo-600" />
        </div>
        <h2 className="text-lg md:text-xl font-medium text-slate-900 mb-2 tracking-tight">
          Message sent
        </h2>
        <p className="text-sm text-slate-500 max-w-xs leading-relaxed">
          Thanks for reaching out — we&apos;ll get back to you within one business day.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubject("");
            setStatus("idle");
          }}
          className="mt-6 text-xs font-semibold text-indigo-600 underline underline-offset-4 hover:opacity-80"
        >
          Send another message
        </button>
      </div>
    );
  }

  const isSubmitting = status === "submitting";

  return (
    <div className={STYLES.card}>
      <div className="mb-6">
        <h2 className="text-lg md:text-xl font-medium text-slate-900 mb-2 tracking-tight">
          Send Us a Message
        </h2>
        <div
          className="w-8 h-1 rounded-full opacity-50"
          style={{ background: "var(--gradient-primary)" }}
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label htmlFor="firstName" className={STYLES.label}>
              First Name *
            </Label>
            <Input
              id="firstName"
              name="firstName"
              autoComplete="given-name"
              placeholder="First Name"
              required
              disabled={isSubmitting}
              className={STYLES.field}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="lastName" className={STYLES.label}>
              Last Name *
            </Label>
            <Input
              id="lastName"
              name="lastName"
              autoComplete="family-name"
              placeholder="Last Name"
              required
              disabled={isSubmitting}
              className={STYLES.field}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label htmlFor="email" className={STYLES.label}>
              Email Address *
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Email Address"
              required
              disabled={isSubmitting}
              className={STYLES.field}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="subject" className={STYLES.label}>
              Subject *
            </Label>
            <NativeSelect
            id="subject"
            name="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            disabled={isSubmitting}
            className={STYLES.field}
          >
            <option value="" disabled>
              Select Topic
            </option>
            {TOPICS.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </NativeSelect>
          </div>
        </div>

        <div className="space-y-1">
          <Label htmlFor="message" className={STYLES.label}>
            Message *
          </Label>
          <Textarea
            id="message"
            name="message"
            rows={3}
            placeholder="How can we help?"
            required
            disabled={isSubmitting}
            className={`${STYLES.field} resize-none`}
          />
        </div>

        {/* Honeypot — hidden from people, frequently auto-filled by bots. */}
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute w-px h-px -left-[9999px] opacity-0 pointer-events-none"
        />

        {status === "error" && (
          <p role="alert" className="text-xs text-red-600 leading-relaxed">
            {error}
          </p>
        )}

        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className={STYLES.button}
            style={STYLES.buttonStyle}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
            {isSubmitting ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Send className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
