import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from '../App';
import { BOOT_STORAGE_KEY } from '../components/layout/BootSequence';

describe('Into the Grid — Refined Tron Portfolio', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('displays BootSequence on first visit, skips on Skip, and persists in sessionStorage', async () => {
    const { unmount } = render(<App />);

    expect(screen.getByRole('dialog', { name: /system boot sequence/i })).toBeInTheDocument();
    expect(screen.getByText('> Initializing Grid Interface...')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /skip/i }));

    await waitFor(() => {
      expect(
        screen.queryByRole('dialog', { name: /system boot sequence/i })
      ).not.toBeInTheDocument();
    });
    expect(sessionStorage.getItem(BOOT_STORAGE_KEY)).toBe('true');

    unmount();

    // Second render in same session bypasses BootSequence immediately
    render(<App />);
    expect(
      screen.queryByRole('dialog', { name: /system boot sequence/i })
    ).not.toBeInTheDocument();
  });

  it('renders disc outer synthwave canvas, illuminated About nav link, lowered volume slider, and projects', () => {
    sessionStorage.setItem(BOOT_STORAGE_KEY, 'true');
    render(<App />);

    // Glitch Hero Heading, Horizon SynthWave Canvas & Identity Disc Radial SynthWave Canvas
    const heroHeading = screen.getByRole('heading', { name: /John Mathew B\. Mauricio/i });
    expect(heroHeading).toBeInTheDocument();
    expect(heroHeading).toHaveAttribute('data-text', 'John Mathew B. Mauricio');
    expect(screen.getByTestId('synth-wave-canvas')).toBeInTheDocument();
    expect(screen.getByTestId('disc-synthwave-canvas')).toBeInTheDocument();

    // Illuminated Active "About" Navigation Link
    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toHaveAttribute('aria-current', 'location');

    // Lowered Default Music Volume Slider (~0.16)
    const volumeSlider = screen.getByLabelText('Music volume') as HTMLInputElement;
    expect(parseFloat(volumeSlider.value)).toBeCloseTo(0.16, 2);
    fireEvent.change(volumeSlider, { target: { value: '0.10' } });
    expect(parseFloat(volumeSlider.value)).toBeCloseTo(0.1, 2);

    // Portrait & Role
    expect(screen.getByAltText('John Mathew B. Mauricio')).toBeInTheDocument();
    expect(
      screen.getByText(/Web Developer \| Programmer \| AI Researcher/i)
    ).toBeInTheDocument();

    // "End of Line" Soundtrack toggle starts paused and activates cleanly
    const audioBtn = screen.getByRole('button', { name: /play end of line soundtrack/i });
    expect(audioBtn).toHaveAttribute('aria-pressed', 'false');
    fireEvent.click(audioBtn);
    expect(
      screen.getByRole('button', { name: /pause end of line soundtrack/i })
    ).toHaveAttribute('aria-pressed', 'true');
    expect(heroHeading.className).toContain('tron-glitch-synced');

    // Project Cards & Cover Previews
    expect(screen.getByRole('heading', { name: 'HairMixer' })).toBeInTheDocument();
    expect(screen.getByAltText('HairMixer interface preview')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'PConnect' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'TJ Fitness' })).toBeInTheDocument();

    // Education, Credentials & Languages
    expect(screen.getByText(/Western Mindanao State University/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Civil Service Eligibility — Professional Level/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Published Presenter: ECAI 2026 International Conference/i)
    ).toBeInTheDocument();
    expect(screen.getByText('Chavacano')).toBeInTheDocument();
  });

  it('opens Case Study Modal with interactive screenshot gallery and navigates slides', async () => {
    sessionStorage.setItem(BOOT_STORAGE_KEY, 'true');
    render(<App />);

    const inspectHairMixerBtn = screen.getByRole('button', {
      name: /view case study for hairmixer/i,
    });
    fireEvent.click(inspectHairMixerBtn);

    const dialog = await screen.findByRole('dialog');
    expect(
      within(dialog).getByText(
        /HairMixer — AI-Powered Hairstyle Recommendation & Simulation System/i
      )
    ).toBeInTheDocument();
    expect(within(dialog).getByText(/Screen 1 of 5/i)).toBeInTheDocument();
    expect(
      within(dialog).getByText(/Landing Interface & 3-Step Virtual Try-On Workflow/i)
    ).toBeInTheDocument();

    // Navigate to next screenshot in gallery
    fireEvent.click(within(dialog).getByRole('button', { name: /next screenshot/i }));
    expect(within(dialog).getByText(/Screen 2 of 5/i)).toBeInTheDocument();
    expect(
      within(dialog).getByText(/Interactive Style Discovery & Category Filtering/i)
    ).toBeInTheDocument();

    // Verify architecture notes & metrics
    expect(within(dialog).getByText(/System Architecture Overview/i)).toBeInTheDocument();
    expect(within(dialog).getByText(/40% Latency Reduction/i)).toBeInTheDocument();

    fireEvent.click(
      within(dialog).getByRole('button', { name: /close project case study modal/i })
    );

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('validates contact form, copies endpoints, and sends direct email via FormSubmit AJAX', async () => {
    sessionStorage.setItem(BOOT_STORAGE_KEY, 'true');
    const user = userEvent.setup();
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: writeTextMock },
    });

    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ success: 'true', message: 'Email sent' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    );

    render(<App />);

    // Copy email & phone buttons
    fireEvent.click(
      screen.getByRole('button', { name: /copy email address johnmathewmau@gmail\.com/i })
    );
    expect(writeTextMock).toHaveBeenCalledWith('johnmathewmau@gmail.com');

    fireEvent.click(
      screen.getByRole('button', { name: /copy phone number \+63 956 628 4039/i })
    );
    expect(writeTextMock).toHaveBeenCalledWith('+63 956 628 4039');

    // Submit empty form -> expect friendly validation messages
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    expect(
      await screen.findByText(/Please enter your name or organization/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Please enter a message of at least 10 characters/i)
    ).toBeInTheDocument();

    // Fill valid message & submit
    await user.type(screen.getByLabelText(/Your Name/i), 'Flynn Labs');
    await user.type(screen.getByLabelText(/^Email Address$/i), 'flynn@encom.com');
    await user.type(
      screen.getByLabelText(/^Message$/i),
      'Interested in collaborating on computer vision and full-stack architecture.'
    );

    await user.click(screen.getByRole('button', { name: /send message/i }));

    expect(await screen.findByText(/Thank You — Message Sent!/i)).toBeInTheDocument();
    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledWith(
      'https://formsubmit.co/ajax/johnmathewmau%40gmail.com',
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
    );
  });
});
