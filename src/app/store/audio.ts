import { createSignal } from 'solid-js';
import { Player, Recorder, UserMedia } from 'tone';

export const mic = createSignal<UserMedia | null>(null);

export const micRecorder = createSignal<Recorder>(new Recorder());
export const explotionRecorder = createSignal<Recorder>(new Recorder());

export const explotionPlayer = createSignal<Player | null>(null);

export const micBlob = createSignal<string | null>(null);

export const explotionBlob = createSignal<string | null>(null);
