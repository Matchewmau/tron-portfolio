import { useState, type FormEvent } from 'react';
import {
  AlertCircle,
  Check,
  CheckCircle2,
  Copy,
  ExternalLink,
  Github,
  Loader2,
  Mail,
  MessageSquare,
  Phone,
  Send,
} from 'lucide-react';
import { useAudioHud } from '../../context/AudioContext';
import { portfolioData } from '../../data/portfolioData';
import { sendDirectPortfolioEmail } from '../../services/emailService';
import { ChamferButton } from '../ui/ChamferButton';
import { ChamferCard } from '../ui/ChamferCard';
import { NeonBadge } from '../ui/NeonBadge';
import { SectionHeader } from '../ui/SectionHeader';

interface FormErrors {
  senderName?: string;
  senderEmail?: string;
  message?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function CommsUplink() {
  const { identity } = portfolioData;
  const { playClick, playHover, playTransmit } = useAudioHud();

  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [deliveryFeedback, setDeliveryFeedback] = useState('');
  const [needsActivation, setNeedsActivation] = useState(false);
  const [copiedField, setCopiedField] = useState<'email' | 'phone' | null>(null);

  const handleCopy = async (value: string, field: 'email' | 'phone') => {
    playClick();
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(value);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = value;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopiedField(field);
      window.setTimeout(() => {
        setCopiedField((current) => (current === field ? null : current));
      }, 2200);
    } catch {
      setCopiedField(field);
    }
  };

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (!senderName.trim() || senderName.trim().length < 2) {
      nextErrors.senderName = 'Please enter your name or organization (at least 2 characters).';
    }
    if (!EMAIL_PATTERN.test(senderEmail.trim())) {
      nextErrors.senderEmail = 'Please enter a valid email address.';
    }
    if (!message.trim() || message.trim().length < 10) {
      nextErrors.message = 'Please enter a message of at least 10 characters.';
    }
    return nextErrors;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      playClick();
      return;
    }

    setErrors({});
    setStatus('sending');
    setDeliveryFeedback('');
    setNeedsActivation(false);

    const result = await sendDirectPortfolioEmail({
      recipientEmail: identity.email,
      senderName,
      senderEmail,
      message,
      honeypot,
    });

    if (result.ok) {
      playTransmit();
      setNeedsActivation(Boolean(result.needsActivation));
      setDeliveryFeedback(result.statusMessage);
      setStatus('sent');
    } else {
      playClick();
      setDeliveryFeedback(result.statusMessage);
      setStatus('error');
    }
  };

  const buildFallbackMailtoHref = () => {
    const subject = encodeURIComponent(
      `Portfolio Inquiry from ${senderName.trim() || 'Prospective Collaborator'}`
    );
    const body = encodeURIComponent(
      `Name: ${senderName.trim()}\nEmail: ${senderEmail.trim()}\n\n${message.trim()}`
    );
    return `mailto:${identity.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section
      id="uplink"
      aria-labelledby="uplink-heading"
      className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8"
    >
      <div id="uplink-heading">
        <SectionHeader
          indexCode="04"
          protocol="Contact"
          title="Let's Work Together"
          subtitle="Open to Remote/WFH and On-Site roles in full-stack web development, software engineering, and AI research."
        />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column: Direct Contact Details & Copy Actions */}
        <div className="flex flex-col justify-between gap-6 lg:col-span-5">
          <ChamferCard accent="cyan" innerClassName="p-6">
            <NeonBadge accent="cyan" pulse>
              Direct Contact
            </NeonBadge>

            <h3 className="mt-4 font-display text-lg font-semibold tracking-wide text-[#F1F6FA]">
              Reach Out Directly
            </h3>
            <p className="mt-1.5 font-sans text-sm leading-relaxed text-[#A3BACB]">
              Copy my email or phone number with one click, or send a message straight to my inbox
              using the form.
            </p>

            <div className="mt-6 space-y-4">
              {/* Email Row */}
              <div className="rounded border border-[#38D9F5]/20 bg-[#07101B]/75 p-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-2 font-sans text-xs font-medium text-[#7CE7FA]">
                    <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                    Email
                  </span>
                  <button
                    type="button"
                    onMouseEnter={playHover}
                    onClick={() => void handleCopy(identity.email, 'email')}
                    aria-label={`Copy email address ${identity.email}`}
                    className="inline-flex min-h-[38px] items-center gap-1.5 rounded border border-[#38D9F5]/30 bg-[#38D9F5]/10 px-3 py-1 font-sans text-xs font-medium text-[#E6F4FA] transition-colors duration-150 hover:bg-[#38D9F5] hover:text-[#07101B]"
                  >
                    {copiedField === 'email' ? (
                      <>
                        <Check className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="mt-1.5 break-all font-mono text-sm text-[#F1F6FA]">
                  {identity.email}
                </p>
              </div>

              {/* Phone Row */}
              <div className="rounded border border-[#38D9F5]/20 bg-[#07101B]/75 p-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-2 font-sans text-xs font-medium text-[#7CE7FA]">
                    <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                    Phone
                  </span>
                  <button
                    type="button"
                    onMouseEnter={playHover}
                    onClick={() => void handleCopy(identity.phone, 'phone')}
                    aria-label={`Copy phone number ${identity.phone}`}
                    className="inline-flex min-h-[38px] items-center gap-1.5 rounded border border-[#38D9F5]/30 bg-[#38D9F5]/10 px-3 py-1 font-sans text-xs font-medium text-[#E6F4FA] transition-colors duration-150 hover:bg-[#38D9F5] hover:text-[#07101B]"
                  >
                    {copiedField === 'phone' ? (
                      <>
                        <Check className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="mt-1.5 font-mono text-sm text-[#F1F6FA]">{identity.phone}</p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <ChamferButton
                href={`mailto:${identity.email}`}
                variant="solid"
                accent="cyan"
                className="w-full"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                <span>Email App</span>
              </ChamferButton>

              <ChamferButton
                href={identity.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                accent="cyan"
                className="w-full"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
                <span>GitHub</span>
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </ChamferButton>
            </div>
          </ChamferCard>
        </div>

        {/* Right Column: Direct Email Contact Form */}
        <div className="lg:col-span-7">
          <ChamferCard accent="cyan" innerClassName="p-6 sm:p-8">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-2 border-b border-[#38D9F5]/15 pb-4">
              <div className="flex items-center gap-2.5 text-[#7CE7FA]">
                <MessageSquare className="h-4 w-4 shrink-0" aria-hidden="true" />
                <h3 className="font-display text-base font-semibold tracking-wide text-[#F1F6FA]">
                  Send a Direct Message
                </h3>
              </div>
              <span className="font-mono text-xs text-[#A3BACB]">Direct Inbox Delivery</span>
            </div>

            {status === 'sent' ? (
              <div
                role="status"
                aria-live="polite"
                className="space-y-4 rounded border border-[#38D9F5]/30 bg-[#07101B]/85 p-5 sm:p-6"
              >
                <NeonBadge accent={needsActivation ? 'orange' : 'cyan'} pulse>
                  {needsActivation ? 'One-Time Inbox Activation' : 'Message Sent'}
                </NeonBadge>

                <div className="flex items-start gap-3">
                  <CheckCircle2
                    className={`mt-0.5 h-5 w-5 shrink-0 ${
                      needsActivation ? 'text-[#FB923C]' : 'text-[#38D9F5]'
                    }`}
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-display text-lg font-semibold tracking-wide text-[#F1F6FA]">
                      {needsActivation
                        ? 'Confirm Form Activation in Your Inbox'
                        : 'Thank You — Message Sent!'}
                    </p>
                    <p className="mt-1.5 font-sans text-sm leading-relaxed text-[#A3BACB]">
                      {deliveryFeedback}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <ChamferButton
                    type="button"
                    variant="outline"
                    accent="cyan"
                    onClick={() => {
                      setSenderName('');
                      setSenderEmail('');
                      setMessage('');
                      setHoneypot('');
                      setDeliveryFeedback('');
                      setNeedsActivation(false);
                      setStatus('idle');
                    }}
                  >
                    <span>Send Another Message</span>
                  </ChamferButton>
                </div>
              </div>
            ) : (
              <form onSubmit={(e) => void handleSubmit(e)} noValidate className="space-y-5">
                {/* Hidden Honeypot Field for Automated Bot Spam Protection */}
                <input
                  type="text"
                  name="_honey"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />

                {status === 'error' && (
                  <div
                    role="alert"
                    className="flex flex-col gap-2.5 rounded border border-[#FB923C]/45 bg-[#FB923C]/10 p-4 font-sans text-sm text-[#FED7AA]"
                  >
                    <div className="flex items-start gap-2">
                      <AlertCircle
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#FB923C]"
                        aria-hidden="true"
                      />
                      <span>{deliveryFeedback}</span>
                    </div>
                    <div>
                      <a
                        href={buildFallbackMailtoHref()}
                        className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-[#7CE7FA] underline underline-offset-4 hover:text-[#38D9F5]"
                      >
                        <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Or click here to send via your default email app</span>
                      </a>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="uplink-name"
                      className="mb-2 block font-sans text-sm font-medium text-[#D5E4F0]"
                    >
                      Your Name
                    </label>
                    <input
                      id="uplink-name"
                      name="senderName"
                      type="text"
                      disabled={status === 'sending'}
                      value={senderName}
                      onChange={(e) => {
                        setSenderName(e.target.value);
                        if (errors.senderName) {
                          setErrors((prev) => ({ ...prev, senderName: undefined }));
                        }
                      }}
                      placeholder="Jane Doe / Company"
                      aria-invalid={Boolean(errors.senderName)}
                      aria-describedby={errors.senderName ? 'err-uplink-name' : undefined}
                      className="min-h-[44px] w-full rounded border border-[#38D9F5]/25 bg-[#07101B]/90 px-3.5 py-2.5 font-sans text-sm text-[#F1F6FA] placeholder-[#A3BACB]/45 transition-colors focus:border-[#38D9F5] disabled:opacity-60"
                    />
                    {errors.senderName && (
                      <p
                        id="err-uplink-name"
                        role="alert"
                        className="mt-1.5 flex items-center gap-1.5 font-sans text-xs text-[#FDBA74]"
                      >
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.senderName}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="uplink-email"
                      className="mb-2 block font-sans text-sm font-medium text-[#D5E4F0]"
                    >
                      Email Address
                    </label>
                    <input
                      id="uplink-email"
                      name="senderEmail"
                      type="email"
                      disabled={status === 'sending'}
                      value={senderEmail}
                      onChange={(e) => {
                        setSenderEmail(e.target.value);
                        if (errors.senderEmail) {
                          setErrors((prev) => ({ ...prev, senderEmail: undefined }));
                        }
                      }}
                      placeholder="you@company.com"
                      aria-invalid={Boolean(errors.senderEmail)}
                      aria-describedby={errors.senderEmail ? 'err-uplink-email' : undefined}
                      className="min-h-[44px] w-full rounded border border-[#38D9F5]/25 bg-[#07101B]/90 px-3.5 py-2.5 font-sans text-sm text-[#F1F6FA] placeholder-[#A3BACB]/45 transition-colors focus:border-[#38D9F5] disabled:opacity-60"
                    />
                    {errors.senderEmail && (
                      <p
                        id="err-uplink-email"
                        role="alert"
                        className="mt-1.5 flex items-center gap-1.5 font-sans text-xs text-[#FDBA74]"
                      >
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.senderEmail}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="uplink-message"
                    className="mb-2 block font-sans text-sm font-medium text-[#D5E4F0]"
                  >
                    Message
                  </label>
                  <textarea
                    id="uplink-message"
                    name="message"
                    rows={5}
                    disabled={status === 'sending'}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (errors.message) {
                        setErrors((prev) => ({ ...prev, message: undefined }));
                      }
                    }}
                    placeholder="Tell me about the role, project scope, or research collaboration..."
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'err-uplink-message' : undefined}
                    className="w-full rounded border border-[#38D9F5]/25 bg-[#07101B]/90 px-3.5 py-3 font-sans text-sm text-[#F1F6FA] placeholder-[#A3BACB]/45 transition-colors focus:border-[#38D9F5] disabled:opacity-60"
                  />
                  {errors.message && (
                    <p
                      id="err-uplink-message"
                      role="alert"
                      className="mt-1.5 flex items-center gap-1.5 font-sans text-xs text-[#FDBA74]"
                    >
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <span className="font-sans text-xs text-[#A3BACB]">
                    Delivers to: <span className="break-all text-[#7CE7FA]">{identity.email}</span>
                  </span>

                  <ChamferButton
                    type="submit"
                    variant="solid"
                    accent="cyan"
                    disabled={status === 'sending'}
                  >
                    {status === 'sending' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" aria-hidden="true" />
                        <span>Send Message</span>
                      </>
                    )}
                  </ChamferButton>
                </div>
              </form>
            )}
          </ChamferCard>
        </div>
      </div>
    </section>
  );
}
