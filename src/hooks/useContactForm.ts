import { useCallback, useState } from "react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mrpbgknd";

export type ContactFormStatus = "idle" | "submitting" | "success" | "error";

/**
 * Shared submission logic for the contact form, used by both the desktop
 * (ContactV2) and mobile (MobileContact) forms so the Formspree integration
 * only lives in one place. Each caller keeps its own controlled `formData`
 * state and JSX/design untouched — this hook only owns the submit request
 * and the resulting status.
 *
 * Reads field values straight from the submitted <form> via FormData rather
 * than needing a duplicate copy of the form's values, so it stays agnostic
 * to whatever fields either form actually renders.
 */
export function useContactForm() {
  const [status, setStatus] = useState<ContactFormStatus>("idle");

  const submit = useCallback(async (form: HTMLFormElement) => {
    if (status === "submitting") return false;
    setStatus("submitting");

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setStatus("success");
        return true;
      }

      setStatus("error");
      return false;
    } catch {
      setStatus("error");
      return false;
    }
  }, [status]);

  return { status, submit };
}
