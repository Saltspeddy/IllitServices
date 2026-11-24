"use client";

import { useState, type FormEvent } from "react";

type Mode = "login" | "signup";
type Role = "client" | "engineer";

const STEPS = ["Received", "Diagnosed", "In repair", "Waiting for parts", "Ready for pickup"];
const CURRENT_STEP = 2;

const inputClass =
  "h-11 w-full rounded-lg border border-[#D5D9E0] bg-white px-3 text-sm text-[#14181F] " +
  "placeholder:text-[#7A8391] focus:border-[#2457D6] focus:outline-none focus:ring-2 focus:ring-[#2457D6]/30";

function Field({
  label,
  id,
  type = "text",
  autoComplete,
  placeholder,
}: {
  label: string;
  id: string;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-[#14181F]">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        required
        className={inputClass}
      />
    </div>
  );
}

export default function StartPage() {
  const [mode, setMode] = useState<Mode>("login");
  const [role, setRole] = useState<Role>("client");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    // TODO: replace with your auth call, e.g. fetch("/api/auth/login" | "/api/auth/register", ...)
    console.log(mode, mode === "signup" ? { ...data, role } : data);
  }

  return (
    <main className="min-h-screen bg-[#F6F7F9] text-[#14181F]">
      <div className="mx-auto grid min-h-screen max-w-6xl items-center gap-12 px-6 py-10 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        {/* Left: what the product does */}
        <section>
          <div className="text-lg font-bold tracking-tight">Illit Services</div>

          <h1 className="mt-10 max-w-lg text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Know exactly where your device is in the repair queue.
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-[#4A5361]">
            Book a slot, follow every step of the repair, chat with your engineer and pay online
            once your device is ready.
          </p>

          {/* Live-looking tracker preview */}
          <div className="mt-10 max-w-lg rounded-2xl border border-[#E3E6EB] bg-white p-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-[#5B6472]">Repair #1042</div>
                <div className="font-semibold">iPhone 11, screen replacement</div>
              </div>
              <span className="rounded-full bg-[#FFF1D1] px-3 py-1 text-xs font-semibold text-[#8A5A00]">
                In repair
              </span>
            </div>
            <ol className="mt-5 flex items-center" aria-label="Repair progress">
              {STEPS.map((step, i) => (
                <li key={step} className="flex flex-1 items-center last:flex-none">
                  <span
                    className={
                      "h-3.5 w-3.5 shrink-0 rounded-full " +
                      (i < CURRENT_STEP
                        ? "bg-[#2457D6]"
                        : i === CURRENT_STEP
                        ? "border-4 border-[#2457D6] bg-white"
                        : "bg-[#E3E6EB]")
                    }
                    aria-current={i === CURRENT_STEP ? "step" : undefined}
                  >
                    <span className="sr-only">{step}</span>
                  </span>
                  {i < STEPS.length - 1 && (
                    <span
                      className={"mx-1 h-0.5 flex-1 " + (i < CURRENT_STEP ? "bg-[#2457D6]" : "bg-[#E3E6EB]")}
                    />
                  )}
                </li>
              ))}
            </ol>
            <div className="mt-2 flex justify-between text-xs text-[#5B6472]">
              <span>Received</span>
              <span className="font-semibold text-[#14181F]">In repair</span>
              <span>Ready</span>
            </div>
          </div>
        </section>

        {/* Right: auth card */}
        <section className="w-full max-w-md justify-self-center lg:justify-self-end">
          <div className="rounded-2xl border border-[#E3E6EB] bg-white p-6 shadow-sm sm:p-8">
            {/* Tabs */}
            <div role="tablist" aria-label="Account" className="grid grid-cols-2 rounded-lg bg-[#EEF0F3] p-1">
              {(["login", "signup"] as Mode[]).map((m) => (
                <button
                  key={m}
                  role="tab"
                  type="button"
                  aria-selected={mode === m}
                  onClick={() => setMode(m)}
                  className={
                    "h-10 rounded-md text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2457D6] " +
                    (mode === m ? "bg-white text-[#14181F] shadow-sm" : "text-[#5B6472] hover:text-[#14181F]")
                  }
                >
                  {m === "login" ? "Log in" : "Sign up"}
                </button>
              ))}
            </div>

            <h2 className="mt-6 text-xl font-bold">
              {mode === "login" ? "Welcome back" : "Create your account"}
            </h2>
            <p className="mt-1 text-sm text-[#5B6472]">
              {mode === "login"
                ? "Log in to see your devices and repair queue."
                : "Choose how you will use the service."}
            </p>

            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
              {mode === "signup" && (
                <fieldset className="grid grid-cols-2 gap-3">
                  <legend className="sr-only">Account type</legend>
                  {(
                    [
                      { value: "client", title: "Client", hint: "I need a repair" },
                      { value: "engineer", title: "Engineer", hint: "I repair devices" },
                    ] as { value: Role; title: string; hint: string }[]
                  ).map((r) => (
                    <label
                      key={r.value}
                      className={
                        "cursor-pointer rounded-xl border p-3 transition-colors focus-within:ring-2 focus-within:ring-[#2457D6]/40 " +
                        (role === r.value
                          ? "border-[#2457D6] bg-[#EAF0FD]"
                          : "border-[#D5D9E0] bg-white hover:border-[#9AA3B2]")
                      }
                    >
                      <input
                        type="radio"
                        name="role"
                        value={r.value}
                        checked={role === r.value}
                        onChange={() => setRole(r.value)}
                        className="sr-only"
                      />
                      <div className="text-sm font-semibold">{r.title}</div>
                      <div className="text-xs text-[#5B6472]">{r.hint}</div>
                    </label>
                  ))}
                </fieldset>
              )}

              {mode === "signup" && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Full name" id="fullName" autoComplete="name" />
                  <Field label="Username" id="username" autoComplete="username" />
                </div>
              )}

              <Field
                label="Email"
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
              />
              <Field
                label="Password"
                id="password"
                type="password"
                autoComplete={mode === "login" ? "current-password" : "new-password"}
              />

              {mode === "signup" && (
                <>
                  <Field label="Phone number" id="phone" type="tel" autoComplete="tel" />
                  <Field label="Address" id="address" autoComplete="street-address" />
                </>
              )}

              <button
                type="submit"
                className="mt-2 h-12 rounded-lg bg-[#2457D6] text-sm font-semibold text-white transition-colors hover:bg-[#1D4AB8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2457D6] focus-visible:ring-offset-2"
              >
                {mode === "login" ? "Log in" : "Create account"}
              </button>
            </form>

            <p className="mt-5 text-center text-sm text-[#5B6472]">
              {mode === "login" ? "New here?" : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={() => setMode(mode === "login" ? "signup" : "login")}
                className="font-semibold text-[#2457D6] underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2457D6]"
              >
                {mode === "login" ? "Create an account" : "Log in"}
              </button>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}