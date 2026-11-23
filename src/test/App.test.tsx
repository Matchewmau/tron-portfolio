import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import App from '../App';
import { BOOT_STORAGE_KEY } from '../components/layout/BootSequence';

describe('Into the Grid — Tron Portfolio', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('displays BootSequence on first visit, skips on [SKIP], and persists in sessionStorage', async () => {
    const { unmount } = render(<App />);

    expect(screen.getByRole('dialog', { name: /system boot sequence/i })).toBeInTheDocument();
    expect(screen.getByText('> INITIALIZING GRID...')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: '[SKIP]' }));

    await waitFor(() => {
      expect(
        screen.queryByRole('dialog', { name: /system boot sequence/i })
      ).not.toBeInTheDocument();
    });
    expect(sessionStorage.getItem(BOOT_STORAGE_KEY)).toBe('true');

    unmount();

    // Second render in same session should bypass BootSequence immediately
    render(<App />);
    expect(
      screen.queryByRole('dialog', { name: /system boot sequence/i })
    ).not.toBeInTheDocument();
  });

  it('renders complete portfolio identity, projects, arsenal, credentials, and navbar controls', () => {
    sessionStorage.setItem(BOOT_STORAGE_KEY, 'true');
    render(<App />);

    // Identity & Navbar
    expect(
      screen.getByRole('heading', { name: /JOHN MATHEW B\. MAURICIO/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Web Developer \| Programmer \| AI Researcher/i)
    ).toBeInTheDocument();
    expect(screen.getAllByText(/ONLINE \/\/ ZAMBOANGA_PH/i).length).toBeGreaterThan(0);

    // Web Audio Synthesizer toggle starts muted and toggles cleanly
    const audioBtn = screen.getByRole('button', { name: /enable ui audio synthesizer/i });
    expect(audioBtn).toHaveAttribute('aria-pressed', 'false');
    fireEvent.click(audioBtn);
    expect(
      screen.getByRole('button', { name: /mute ui audio synthesizer/i })
    ).toHaveAttribute('aria-pressed', 'true');

    // Construct Nodes
    expect(screen.getByRole('heading', { name: 'HairMixer' })).toBeInTheDocument();
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

  it('opens and closes the Interactive Project Case-Study Modal on INSPECT_NODE', async () => {
    sessionStorage.setItem(BOOT_STORAGE_KEY, 'true');
    render(<App />);

    const inspectHairMixerBtn = screen.getByRole('button', {
      name: /inspect node hairmixer/i,
    });
    fireEvent.click(inspectHairMixerBtn);

    const dialog = await screen.findByRole('dialog');
    expect(
      within(dialog).getByText(
        /HairMixer — AI-Powered Hairstyle Recommendation & Simulation System/i
      )
    ).toBeInTheDocument();
    expect(within(dialog).getByText(/SYSTEM_ARCHITECTURE_NOTES/i)).toBeInTheDocument();
    expect(within(dialog).getByText(/40% Latency Reduction/i)).toBeInTheDocument();
    expect(within(dialog).getByText(/github\.com\/matchewmau/i)).toBeInTheDocument();

    fireEvent.click(
      within(dialog).getByRole('button', { name: /close project inspection modal/i })
    );

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('validates CommsUplink (> ENTER_TRANSMISSION) form and copies contact endpoints', async () => {
    sessionStorage.setItem(BOOT_STORAGE_KEY, 'true');
    const user = userEvent.setup();
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: writeTextMock },
    });

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

    // Submit empty form -> expect validation errors
    fireEvent.click(screen.getByRole('button', { name: /transmit_message/i }));
    expect(await screen.findByText(/ERR_SENDER_ID/i)).toBeInTheDocument();
    expect(screen.getByText(/ERR_RETURN_CHANNEL/i)).toBeInTheDocument();
    expect(screen.getByText(/ERR_EMPTY_PAYLOAD/i)).toBeInTheDocument();

    // Fill valid transmission & submit
    await user.type(screen.getByLabelText(/SENDER_ID/i), 'Flynn Labs');
    await user.type(screen.getByLabelText(/RETURN_CHANNEL/i), 'flynn@encom.com');
    await user.type(
      screen.getByLabelText(/TRANSMISSION_PAYLOAD/i),
      'Interested in collaborating on computer vision and full-stack architecture.'
    );

    await user.click(screen.getByRole('button', { name: /transmit_message/i }));

    expect(
      await screen.findByText(/Transmission Payload Verified/i, {}, { timeout: 2000 })
    ).toBeInTheDocument();
  });
});
