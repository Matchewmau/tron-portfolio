import { useState, type FormEvent } from 'react';
import {
  AlertTriangle,
  Check,
  Copy,
  ExternalLink,
  Github,
  Mail,
  Phone,
  Send,
  Terminal,
} from 'lucide-react';
import { useAudioHud } from '../../context/AudioContext';
import { portfolioData } from '../../data/portfolioData';
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
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'transmitting' | 'sent'>('idle');
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
      nextErrors.senderName = 'ERR_SENDER_ID: Enter your name or organization (min 2 chars).';
    }
    if (!EMAIL_PATTERN.test(senderEmail.trim())) {
      nextErrors.senderEmail = 'ERR_RETURN_CHANNEL: Enter a valid email address.';
    }
    if (!message.trim() || message.trim().length < 10) {
      nextErrors.message =
        'ERR_EMPTY_PAYLOAD: Transmission message must contain at least 10 characters.';
    }
    return nextErrors;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      playClick();
      return;
    }

    setErrors({});
    setStatus('transmitting');
    playTransmit();

    window.setTimeout(() => {
      setStatus('sent');
    }, 350);
  };

  const buildMailtoHref = () => {
    const subject = encodeURIComponent(
      `[GRID UPLINK] Inquiry from ${senderName.trim() || 'Prospective Collaborator'}`
    );
    const body = encodeURIComponent(
      `Sender: ${senderName.trim()}\nReturn Email: ${senderEmail.trim()}\n\n${message.trim()}`
    );
    return `mailto:${identity.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section
      id="uplink"
      aria-labelledby="uplink-heading"
      className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
    >
      <div id="uplink-heading">
        <SectionHeader
          indexCode="04"
          protocol="COMMS_UPLINK"
          title="Initiate Direct Transmission"
          subtitle="Available for Remote/WFH and On-Site software engineering, full-stack web architecture, and AI research collaborations."
        />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column: Direct Copy Channels & External Launch */}
        <div className="flex flex-col justify-between gap-6 lg:col-span-5">
          <ChamferCard accent="cyan" innerClassName="p-6">
            <NeonBadge accent="cyan" pulse>
              // DIRECT_CHANNELS_ACTIVE
            </NeonBadge>

            <h3 className="mt-4 font-display text-lg font-bold uppercase tracking-widest text-[#E2F1F8]">
              Verified Contact Endpoints
            </h3>
            <p className="mt-1.5 font-mono text-xs leading-relaxed text-[#8BAEC4]">
              Copy endpoint coordinates directly to clipboard or launch an external comms client.
            </p>

            {/* Email Endpoint */}
            <div className="mt-6 space-y-4">
              <div className="border border-[#00F0FF]/30 bg-[#02060B]/80 p-4 clip-chamfer-sm">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#00F0FF]">
                    <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                    EMAIL_ENDPOINT
                  </span>
                  <button
                    type="button"
                    onMouseEnter={playHover}
                    onClick={() => void handleCopy(identity.email, 'email')}
                    aria-label={`Copy email address ${identity.email}`}
                    className="inline-flex min-h-[44px] items-center gap-1.5 border border-[#00F0FF]/40 bg-[#00F0FF]/10 px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#00F0FF] transition-colors duration-150 hover:bg-[#00F0FF] hover:text-[#02060B]"
                  >
                    {copiedField === 'email' ? (
                      <>
                        <Check className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>COPIED</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>COPY</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="mt-2 break-all font-mono text-sm font-medium text-[#E2F1F8]">
                  {identity.email}
                </p>
              </div>

              {/* Phone Endpoint */}
              <div className="border border-[#00F0FF]/30 bg-[#02060B]/80 p-4 clip-chamfer-sm">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#00F0FF]">
                    <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                    VOICE_SMS_LINE
                  </span>
                  <button
                    type="button"
                    onMouseEnter={playHover}
                    onClick={() => void handleCopy(identity.phone, 'phone')}
                    aria-label={`Copy phone number ${identity.phone}`}
                    className="inline-flex min-h-[44px] items-center gap-1.5 border border-[#00F0FF]/40 bg-[#00F0FF]/10 px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#00F0FF] transition-colors duration-150 hover:bg-[#00F0FF] hover:text-[#02060B]"
                  >
                    {copiedField === 'phone' ? (
                      <>
                        <Check className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>COPIED</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>COPY</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="mt-2 font-mono text-sm font-medium text-[#E2F1F8]">
                  {identity.phone}
                </p>
              </div>
            </div>

            {/* Direct Launch Buttons */}
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <ChamferButton
                href={`mailto:${identity.email}`}
                variant="solid"
                accent="cyan"
                className="w-full"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                <span>LAUNCH_EMAIL</span>
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
                <span>LAUNCH_GITHUB</span>
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </ChamferButton>
            </div>
          </ChamferCard>
        </div>

        {/* Right Column: Terminal Contact Form (> ENTER_TRANSMISSION) */}
        <div className="lg:col-span-7">
          <ChamferCard accent="cyan" innerClassName="p-5 sm:p-8">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-2 border-b border-[#00F0FF]/25 pb-4">
              <div className="flex items-center gap-2 text-[#00F0FF]">
                <Terminal className="h-4 w-4 shrink-0" aria-hidden="true" />
                <h3 className="font-display text-sm font-bold uppercase tracking-wider sm:text-base sm:tracking-widest">
                  &gt; ENTER_TRANSMISSION
                </h3>
              </div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#8BAEC4] sm:tracking-widest">
                ENCRYPTION // TLS_GRID
              </span>
            </div>

            {status === 'sent' ? (
              <div
                role="status"
                aria-live="polite"
                className="space-y-5 border border-[#00F0FF]/40 bg-[#02060B]/85 p-4 sm:p-6 clip-chamfer-sm"
              >
                <NeonBadge accent="cyan" pulse>
                  PACKET_QUEUED // READY_FOR_DISPATCH
                </NeonBadge>
                <p className="font-display text-lg font-bold uppercase tracking-widest text-[#E2F1F8]">
                  Transmission Payload Verified
                </p>
                <p className="font-mono text-xs leading-relaxed text-[#8BAEC4] sm:text-sm">
                  Message from <span className="text-[#00F0FF]">{senderName}</span> (
                  <span className="break-all text-[#E2F1F8]">{senderEmail}</span>) has been
                  formatted. Click <strong className="text-[#00F0FF]">DISPATCH_MAIL_CLIENT</strong>{' '}
                  below to send directly to{' '}
                  <span className="break-all text-[#E2F1F8]">{identity.email}</span>, or reset to
                  compose a new packet.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <ChamferButton href={buildMailtoHref()} variant="solid" accent="cyan">
                    <Send className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>DISPATCH_MAIL_CLIENT</span>
                  </ChamferButton>

                  <ChamferButton
                    type="button"
                    variant="outline"
                    accent="cyan"
                    onClick={() => {
                      setSenderName('');
                      setSenderEmail('');
                      setMessage('');
                      setStatus('idle');
                    }}
                  >
                    <span>NEW_TRANSMISSION</span>
                  </ChamferButton>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* Sender Name */}
                  <div>
                    <label
                      htmlFor="uplink-name"
                      className="mb-2 block font-mono text-xs font-bold uppercase tracking-wider text-[#00F0FF]"
                    >
                      SENDER_ID *
                    </label>
                    <input
                      id="uplink-name"
                      name="senderName"
                      type="text"
                      value={senderName}
                      onChange={(e) => {
                        setSenderName(e.target.value);
                        if (errors.senderName) {
                          setErrors((prev) => ({ ...prev, senderName: undefined }));
                        }
                      }}
                      placeholder="e.g. Ada Lovelace / Acme Corp"
                      aria-invalid={Boolean(errors.senderName)}
                      aria-describedby={errors.senderName ? 'err-uplink-name' : undefined}
                      className="min-h-[44px] w-full border border-[#00F0FF]/35 bg-[#02060B]/90 px-3.5 py-2.5 font-mono text-sm text-[#E2F1F8] placeholder-[#8BAEC4]/45 transition-colors focus:border-[#00F0FF]"
                    />
                    {errors.senderName && (
                      <p
                        id="err-uplink-name"
                        role="alert"
                        className="mt-1.5 flex items-center gap-1.5 font-mono text-xs text-[#FF6B00]"
                      >
                        <AlertTriangle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.senderName}</span>
                      </p>
                    )}
                  </div>

                  {/* Return Email */}
                  <div>
                    <label
                      htmlFor="uplink-email"
                      className="mb-2 block font-mono text-xs font-bold uppercase tracking-wider text-[#00F0FF]"
                    >
                      RETURN_CHANNEL (EMAIL) *
                    </label>
                    <input
                      id="uplink-email"
                      name="senderEmail"
                      type="email"
                      value={senderEmail}
                      onChange={(e) => {
                        setSenderEmail(e.target.value);
                        if (errors.senderEmail) {
                          setErrors((prev) => ({ ...prev, senderEmail: undefined }));
                        }
                      }}
                      placeholder="operator@domain.com"
                      aria-invalid={Boolean(errors.senderEmail)}
                      aria-describedby={errors.senderEmail ? 'err-uplink-email' : undefined}
                      className="min-h-[44px] w-full border border-[#00F0FF]/35 bg-[#02060B]/90 px-3.5 py-2.5 font-mono text-sm text-[#E2F1F8] placeholder-[#8BAEC4]/45 transition-colors focus:border-[#00F0FF]"
                    />
                    {errors.senderEmail && (
                      <p
                        id="err-uplink-email"
                        role="alert"
                        className="mt-1.5 flex items-center gap-1.5 font-mono text-xs text-[#FF6B00]"
                      >
                        <AlertTriangle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.senderEmail}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Transmission Message */}
                <div>
                  <label
                    htmlFor="uplink-message"
                    className="mb-2 block font-mono text-xs font-bold uppercase tracking-wider text-[#00F0FF]"
                  >
                    TRANSMISSION_PAYLOAD *
                  </label>
                  <textarea
                    id="uplink-message"
                    name="message"
                    rows={5}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (errors.message) {
                        setErrors((prev) => ({ ...prev, message: undefined }));
                      }
                    }}
                    placeholder="Describe role scope, system architecture requirements, or research inquiry..."
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'err-uplink-message' : undefined}
                    className="w-full border border-[#00F0FF]/35 bg-[#02060B]/90 px-3.5 py-3 font-mono text-sm text-[#E2F1F8] placeholder-[#8BAEC4]/45 transition-colors focus:border-[#00F0FF]"
                  />
                  {errors.message && (
                    <p
                      id="err-uplink-message"
                      role="alert"
                      className="mt-1.5 flex items-center gap-1.5 font-mono text-xs text-[#FF6B00]"
                    >
                      <AlertTriangle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <span className="font-mono text-xs text-[#8BAEC4]">
                    TARGET: <span className="break-all text-[#00F0FF]">{identity.email}</span>
                  </span>

                  <ChamferButton
                    type="submit"
                    variant="solid"
                    accent="cyan"
                    disabled={status === 'transmitting'}
                  >
                    <Send className="h-4 w-4" aria-hidden="true" />
                    <span>
                      {status === 'transmitting' ? 'ENCRYPTING_PACKET...' : 'TRANSMIT_MESSAGE'}
                    </span>
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
