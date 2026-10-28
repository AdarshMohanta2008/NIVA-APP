// Web Audio API ambient sacred sound synthesizer for realistic devotional listening

class SacredAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isPlaying = false;
  private currentPreset: string = 'tanpura-om';
  private activeOscillators: OscillatorNode[] = [];
  private ambientGain: GainNode | null = null;
  private ambientOscs: OscillatorNode[] = [];
  private bellInterval: number | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public play(preset: string) {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    this.stop();
    this.currentPreset = preset;
    this.isPlaying = true;

    const now = this.ctx.currentTime;

    // Presets with warm, resonant, meditative harmonic frequencies
    if (preset === 'tanpura-om') {
      // C# / Sa (138.59 Hz), Pa (207.65 Hz), higher Sa (277.18 Hz), Sub-bass Om (69.3 Hz)
      const freqs = [69.3, 138.59, 207.65, 277.18, 415.3];
      freqs.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = idx === 0 ? 'sine' : idx % 2 === 0 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(freq, now);

        // Slow breathing LFO modulation
        const lfo = this.ctx!.createOscillator();
        const lfoGain = this.ctx!.createGain();
        lfo.frequency.setValueAtTime(0.2 + idx * 0.05, now);
        lfoGain.gain.setValueAtTime(freq * 0.015, now);
        lfo.connect(osc.frequency);
        lfo.start();
        this.activeOscillators.push(lfo);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.12 / (idx + 1), now + 2);

        osc.connect(gain);
        gain.connect(this.masterGain!);
        osc.start();
        this.activeOscillators.push(osc);
      });
    } else if (preset === 'singing-bowl') {
      // Tibetan Singing Bowl 432 Hz + 528 Hz Love/Healing Solfeggio frequency + sub-octave
      const freqs = [108, 216, 432, 528, 864];
      freqs.forEach((freq, i) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.15 / (i + 1), now + 1.5);

        osc.connect(gain);
        gain.connect(this.masterGain!);
        osc.start();
        this.activeOscillators.push(osc);
      });
    } else if (preset === 'choir-chime') {
      // Cathedral Church Chord (D Major / Gregorian Modal: D3, A3, D4, F#4, A4)
      const freqs = [146.83, 220.0, 293.66, 369.99, 440.0];
      freqs.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.1 / (idx + 1), now + 2.5);

        osc.connect(gain);
        gain.connect(this.masterGain!);
        osc.start();
        this.activeOscillators.push(osc);
      });
    } else if (preset === 'sufi-drone') {
      // Sufi Ney Flute & Harmonium Drone (E2, B2, E3, G#3, B3)
      const freqs = [82.41, 123.47, 164.81, 207.65, 246.94];
      freqs.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = idx === 0 ? 'sine' : 'sawtooth';
        // Low-pass filter for warm analog harmonium feel
        const filter = this.ctx!.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450, now);

        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.06 / (idx + 1), now + 1.8);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain!);
        osc.start();
        this.activeOscillators.push(osc);
      });
    } else {
      // Flute-bells & Gurbani-raag default harmonic drone
      const freqs = [110, 164.81, 220, 329.63, 440];
      freqs.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.12 / (idx + 1), now + 1.5);

        osc.connect(gain);
        gain.connect(this.masterGain!);
        osc.start();
        this.activeOscillators.push(osc);
      });
    }
  }

  public ringTempleBell() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    // Temple bell harmonic strike: 780 Hz with rich overtone decay
    const strikeFreqs = [587.33, 784.0, 1174.66, 1760.0];
    strikeFreqs.forEach((freq, i) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.2 / (i + 1), now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.5 + i * 0.5);

      osc.connect(gain);
      gain.connect(this.masterGain!);
      osc.start();
      osc.stop(now + 4.5);
    });
  }

  public setVolume(val: number) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(Math.max(0, Math.min(1, val)), this.ctx.currentTime);
    }
  }

  public stop() {
    this.isPlaying = false;
    this.activeOscillators.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        // Ignore stopped errors
      }
    });
    this.activeOscillators = [];
  }
}

export const audioEngine = new SacredAudioEngine();
