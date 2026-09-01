import { useRef, useCallback } from 'react';

/**
 * Lightweight Web Audio API tone player for card flips / round start / game end.
 * No external sound files needed (per spec: "optional, can use Web Audio API").
 */
export function useAudio() {
  const ctxRef = useRef(null);

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    return ctxRef.current;
  }, []);

  const playTone = useCallback((freq, duration = 0.15) => {
    try {
      const ctx = getCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.value = freq;
      osc.type = 'sine';
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch { /* audio not available, ignore */ }
  }, [getCtx]);

  return {
    playCardFlip: () => playTone(440, 0.12),
    playRoundStart: () => playTone(660, 0.2),
    playGameEnd: () => playTone(880, 0.4)
  };
}
