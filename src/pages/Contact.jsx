import { useMemo, useState } from "react";
import { LoaderCircle, Mail, MessageSquareText, Phone } from "lucide-react";
import SeoManager from "../components/seo/SeoManager";
import BorderButton from "../components/common/buttons/BorderButton";
import { useToast } from "../components/common/ui/ToastProvider";
import { submitContact } from "../api/portfolio";

const INITIAL_FORM = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const [values, setValues] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmittedAt, setLastSubmittedAt] = useState(0);
  const toast = useToast();

  const canSubmit = useMemo(() => {
    return !isSubmitting;
  }, [isSubmitting]);

  const validate = (payload) => {
    const nextErrors = {};

    if (!payload.name.trim()) {
      nextErrors.name = "Name is required.";
    }
    if (!payload.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!EMAIL_REGEX.test(payload.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!payload.subject.trim()) {
      nextErrors.subject = "Subject is required.";
    }
    if (!payload.message.trim()) {
      nextErrors.message = "Message is required.";
    }

    return nextErrors;
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (Date.now() - lastSubmittedAt < 15000) {
      toast.error({
        title: "Please wait before retrying",
        message: "For spam prevention, submit another message after 15 seconds.",
      });
      return;
    }

    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      await submitContact(values);
      setLastSubmittedAt(Date.now());
      setValues(INITIAL_FORM);
      setErrors({});
      toast.success({
        title: "Message sent successfully",
        message: "Thanks for reaching out. I will respond as soon as possible.",
      });
    } catch (error) {
      toast.error({
        title: "Submission failed",
        message: `${error.message} Please retry in a moment.`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SeoManager
        title="Contact"
        description="Contact Bassam for full-stack product development, React/Laravel collaboration, and frontend engineering opportunities."
        path="/contact"
        keywords={["Contact", "Hire Full Stack Developer", "React Laravel Developer"]}
      />

      <section className="relative pt-24 pb-16">
        <div className="mx-auto w-full max-w-[1400px] px-4 md:px-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold leading-tight tracking-tight text-black dark:text-white md:text-6xl max-w-2xl">
                Let&apos;s discuss your next product milestone.
              </h1>

              <p className="max-w-2xl text-lg leading-8 text-black/70 dark:text-white/70">
                Fill in the form and I will respond with a practical breakdown for collaboration, timeline, and delivery expectations.
              </p>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-black/10 bg-white/75 p-4 dark:border-white/10 dark:bg-white/5">
                  <Mail className="size-4 text-[#258cf4]" aria-hidden="true" />
                  <p className="mt-2 text-xs uppercase tracking-[0.28em] text-black/45 dark:text-white/55">Email</p>
                  <p className="mt-1 text-sm text-black/75 dark:text-white/75">hello@bassamworks.dev</p>
                </div>
                <div className="rounded-2xl border border-black/10 bg-white/75 p-4 dark:border-white/10 dark:bg-white/5">
                  <Phone className="size-4 text-[#f5d34f]" aria-hidden="true" />
                  <p className="mt-2 text-xs uppercase tracking-[0.28em] text-black/45 dark:text-white/55">Phone</p>
                  <p className="mt-1 text-sm text-black/75 dark:text-white/75">+92 your-number-here</p>
                </div>
                <div className="rounded-2xl border border-black/10 bg-white/75 p-4 dark:border-white/10 dark:bg-white/5">
                  <MessageSquareText className="size-4 text-[#00a39a]" aria-hidden="true" />
                  <p className="mt-2 text-xs uppercase tracking-[0.28em] text-black/45 dark:text-white/55">Response</p>
                  <p className="mt-1 text-sm text-black/75 dark:text-white/75">Usually within 24 hours</p>
                </div>
              </div>
            </div>

            <form
              onSubmit={onSubmit}
              className="rounded-[2rem] border border-black/10 bg-white/80 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.12)] backdrop-blur-sm dark:border-white/10 dark:bg-white/5"
              noValidate
            >
              <p className="text-xs font-semibold uppercase tracking-[0.38em] text-black/45 dark:text-white/45">Contact form</p>

              <div className="mt-5 grid gap-4">
                <label className="grid gap-2" htmlFor="contact-name">
                  <span className="text-xs uppercase tracking-[0.28em] text-black/55 dark:text-white/55">Name</span>
                  <input
                    id="contact-name"
                    name="name"
                    value={values.name}
                    onChange={onChange}
                    className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm text-black outline-none transition-colors focus:border-[#258cf4] dark:border-white/15 dark:bg-[#0f1422] dark:text-white"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "contact-name-error" : undefined}
                  />
                  {errors.name ? <span id="contact-name-error" className="text-xs text-rose-600 dark:text-rose-300">{errors.name}</span> : null}
                </label>

                <label className="grid gap-2" htmlFor="contact-email">
                  <span className="text-xs uppercase tracking-[0.28em] text-black/55 dark:text-white/55">Email</span>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={onChange}
                    className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm text-black outline-none transition-colors focus:border-[#258cf4] dark:border-white/15 dark:bg-[#0f1422] dark:text-white"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "contact-email-error" : undefined}
                  />
                  {errors.email ? <span id="contact-email-error" className="text-xs text-rose-600 dark:text-rose-300">{errors.email}</span> : null}
                </label>

                <label className="grid gap-2" htmlFor="contact-subject">
                  <span className="text-xs uppercase tracking-[0.28em] text-black/55 dark:text-white/55">Subject</span>
                  <input
                    id="contact-subject"
                    name="subject"
                    value={values.subject}
                    onChange={onChange}
                    className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm text-black outline-none transition-colors focus:border-[#258cf4] dark:border-white/15 dark:bg-[#0f1422] dark:text-white"
                    aria-invalid={Boolean(errors.subject)}
                    aria-describedby={errors.subject ? "contact-subject-error" : undefined}
                  />
                  {errors.subject ? <span id="contact-subject-error" className="text-xs text-rose-600 dark:text-rose-300">{errors.subject}</span> : null}
                </label>

                <label className="grid gap-2" htmlFor="contact-message">
                  <span className="text-xs uppercase tracking-[0.28em] text-black/55 dark:text-white/55">Message</span>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    value={values.message}
                    onChange={onChange}
                    className="w-full resize-y rounded-xl border border-black/15 bg-white px-4 py-3 text-sm text-black outline-none transition-colors focus:border-[#258cf4] dark:border-white/15 dark:bg-[#0f1422] dark:text-white"
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "contact-message-error" : undefined}
                  />
                  {errors.message ? <span id="contact-message-error" className="text-xs text-rose-600 dark:text-rose-300">{errors.message}</span> : null}
                </label>

                <BorderButton
                  type="submit"
                  variant="solid"
                  disabled={!canSubmit}
                  className="mt-2 w-full justify-center rounded-full border-0 bg-[#f5d34f] px-5 py-3 text-xs font-bold uppercase tracking-[0.24em] text-[#101114] hover:bg-[#ffe07a] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span className="inline-flex items-center gap-2">
                      <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
                      Sending
                    </span>
                  ) : (
                    "Send message"
                  )}
                </BorderButton>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
