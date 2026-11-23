export interface DirectEmailPayload {
  recipientEmail: string;
  senderName: string;
  senderEmail: string;
  message: string;
  honeypot?: string;
}

export interface DirectEmailResult {
  ok: boolean;
  needsActivation?: boolean;
  statusMessage: string;
}

interface FormSubmitResponse {
  success?: boolean | string;
  message?: string;
}

export async function sendDirectPortfolioEmail(
  payload: DirectEmailPayload
): Promise<DirectEmailResult> {
  // Silently drop automated bot submissions that populate the hidden honeypot field
  if (payload.honeypot && payload.honeypot.trim().length > 0) {
    return {
      ok: true,
      statusMessage: 'Your message has been sent.',
    };
  }

  const endpoint = `https://formsubmit.co/ajax/${encodeURIComponent(payload.recipientEmail)}`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: payload.senderName.trim(),
        email: payload.senderEmail.trim(),
        _replyto: payload.senderEmail.trim(),
        _subject: `Portfolio Inquiry from ${payload.senderName.trim()}`,
        message: payload.message.trim(),
        _template: 'table',
        _captcha: 'false',
        _honey: payload.honeypot ?? '',
      }),
    });

    const data = (await response.json().catch(() => ({}))) as FormSubmitResponse;
    const isSuccess = response.ok && (data.success === true || data.success === 'true');

    if (isSuccess) {
      return {
        ok: true,
        statusMessage: `Your message has been delivered directly to ${payload.recipientEmail}.`,
      };
    }

    const rawMessage = typeof data.message === 'string' ? data.message : '';
    if (/activat/i.test(rawMessage)) {
      return {
        ok: true,
        needsActivation: true,
        statusMessage:
          `Activation email sent to ${payload.recipientEmail}. Click "Activate Form" in that email once to enable instant inbox delivery for all future messages.`,
      };
    }

    return {
      ok: false,
      statusMessage:
        rawMessage ||
        'Unable to send message right now. Please try again or use the direct email link.',
    };
  } catch {
    return {
      ok: false,
      statusMessage:
        'Network connection error while sending your message. Please try again or email directly.',
    };
  }
}
