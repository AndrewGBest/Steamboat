# Steamboat: design

17 November 2026. Steamboat is Tropic Video's design applied to a second
service. The full design study, with the prior art and the options that were
rejected, is Tropic Video's
[`docs/DESIGN.md`](https://github.com/AndrewGBest/Tropic-Video/blob/main/docs/DESIGN.md).
This document says what carries over, what is different here, and what is not
known yet. Later decisions are in `DECISIONS.md`; current state is in
`STATUS.md`.

Labels: **[Sourced]** means read in a source or seen on this machine.
**[Guess]** means reasoning with no source.

## 1. Summary

A thin Chromium shell (castLabs Electron) loads the service's normal website.
An original layer, running beside the page and unreachable from it, adds what
a remote needs: directional focus with a visible ring, an on-screen keyboard,
and play, pause and seek sent as ordinary key presses. The interface on screen
is the service's own, enlarged by page zoom for a TV.

Nothing of the service's is in the repo, DRM goes through the browser's
standard path untouched, and the app says honestly what it is.

## 2. What carries over from Tropic Video unchanged

- The shell: window, navigation and permission allowlists, sandboxed preload,
  sleep inhibit, the starting, blocked and cannot-connect notice pages.
- The layer: spatial navigation, row memory, pop-up handling, hover menus,
  focus ring, on-screen keyboard, toasts, About panel, player control by key
  presses, leaving the app pauses and mutes.
- TV scale: page zoom to a 960x540 canvas.
- The purchase guard for scripted runs, the diagnostics outline, the config
  file, the tests and the rule checker, packaging and workflows.
- The direction Andrew set there: the site's interface is the interface; the
  layer draws something of its own only where a remote cannot use the site's.

## 3. What is different for this service

| | Tropic Video | Steamboat |
|---|---|---|
| Start address | the other service's site | `https://www.disneyplus.com/` |
| Sign-in | on a separate family of account domains | on the service's own domain: `/login` redirects to `/identity/login` on the same host [Sourced: `curl`, 2026-11-17] |
| Allowlist | service plus 23 account domains | one domain |
| Adapter | revision 3, eight selectors | empty; nothing has been observed signed in |
| First screen signed out | a redirect the automation guard blocks | a sign-up offer page with a privacy-choices pop-up; it loads under `--automation` [Sourced: run on this machine, 2026-11-17] |
| Guard words | that service's upsell wording | plan, bundle and add-on wording added [Guess: the signed-in site's wording has not been seen] |

## 4. What is not known yet

- **Whether the service plays video in this shell on Linux.** This is Phase 0
  and decides everything. The service refused Linux outright at its 2019
  launch over the DRM security level, then relaxed it [Sourced: press, 2019].
  The castLabs build on Linux reports an unverified platform to the DRM
  system [Sourced: castLabs release notes, via Tropic Video's study]. If the
  service wants a verified platform, it will refuse, and the fallback is the
  one planned for Tropic Video: drive the user's installed Chromium or Chrome
  and inject the same layer over the DevTools protocol.
- **Picture quality.** Third-party reports say browsers get 720p
  [Sourced: secondary, unconfirmed]. Whatever a Linux browser is given is the
  ceiling; nothing will be done to raise it (Hard rule 2).
- **How the site behaves under a D-pad:** whether the generic rules find its
  cards and rows, whether its player has keyboard controls for pause and seek
  (the layer depends on them, since it never touches the video itself), how
  the profile picker and its PIN entry behave, and whether the site has
  keyboard handling of its own that fights the layer's.
- **The advertising tier.** Not seen. Nothing skips or blocks it either way.

## 5. Controls

As Tropic Video: see the README.

## 6. Build plan

`ROADMAP.md`. In short: prove playback, then walk every page type with the
remote and fix what the generic rules miss, with adapter selectors only where
an outline from the live site shows them.
