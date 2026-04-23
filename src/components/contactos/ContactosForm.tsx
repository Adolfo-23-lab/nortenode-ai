"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { submitLeadAction } from "@/app/actions/submitLead";
import { useT } from "@/i18n/provider";

type FormState = {
  name:    string;
  email:   string;
  phone:   string;
  sector:  string;
  message: string;
};

const INITIAL_STATE: FormState = {
  name:    "",
  email:   "",
  phone:   "",
  sector:  "",
  message: "",
};

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactosForm() {
  const t = useT();
  const f = t.contactos.form;

  const [formData, setFormData] = React.useState<FormState>(INITIAL_STATE);
  const [status, setStatus] = React.useState<Status>("idle");
  const [errorMessage, setErrorMessage] = React.useState("");

  const rootRef = React.useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        {
          isMotion:  "(prefers-reduced-motion: no-preference)",
          isReduced: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const { isMotion } = ctx.conditions as { isMotion: boolean };
          const root = rootRef.current;
          if (!root) return;

          if (!isMotion) {
            gsap.set(root.querySelectorAll("[data-reveal]"), { clearProps: "all" });
            return;
          }

          gsap.from(root.querySelectorAll("[data-reveal='form-head']"), {
            y: 28,
            opacity: 0,
            filter: "blur(8px)",
            duration: 1.0,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: root, start: "top 78%" },
          });

          root.querySelectorAll<HTMLElement>("[data-reveal='form-field']").forEach((field, i) => {
            gsap.from(field, {
              y: 24,
              opacity: 0,
              filter: "blur(6px)",
              duration: 0.9,
              delay: i * 0.06,
              ease: "power3.out",
              scrollTrigger: { trigger: field, start: "top 88%" },
            });
          });
        },
      );
      return () => mm.revert();
    },
    { scope: rootRef },
  );

  const handleChange = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;

    setStatus("submitting");
    setErrorMessage("");

    const result = await submitLeadAction({
      name:    formData.name,
      email:   formData.email,
      phone:   formData.phone,
      sector:  formData.sector,
      message: formData.message,
    });

    if (!result.ok) {
      setErrorMessage(f.error_by_code[result.code]);
      setStatus("error");
      return;
    }

    setStatus("success");
    setFormData(INITIAL_STATE);
  };

  if (status === "success") {
    return (
      <section
        ref={rootRef}
        aria-label={f.success_title}
        className="relative isolate overflow-hidden bg-[color:var(--color-ink-0)] py-24 md:py-36"
      >
        <div className="mx-auto w-full max-w-[1200px] px-6 md:px-12">
          <p className="mb-10 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink-text-soft)]">
            {f.eyebrow}
          </p>
          <h2 className="font-sans font-medium text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] tracking-[-0.02em] text-white text-balance">
            {f.success_title}
          </h2>
          <p className="mt-10 max-w-xl font-sans text-base leading-relaxed text-[var(--color-ink-text-muted)] md:text-lg">
            {f.success_body}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={rootRef}
      aria-label={f.title}
      className="relative isolate overflow-hidden bg-[color:var(--color-ink-0)] py-24 md:py-36"
    >
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-12">
        <div className="mb-20 max-w-2xl md:mb-28">
          <p
            data-reveal="form-head"
            className="mb-8 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink-text-soft)]"
          >
            {f.eyebrow}
          </p>
          <h2
            data-reveal="form-head"
            className="font-sans font-medium text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] tracking-[-0.02em] text-white text-balance"
          >
            {f.title}
          </h2>
          <p
            data-reveal="form-head"
            className="mt-8 font-sans text-base leading-relaxed text-[var(--color-ink-text-muted)] md:text-lg"
          >
            {f.sub}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col">
          <EditorialField
            id="name"
            label={f.fields.name.label}
            placeholder={f.fields.name.placeholder}
            value={formData.name}
            onChange={handleChange("name")}
            required
          />
          <EditorialField
            id="email"
            type="email"
            label={f.fields.email.label}
            placeholder={f.fields.email.placeholder}
            value={formData.email}
            onChange={handleChange("email")}
          />
          <EditorialField
            id="phone"
            type="tel"
            label={f.fields.phone.label}
            placeholder={f.fields.phone.placeholder}
            value={formData.phone}
            onChange={handleChange("phone")}
          />
          <EditorialField
            id="sector"
            label={f.fields.vertical.label}
            placeholder={f.fields.vertical.placeholder}
            value={formData.sector}
            onChange={handleChange("sector")}
          />
          <EditorialField
            id="message"
            label={f.fields.message.label}
            placeholder={f.fields.message.placeholder}
            value={formData.message}
            onChange={handleChange("message")}
            multiline
          />

          {status === "error" && errorMessage ? (
            <div
              role="alert"
              className="mt-10 flex flex-col gap-2 border-t border-[var(--color-hairline)] pt-6"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink-text-soft)]">
                {f.error_title}
              </p>
              <p className="font-sans text-base text-[var(--color-ink-text-primary)]">
                {errorMessage}
              </p>
            </div>
          ) : null}

          <div className="mt-12">
            <button
              type="submit"
              disabled={status === "submitting"}
              className="inline-flex items-center justify-center rounded-full bg-[var(--color-signal-500)] px-8 py-4 font-sans text-sm font-medium text-white transition-colors duration-200 hover:bg-[var(--color-signal-400)] disabled:bg-[var(--color-signal-600)] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "submitting" ? f.submit_loading : f.submit_idle}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function EditorialField({
  id,
  label,
  placeholder,
  value,
  onChange,
  required,
  type = "text",
  multiline = false,
}: {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  type?: string;
  multiline?: boolean;
}) {
  return (
    <label
      htmlFor={id}
      data-reveal="form-field"
      className="group grid grid-cols-12 items-baseline gap-6 border-t border-[var(--color-hairline)] py-6 md:py-8"
    >
      <span className="col-span-12 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink-text-soft)] md:col-span-2">
        {label}
      </span>
      {multiline ? (
        <textarea
          id={id}
          name={id}
          rows={3}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="col-span-12 resize-none bg-transparent font-sans text-[clamp(1rem,1.8vw,1.375rem)] font-normal leading-snug text-white placeholder:text-[var(--color-ink-text-faint)] focus:outline-none md:col-span-10"
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          autoComplete="off"
          className="col-span-12 bg-transparent font-sans text-[clamp(1rem,1.8vw,1.375rem)] font-normal leading-snug text-white placeholder:text-[var(--color-ink-text-faint)] focus:outline-none md:col-span-10"
        />
      )}
    </label>
  );
}
