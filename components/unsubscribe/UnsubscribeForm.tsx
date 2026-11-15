import { useState, type FormEvent } from "react";

/* Unsubscribe form (approved design: LMS/design/loanhero-unsubscribe).
   States: form, form + "Other" text box, wrong email, server error, success.
   Sends to /api/unsubscribe, which passes it on to the LMS. */

export const REASONS = [
  "Too many emails",
  "Not interested anymore",
  "I already got a loan",
  "I never signed up",
  "Other",
] as const;

const OTHER_MAX = 300; // the LMS keeps up to 300 characters

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

type Status = "idle" | "sending" | "badEmail" | "serverError" | "done";

function AlertIcon({ size, strokeWidth }: { size: number; strokeWidth: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} aria-hidden="true" style={size === 18 ? { flex: "none", marginTop: 1 } : undefined}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v4M12 16h.01" />
    </svg>
  );
}

export default function UnsubscribeForm() {
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [other, setOther] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [doneEmail, setDoneEmail] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const cleanEmail = email.trim();
    if (!isEmail(cleanEmail)) {
      setStatus("badEmail");
      return;
    }

    const company = (e.currentTarget.elements.namedItem("company") as HTMLInputElement | null)?.value ?? "";
    setStatus("sending");

    try {
      const res = await fetch("/api/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: cleanEmail,
          reason,
          otherText: reason === "Other" ? other.trim() : "",
          company,
        }),
      });
      if (res.ok) {
        setDoneEmail(cleanEmail);
        setStatus("done");
        return;
      }
      const data = (await res.json().catch(() => ({}))) as { field?: string };
      setStatus(res.status === 400 && data.field === "email" ? "badEmail" : "serverError");
    } catch {
      setStatus("serverError");
    }
  }

  if (status === "done") {
    return (
      <div className="uh-done" role="status">
        <div className="uh-ok">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <path d="M22 4 12 14.01l-3-3" />
          </svg>
        </div>
        <h2>You&rsquo;re unsubscribed</h2>
        <p>We will not send you more emails.</p>
        <span className="uh-mail">{doneEmail}</span>
        <br />
        <a className="uh-link" href="/">Back to home</a>
      </div>
    );
  }

  const badEmail = status === "badEmail";

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2>Stop our emails</h2>
      <div className="uh-bar" />

      {status === "serverError" && (
        <div className="uh-alert" role="alert">
          <AlertIcon size={18} strokeWidth={2} />
          <div>
            <b>Something went wrong.</b>Please try again in a minute.
          </div>
        </div>
      )}

      <div className="uh-field">
        <label className="uh-label" htmlFor="uh-email">Email address *</label>
        <input
          id="uh-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={200}
          className={`uh-input${badEmail ? " bad" : ""}`}
          placeholder="you@example.com"
          value={email}
          aria-invalid={badEmail || undefined}
          aria-describedby={badEmail ? "uh-email-help" : undefined}
          onChange={(e) => {
            setEmail(e.target.value);
            if (badEmail) setStatus("idle");
          }}
        />
        {badEmail && (
          <p className="uh-help" id="uh-email-help">
            <AlertIcon size={13} strokeWidth={2.2} />
            Please enter a valid email.
          </p>
        )}
      </div>

      <fieldset className="uh-field">
        <legend className="uh-label">
          Why do you want to unsubscribe? <span className="opt">(optional)</span>
        </legend>
        <div className="uh-reasons">
          {REASONS.map((r) => (
            <label key={r} className={`uh-reason${reason === r ? " on" : ""}`}>
              <input type="radio" name="reason" value={r} checked={reason === r} onChange={() => setReason(r)} />
              <span className="uh-dot" />
              {r}
            </label>
          ))}
        </div>
        {reason === "Other" && (
          <div className="uh-other">
            <textarea
              className="uh-input"
              name="otherText"
              aria-label="Tell us more (optional)"
              placeholder="Tell us more (optional)"
              maxLength={OTHER_MAX}
              value={other}
              onChange={(e) => setOther(e.target.value)}
            />
          </div>
        )}
      </fieldset>

      <div className="uh-trap" aria-hidden="true">
        <label htmlFor="uh-company">Company</label>
        <input id="uh-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button className="uh-btn" type="submit" disabled={status === "sending"}>
        Unsubscribe
      </button>
      <p className="uh-note">Only takes a second. You can sign up again any time.</p>
    </form>
  );
}
