"use client";

import * as React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { submitLeadAction } from "@/app/actions/submitLead";
import { useT } from "@/i18n/provider";

type FormState = {
  name:    string;
  email:   string;
  phone:   string;
  message: string;
};

const INITIAL_STATE: FormState = {
  name:    "",
  email:   "",
  phone:   "",
  message: "",
};

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactosForm() {
  const t = useT();
  const f = t.contactos.form;

  const [formData, setFormData]       = React.useState<FormState>(INITIAL_STATE);
  const [status, setStatus]           = React.useState<Status>("idle");
  const [errorMessage, setErrorMessage] = React.useState("");

  const rootRef = React.useRef<HTMLDivElement | null>(null);

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

          gsap.from(root.querySelectorAll("[data-reveal]"), {
            y: 24,
            opacity: 0,
            filter: "blur(6px)",
            duration: 0.9,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: root, start: "top 78%" },
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
      sector:  "",
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
      <div className="mx-auto flex w-full max-w-[600px] flex-col items-center py-16 text-center">
        <p className="mono-label-v2 mb-6">TRANSMISSION RECEIVED</p>
        <svg
          aria-hidden="true"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mb-6 text-[var(--color-accent-v2)]"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
        <h2
          className="font-medium text-[var(--color-text-primary-v2)]"
          style={{ fontSize: "var(--text-headline-sm-v2)", lineHeight: 1.1 }}
        >
          {f.success_title}
        </h2>
        <p
          className="mt-4 max-w-[50ch] text-[var(--color-text-secondary-v2)]"
          style={{ fontSize: "var(--text-body-v2)" }}
        >
          {f.success_body}
        </p>
      </div>
    );
  }

  const fields: Array<{
    num:         string;
    id:          keyof FormState;
    label:       string;
    placeholder: string;
    required:    boolean;
    type:        string;
    multiline:   boolean;
  }> = [
    { num: "01", id: "name",    label: "NAME",    placeholder: f.fields.name.placeholder,    required: true,  type: "text",  multiline: false },
    { num: "02", id: "email",   label: "EMAIL",   placeholder: f.fields.email.placeholder,   required: false, type: "email", multiline: false },
    { num: "03", id: "phone",   label: "PHONE",   placeholder: f.fields.phone.placeholder,   required: false, type: "tel",   multiline: false },
    { num: "04", id: "message", label: "MESSAGE", placeholder: f.fields.message.placeholder, required: false, type: "text",  multiline: true  },
  ];

  return (
    <div ref={rootRef} className="w-full max-w-[600px]">
      {status === "error" && errorMessage ? (
        <div
          role="alert"
          className="mb-8 border-l-4 border-[var(--color-status-warn-v2)] bg-[var(--color-bg-elevated-v2)] p-4"
        >
          <p className="mono-label-v2 mb-2">{f.error_title}</p>
          <p
            className="text-[var(--color-text-secondary-v2)]"
            style={{ fontSize: "var(--text-body-sm-v2)" }}
          >
            {errorMessage}
          </p>
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="flex flex-col gap-y-8">
        {fields.map((field) => (
          <FieldRow
            key={field.id}
            num={field.num}
            id={field.id}
            label={field.label}
            value={formData[field.id]}
            placeholder={field.placeholder}
            required={field.required}
            type={field.type}
            multiline={field.multiline}
            onChange={handleChange(field.id)}
          />
        ))}

        <div data-reveal className="mt-12">
          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex items-center justify-center rounded-[var(--radius-v2)] bg-white px-8 py-4 font-mono text-[14px] font-medium uppercase tracking-[0.1em] text-[var(--color-bg-v2)] transition-shadow duration-200 hover:shadow-[var(--shadow-glow-soft-v2)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "submitting" ? f.submit_loading : f.submit_v2}
          </button>
        </div>
      </form>
    </div>
  );
}

function FieldRow({
  num, id, label, value, placeholder, required, type, multiline, onChange,
}: {
  num:         string;
  id:          string;
  label:       string;
  value:       string;
  placeholder: string;
  required:    boolean;
  type:        string;
  multiline:   boolean;
  onChange:    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}) {
  return (
    <div data-reveal className="flex gap-x-6">
      <span
        aria-hidden="true"
        className="font-mono font-normal text-[var(--color-accent-v2)]"
        style={{ fontSize: "32px", width: "48px", flexShrink: 0, lineHeight: 1 }}
      >
        {num}
      </span>
      <div aria-hidden="true" className="w-px self-stretch bg-[var(--color-border-strong-v2)]" />
      <label htmlFor={id} className="flex flex-1 flex-col">
        <span className="mono-label-v2 mb-2">{label}</span>
        <div className="border-b border-[var(--color-border-v2)]" aria-hidden="true" />
        {multiline ? (
          <textarea
            id={id}
            name={id}
            rows={3}
            value={value}
            placeholder={placeholder}
            required={required}
            onChange={onChange}
            className="resize-none bg-transparent py-3 text-[var(--color-text-primary-v2)] placeholder:italic placeholder:text-[var(--color-text-muted-v2)] focus:outline-none"
            style={{ fontSize: "var(--text-body-v2)" }}
          />
        ) : (
          <input
            id={id}
            name={id}
            type={type}
            value={value}
            placeholder={placeholder}
            required={required}
            autoComplete="off"
            onChange={onChange}
            className="bg-transparent py-3 text-[var(--color-text-primary-v2)] placeholder:italic placeholder:text-[var(--color-text-muted-v2)] focus:outline-none"
            style={{ fontSize: "var(--text-body-v2)" }}
          />
        )}
        <div className="border-b border-[var(--color-border-strong-v2)]" aria-hidden="true" />
      </label>
    </div>
  );
}
