import { useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { TablesInsert } from "@/integrations/supabase/types";

type FormKind = "sample" | "contact";

const inputClass =
  "w-full rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring";

const SAMPLE_PRODUCTS = [
  "Custom Roaster's Doypacks",
  "Custom Roaster's Flat bottom pouch",
  "Custom Roaster's Gusset Pouch",
];

export interface SamplePrefill {
  product?: string | undefined;
  size?: string | undefined;
  material?: string | undefined;
  volume?: string | undefined;
}

export function matchSampleProduct(format?: string) {
  if (!format) return undefined;
  const f = format.toLowerCase();
  if (f.includes("doypack")) return "Custom Roaster's Doypacks";
  if (f.includes("flat")) return "Custom Roaster's Flat bottom pouch";
  if (f.includes("gusset")) return "Custom Roaster's Gusset Pouch";
  return undefined;
}

export function ContactForm({
  kind,
  prefill,
}: {
  kind: FormKind;
  prefill?: SamplePrefill;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  const prefillProduct = matchSampleProduct(prefill?.product);
  const prefillDetails = [
    prefill?.product,
    prefill?.size && `Size: ${prefill.size}`,
    prefill?.material && `Material: ${prefill.material}`,
    prefill?.volume && `Volume: ${prefill.volume}`,
  ]
    .filter(Boolean)
    .join(" · ");
  const prefillMessage = prefillDetails
    ? `I'd like a sample of: ${prefillDetails}.\n\n`
    : undefined;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");

    const payload: TablesInsert<"contact_requests"> =
      kind === "sample"
        ? {
            form: "sample",
            name: String(data.get("name") ?? "").trim().slice(0, 200),
            email: String(data.get("email") ?? "").trim().slice(0, 255),
            phone: String(data.get("phone") ?? "").trim().slice(0, 50),
            annual_volume: String(data.get("annual_volume") ?? "")
              .trim()
              .slice(0, 100),
            delivery_date: String(data.get("delivery_date") ?? "").trim(),
            delivery_address: String(data.get("delivery_address") ?? "")
              .trim()
              .slice(0, 300),
            products: data.getAll("products").map(String).slice(0, 10),
            design_link: String(data.get("design_link") ?? "")
              .trim()
              .slice(0, 500),
            message: String(data.get("message") ?? "").trim().slice(0, 2000),
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
          {kind === "sample"
            ? "Your sample request is in. Our sales team will reply to you by email."
            : "Your message is in. Our team will get back to you by email."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      {kind === "sample" ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1.5 text-xs font-semibold">
              Name / Surname*
              <input
                required
                maxLength={200}
                name="name"
                className={inputClass}
              />
            </label>
            <label className="grid gap-1.5 text-xs font-semibold">
              Email*
              <input
                required
                type="email"
                maxLength={255}
                name="email"
                className={inputClass}
              />
            </label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1.5 text-xs font-semibold">
              Phone*
              <input
                required
                type="tel"
                maxLength={50}
                name="phone"
                className={inputClass}
              />
            </label>
            <label className="grid gap-1.5 text-xs font-semibold">
              Estimated annual order volume*
              <input
                required
                maxLength={100}
                name="annual_volume"
                placeholder="e.g. 20,000 pouches"
                defaultValue={prefill?.volume}
                className={inputClass}
              />
            </label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1.5 text-xs font-semibold">
              Date of delivery*
              <input
                required
                type="date"
                name="delivery_date"
                className={inputClass}
              />
            </label>
            <label className="grid gap-1.5 text-xs font-semibold">
              Delivery address*
              <input
                required
                maxLength={300}
                name="delivery_address"
                className={inputClass}
              />
            </label>
          </div>
          <fieldset>
            <legend className="text-xs font-semibold">
              Select your custom product
            </legend>
            <div className="mt-2 grid gap-2">
              {SAMPLE_PRODUCTS.map((product) => (
                <label
                  key={product}
                  className="flex items-center gap-2.5 text-sm font-medium"
                >
                  <input
                    type="checkbox"
                    name="products"
                    value={product}
                    defaultChecked={product === prefillProduct}
                    className="size-4 accent-primary"
                  />
                  {product}
                </label>
              ))}
            </div>
          </fieldset>
          <label className="grid gap-1.5 text-xs font-semibold">
            Link to your design (optional)
            <input
              type="url"
              maxLength={500}
              name="design_link"
              placeholder="https://… (Drive, Dropbox, WeTransfer)"
              className={inputClass}
            />
          </label>
          <label className="grid gap-1.5 text-xs font-semibold">
            Message*
            <textarea
              required
              maxLength={2000}
              name="message"
              rows={4}
              defaultValue={prefillMessage}
              className={inputClass}
            />
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
            ? "Get a Sample"
            : "Submit"}
      </button>
    </form>
  );
}
