"use client";

import { useState, useTransition, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function UrlForm() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isPending) return;
    const trimmed = value.trim();

    if (!trimmed) {
      setError("Colle l'adresse d'une page web pour commencer.");
      return;
    }

    const withProtocol = /^https?:\/\//i.test(trimmed)
      ? trimmed
      : `https://${trimmed}`;

    try {
      const parsed = new URL(withProtocol);
      setError("");
      startTransition(() => {
        router.push(`/${parsed.href}`);
      });
    } catch {
      setError("Cette adresse n'est pas valide. Exemple : https://exemple.com/page");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl flex flex-col gap-3">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="https://exemple.com/page"
          aria-label="Adresse de la page web"
          aria-invalid={error ? true : undefined}
          disabled={isPending}
          className="input input-bordered w-full"
        />
        <button type="submit" disabled={isPending} className="btn btn-primary">
          {isPending ? (
            <>
              <span className="loading loading-spinner loading-sm"></span>
              Analyse de la page…
            </>
          ) : (
            "Discuter avec cette page"
          )}
        </button>
      </div>
      {error && (
        <p role="alert" className="text-sm text-error">
          {error}
        </p>
      )}
    </form>
  );
}