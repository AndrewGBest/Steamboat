// The About and help panel's words. The notice is the wording
// LEGAL-GUARDRAILS.md requires in every release; keep the two in step.
export const NOTICE =
  'Steamboat is an unofficial, independent project. It is not affiliated with, endorsed by or supported by Disney. ' +
  'Disney+ and Disney are trademarks of Disney Enterprises, Inc. or its affiliates. A valid subscription is required. ' +
  'Steamboat does not provide, unlock or bypass access to any content and does not remove or work around DRM.';

export const HELP: readonly (readonly [string, string])[] = [
  ['Arrows or D-pad', 'Move'],
  ['Enter or A', 'Select; play or pause in the player'],
  ['Backspace, Escape, Back or B', 'Back'],
  ['Up or Down in the player', "Show the player's controls"],
  ['Space or X', 'Play or pause'],
  ['Left, Right, LB or RB in the player', 'Skip back or forward'],
  ['/ or Y', 'Search'],
  ['Ctrl+O, Menu, Info or right stick click', 'This panel'],
  ['Ctrl+Q', 'Quit'],
];

export function aboutTitle(version: string | undefined): string {
  return version ? `Steamboat ${version}` : 'Steamboat';
}
