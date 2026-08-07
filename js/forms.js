/* Shared submission helper for RSVP + Pickleball forms.
   HOW TO RECEIVE RESPONSES (pick one):
   1) Formspree (recommended, free): create a form at formspree.io,
      paste its URL below as ENDPOINT, e.g. "https://formspree.io/f/abcdwxyz".
      Responses arrive in your email/inbox dashboard as they're submitted.
   2) Leave ENDPOINT empty: submitting opens the guest's email app with a
      pre-filled message addressed to EMAIL below. Set EMAIL to yours. */
window.WEDDING_FORMS = {
  ENDPOINT: "",                                  // <- paste Formspree URL here
  EMAIL: "harrisonsetsail@gmail.com"             // <- fallback mailto address
};

async function sendWeddingForm(subject, data){
  const cfg = window.WEDDING_FORMS;
  if (cfg.ENDPOINT) {
    const res = await fetch(cfg.ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({ _subject: subject, ...data })
    });
    if (!res.ok) throw new Error("Submission failed");
    return "sent";
  }
  // mailto fallback
  const lines = [];
  (function flat(obj, prefix){
    for (const [k,v] of Object.entries(obj)){
      if (v && typeof v === "object") flat(v, prefix + k + " ");
      else lines.push(`${prefix}${k}: ${v}`);
    }
  })(data, "");
  const href = `mailto:${cfg.EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
  window.location.href = href;
  return "mailto";
}
