import { useState, type FormEvent, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  BAG_TYPES,
  DESIGN_FILE_OPTIONS,
  EFFECTS,
  FEATURES,
  FILL_WEIGHTS,
  FINISHES,
  MATERIALS,
  PRODUCT_FORMS,
  QUANTITIES,
  SKU_COUNTS,
  quoteSchema,
} from "@/lib/quote";

const inputClass =
  "w-full rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring";

function Step({
  n,
  title,
  hint,
  error,
  children,
}: {
  n: number;
  title: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <fieldset className="rounded-2xl border border-border bg-card p-6">
      <legend className="sr-only">{title}</legend>
      <div className="flex items-baseline gap-3">
        <span className="font-display text-2xl text-muted-foreground">
          {String(n).padStart(2, "0")}
        </span>
        <div>
          <p className="font-bold">{title}</p>
          {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
        </div>
      </div>
      <div className="mt-4">{children}</div>
      {error && (
        <p className="mt-3 text-sm font-semibold text-destructive">{error}</p>
      )}
    </fieldset>
  );
}

function Choices({
  name,
  options,
  multiple,
}: {
  name: string;
  options: readonly string[];
  multiple?: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <label key={o} className="cursor-pointer">
          <input
            type={multiple ? "checkbox" : "radio"}
            name={name}
            value={o}
            className="peer sr-only"
          />
          <span className="inline-block rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold transition-colors peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground peer-focus-visible:ring-2 peer-focus-visible:ring-ring">
            {o}
          </span>
        </label>
      ))}
    </div>
  );
}

export function QuoteForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const s = (k: string) => String(fd.get(k) ?? "");
    const a = (k: string) => fd.getAll(k).map(String);

    const parsed = quoteSchema.safeParse({
      company: s("company"),
      contact_person: s("contact_person"),
      email: s("email"),
      phone: s("phone"),
      delivery_country: s("delivery_country"),
      product_form: s("product_form"),
      fill_weights: a("fill_weights"),
      fill_weight_other: s("fill_weight_other"),
      bag_type: s("bag_type"),
      design_file: s("design_file"),
      design_link: s("design_link"),
      bag_size: fd.get("bag_size_standard")
        ? "Standard for the fill weight"
        : s("bag_size"),
      material: s("material"),
      features: a("features"),
      sku_count: s("sku_count"),
      quantity_per_design: s("quantity_per_design"),
      finish: s("finish"),
      effects: a("effects"),
      deadline: s("deadline"),
      notes: s("notes"),
    });

    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? "form");
        next[key] ??= issue.message;
      }
      setErrors(next);
      const first = form.querySelector<HTMLElement>(
        `[data-field="${Object.keys(next)[0]}"]`,
      );
      first?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setErrors({});
    setStatus("sending");
    const { error } = await supabase.from("quote_requests").insert(parsed.data);
    if (error) {
      console.error(error);
      setStatus("error");
      return;
    }
    setStatus("sent");
    form.reset();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-border bg-card p-10 text-center">
        <p className="font-display text-3xl">Thank you!</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Your quote request is in. Our sales team will review the details and
          get back to you with a price.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-5">
      <div data-field="company">
        <Step
          n={1}
          title="Company & contact"
          error={
            errors.company ??
            errors.contact_person ??
            errors.email ??
            errors.delivery_country
          }
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <input name="company" placeholder="Company*" className={inputClass} />
            <input
              name="contact_person"
              placeholder="Contact person*"
              className={inputClass}
            />
            <input
              type="email"
              name="email"
              placeholder="Email*"
              className={inputClass}
            />
            <input name="phone" placeholder="Phone" className={inputClass} />
            <input
              name="delivery_country"
              placeholder="Delivery country*"
              className={`${inputClass} sm:col-span-2`}
            />
          </div>
        </Step>
      </div>

      <div data-field="product_form">
        <Step
          n={2}
          title="Product & fill weight"
          error={errors.product_form ?? errors.fill_weights}
        >
          <Choices name="product_form" options={PRODUCT_FORMS} />
          <p className="mt-4 mb-2 text-xs font-semibold text-muted-foreground">
            Fill weight (choose all that apply)
          </p>
          <Choices name="fill_weights" options={FILL_WEIGHTS} multiple />
          <input
            name="fill_weight_other"
            placeholder="Other weight, e.g. 2 kg"
            className={`${inputClass} mt-3 sm:max-w-xs`}
          />
        </Step>
      </div>

      <div data-field="bag_type">
        <Step
          n={3}
          title="Bag type & design"
          error={errors.bag_type ?? errors.design_file}
        >
          <Choices name="bag_type" options={BAG_TYPES} />
          <p className="mt-4 mb-2 text-xs font-semibold text-muted-foreground">
            Can you share a design file?
          </p>
          <Choices name="design_file" options={DESIGN_FILE_OPTIONS} />
          <input
            name="design_link"
            placeholder="Link to design file (WeTransfer, Google Drive, Dropbox…)"
            className={`${inputClass} mt-3`}
          />
        </Step>
      </div>

      <Step
        n={4}
        title="Bag size (if known)"
        hint="Width × height × gusset in mm"
      >
        <input
          name="bag_size"
          placeholder="e.g. 130 × 210 × 80 mm"
          className={`${inputClass} sm:max-w-sm`}
        />
        <label className="mt-3 flex items-center gap-2 text-sm font-medium">
          <input type="checkbox" name="bag_size_standard" className="h-4 w-4 accent-primary" />
          Standard for the fill weight
        </label>
      </Step>

      <div data-field="material">
        <Step n={5} title="Material / structure" error={errors.material}>
          <Choices name="material" options={MATERIALS} />
        </Step>
      </div>

      <Step n={6} title="Features" hint="Choose all that apply">
        <Choices name="features" options={FEATURES} multiple />
      </Step>

      <div data-field="sku_count">
        <Step n={7} title="Number of designs (SKUs)" error={errors.sku_count}>
          <Choices name="sku_count" options={SKU_COUNTS} />
        </Step>
      </div>

      <div data-field="quantity_per_design">
        <Step
          n={8}
          title="Quantity per design"
          hint="Pieces per design, e.g. 500 / 1,000 / 3,000 / 10,000"
          error={errors.quantity_per_design}
        >
          <input
            name="quantity_per_design"
            list="quote-quantities"
            placeholder="e.g. 3,000 pcs*"
            className={`${inputClass} sm:max-w-xs`}
          />
          <datalist id="quote-quantities">
            {QUANTITIES.map((q) => (
              <option key={q} value={`${q} pcs`} />
            ))}
          </datalist>
        </Step>
      </div>

      <div data-field="finish">
        <Step n={9} title="Finish" error={errors.finish}>
          <Choices name="finish" options={FINISHES} />
          <p className="mt-4 mb-2 text-xs font-semibold text-muted-foreground">
            Effects (optional)
          </p>
          <Choices name="effects" options={EFFECTS} multiple />
        </Step>
      </div>

      <Step
        n={10}
        title="Deadline for delivery"
        hint="Date the bags must be at your roastery"
      >
        <input
          type="date"
          name="deadline"
          className={`${inputClass} sm:max-w-xs`}
        />
      </Step>

      <textarea
        name="notes"
        rows={4}
        placeholder="Anything else we should know?"
        className={inputClass}
      />

      {Object.keys(errors).length > 0 && (
        <p className="text-sm font-semibold text-destructive">
          Please fill in the highlighted steps above.
        </p>
      )}
      {status === "error" && (
        <p className="text-sm font-semibold text-destructive">
          Something went wrong — please try again or email info@roasterpack.com.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-sm font-bold tracking-wide text-primary-foreground uppercase transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {status === "sending" ? "Sending…" : "Request a Quote"}
      </button>
    </form>
  );
}
