"use client";

import { useEffect, useState } from "react";

const FORM_ID = "261115069818055";
const API_KEY = "e031c082b71313437e17715928524edd";

export default function Page() {
  const [height, setHeight] = useState<number | null>(null);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [frame, setFrame] = useState(1);

  useEffect(() => {
    const update = () => setHeight(window.innerHeight);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setFrame(f => f === 6 ? 1 : f + 1), 500);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOverlayOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;

    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("website")) return; // honeypot

    const email = String(data.get("q4_email") ?? "");
    const message = String(data.get("q2_q2_textarea0") ?? "");

    setSubmitting(true);
    setError(null);
    try {
      const body = new URLSearchParams();
      body.set("submission[4]", email);
      body.set("submission[2]", message);
      const res = await fetch(
        `https://api.jotform.com/form/${FORM_ID}/submissions?apiKey=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: body.toString(),
        },
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main
      className="w-full flex items-center justify-center relative"
      style={{ height: height ?? "100vh" }}
    >
      <div className="relative w-full h-full" style={{ maxWidth: "652px" }}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={`/Guru_${i}.jpg`}
            alt=""
            className="absolute inset-0 w-full h-full"
            style={{ objectFit: "contain", opacity: frame === i ? 1 : 0 }}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={() => setOverlayOpen(true)}
        aria-label="Open contact form"
        aria-hidden={overlayOpen}
        tabIndex={overlayOpen ? -1 : 0}
        className="fixed top-4 right-4 z-40 cursor-pointer bg-transparent border-0 p-0 transition-opacity duration-150"
        style={{
          opacity: overlayOpen ? 0 : 1,
          pointerEvents: overlayOpen ? "none" : "auto",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/contact-button.svg"
          alt=""
          draggable={false}
          style={{ width: "100px", height: "auto" }}
        />
      </button>

      <div
        aria-hidden={!overlayOpen}
        className="fixed inset-0 w-full h-full flex items-center justify-center transition-opacity duration-200"
        style={{
          zIndex: 2147483647,
          opacity: overlayOpen ? 1 : 0,
          pointerEvents: overlayOpen ? "auto" : "none",
          backgroundColor: "rgba(103, 35, 29, 0.55)",
        }}
      >
        <div
          className="relative rounded-lg shadow-xl w-[min(92vw,720px)] max-h-[90vh] overflow-auto p-8"
          style={{ backgroundColor: "#ff5744" }}
        >
          <button
            type="button"
            onClick={() => setOverlayOpen(false)}
            aria-label="Close contact form"
            className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full text-[#67231d] hover:bg-[rgba(103,35,29,0.15)] text-2xl leading-none cursor-pointer"
          >
            ×
          </button>

          {submitted ? (
            <div className="py-10 text-center" style={{ color: "#67231d" }}>
              <h2 className="text-2xl font-semibold mb-2">
                Thanks — your message is on its way.
              </h2>
              <p>We&apos;ll get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate={false}>
              <ul
                className="form-section page-section"
                role="presentation"
              >
                <li
                  className="form-line jf-required"
                  data-type="control_email"
                  id="id_4"
                  data-css-selector="id_4"
                >
                  <label
                    className="form-label form-label-top form-label-auto"
                    id="label_4"
                    htmlFor="input_4"
                  >
                    {" "}
                    Email<span className="form-required">*</span>{" "}
                  </label>
                  <div
                    id="cid_4"
                    className="form-input-wide jf-required"
                    data-layout="half"
                  >
                    {" "}
                    <span
                      className="form-sub-label-container"
                      style={{ verticalAlign: "top" }}
                    >
                      <input
                        type="email"
                        id="input_4"
                        name="q4_email"
                        className="form-textbox validate[required, Email]"
                        data-defaultvalue=""
                        autoComplete="section-input_4 email"
                        style={{ width: "310px" }}
                        size={310}
                        data-component="email"
                        aria-labelledby="label_4 sublabel_input_4"
                        required
                        defaultValue=""
                      />
                      <label
                        className="form-sub-label"
                        htmlFor="input_4"
                        id="sublabel_input_4"
                        style={{ minHeight: "13px" }}
                      >
                        example@example.com
                      </label>
                    </span>{" "}
                  </div>
                </li>
                <li
                  className="form-line jf-required"
                  data-type="control_textarea"
                  id="id_2"
                  data-css-selector="id_2"
                >
                  <label
                    className="form-label form-label-top form-label-auto"
                    id="label_2"
                    htmlFor="input_2"
                  >
                    {" "}
                    Message<span className="form-required">*</span>{" "}
                  </label>
                  <div
                    id="cid_2"
                    className="form-input-wide jf-required"
                    data-layout="full"
                  >
                    {" "}
                    <textarea
                      id="input_2"
                      className="form-textarea validate[required]"
                      name="q2_q2_textarea0"
                      style={{ width: "648px", height: "163px" }}
                      data-component="textarea"
                      required
                      aria-labelledby="label_2"
                    />{" "}
                  </div>
                </li>
                <li
                  className="form-line"
                  data-type="control_button"
                  id="id_3"
                  data-css-selector="id_3"
                >
                  <div
                    id="cid_3"
                    className="form-input-wide"
                    data-layout="full"
                  >
                    <div
                      data-align="auto"
                      className="form-buttons-wrapper form-buttons-auto   jsTest-button-wrapperField"
                    >
                      <button
                        id="input_3"
                        type="submit"
                        disabled={submitting}
                        className="form-submit-button form-submit-button-white-400 submit-button jf-form-buttons jsTest-submitField legacy-submit"
                        data-component="button"
                        data-content=""
                        aria-live="polite"
                      >
                        {submitting ? "Sending…" : "Send Message"}
                      </button>
                    </div>
                  </div>
                </li>
                <li style={{ display: "none" }}>
                  Should be Empty:{" "}
                  <input type="text" name="website" defaultValue="" />
                </li>
              </ul>
              {error && (
                <p className="mt-3 text-sm text-red-600" role="alert">
                  Couldn&apos;t send: {error}. Please try again.
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
