import {Easing, interpolate, spring} from 'remotion';
import {FPS} from './tiempo';

/** 0 → 1 con resorte suave, empezando `f` frames después de `desde`. */
export const entrada = (f: number, retraso = 0) =>
  spring({frame: f - retraso, fps: FPS, config: {damping: 200}, durationInFrames: 18});

/** Fundido lineal 0 → 1 en `dur` frames. */
export const fundido = (f: number, retraso = 0, dur = 12) =>
  interpolate(f - retraso, [0, dur], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
