import { createSignal, JSX } from 'solid-js';

export const [getIsShowRootActions, setIsShowRootActions] = createSignal(true);

export const [getOverlayElement, setOverlayElement] =
  createSignal<JSX.Element | null>(null);
