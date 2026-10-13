import { useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";

type FormKind = "sample" | "contact";

const inputClass =
  "w-full rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring";

export function ContactForm({ kind }: { kind: FormKind }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");

    const payload =
      kind === "sample"
        ? {
            form: "sample",
            name: String(data.get("name") ?? ""),
            email: String(data.get("email") ?? ""),
            phone: String(data.get("phone") ?? ""),
            annual_volume: String(data.get("annual_volume") ?? ""),
            delivery_date: String(data.get("delivery_date") ?? "") || null,
          }
        : {
            form: "contact",
            first_name: String(data.get("first_name") ?? ""),
            last_name: String(data.get("last_name") ?? ""),
            email: String(data.get("email") ?? ""),
            company: String(data.get("company") ?? ""),
            message: String(data.get("message") ?? ""),
          };

    const { error } = await supabase.from("contact_requests").insert(payload);
    if (error) {
      console.error(error);
      setStatus("error");
      return;
    }
    setStatus("sent");
    form.reset();
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 text-center">
        <p className="font-display text-2xl">Thank you!</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Your request is in. Our team will get back to you within one business
          day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      {kind === "sample" ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              required
              name="name"
              placeholder="Name / Surname*"
              className={inputClass}
            />
            <input
              required
              type="email"
              name="email"
              placeholder="Email*"
              className={inputClass}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <input name="phone" placeholder="Phone" className={inputClass} />
            <select
              required
              name="annual_volume"
              defaultValue=""
              className={inputClass}
            >
              <option value="" disabled>
                Estimated annual order volume*
              </option>
              <option value="under-10k">Under 10,000 pouches</option>
              <option value="10k-50k">10,000 – 50,000 pouches</option>
              <option value="50k-250k">50,000 – 250,000 pouches</option>
              <option value="over-250k">Over 250,000 pouches</option>
            </select>
          </div>
          <label className="grid gap-1 text-xs font-semibold text-muted-foreground">
            Desired delivery date
            <input type="date" name="delivery_date" className={inputClass} />
          </label>
        </>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              required
              name="first_name"
              placeholder="First name*"
              className={inputClass}
            />
            <input
              required
              name="last_name"
              placeholder="Last name*"
              className={inputClass}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              required
              type="email"
              name="email"
              placeholder="Email*"
              className={inputClass}
            />
            <input
              name="company"
              placeholder="Company name"
              className={inputClass}
            />
          </div>
          <textarea
            required
            name="message"
            placeholder="Message*"
            rows={5}
            className={inputClass}
          />
        </>
      )}

      {status === "error" && (
        <p className="text-sm font-semibold text-destructive">
          Something went wrong — please try again or email
          info@roasterpack.com.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3.5 text-sm font-bold tracking-wide text-primary-foreground uppercase transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {status === "sending"
          ? "Sending…"
          : kind === "sample"
            ? "Request free sample"
            : "Submit"}
      </button>
    </form>
  );
}
