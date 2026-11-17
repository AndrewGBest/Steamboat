# Roadmap

Tick items only when verified, and note how in `STATUS.md`. Items marked
(carried) arrived working in Tropic Video's code and are ticked only once
they have been checked on this service.

## Phase 0: playback spike (blocks everything else)

- [x] Shell loads the site signed out, with the layer on it
- [x] The sign-in page opens and its email field takes the on-screen keyboard
- [ ] Andrew signs in by hand in the shell
- [ ] A title plays: read `spike-report.json`
- [ ] Record the outcome in `DECISIONS.md`: this shell works, or switch to driving installed Chromium

**Done when:** a title plays in the shell, or the fallback shell is chosen with evidence.

## Phase 1: navigable on the live site

- [x] Code, tests and end-to-end run pass on invented fixtures (carried)
- [ ] Privacy-choices pop-up from the remote (focus enters and stays in; a choice has not been made)
- [ ] Profile picker, including a profile PIN
- [ ] Home: bar, banner, rows, sideways scrolling, row memory
- [ ] Title page: buttons, seasons, episodes, extras
- [ ] Search with the on-screen keyboard
- [ ] Outlines captured; first evidence-based adapter revision where the generic rules fail

**Done when:** home → title → play using only a remote, on the live site.

## Phase 2: player

- [ ] Play, pause and seek by key press
- [ ] The site's player controls revealed and walked; audio and subtitles
- [ ] Skip intro, skip recap and next-episode prompts
- [ ] Back from the player
- [ ] Live or scheduled streams, if the account has any

**Done when:** an episode is watched and the next one started from the couch.

## Phase 3: HTPC and release

- [ ] Sign-in with only a remote (Andrew)
- [ ] Packages built in CI, launched once
- [ ] First release, when Andrew asks for one
- [ ] Lawyer review of `LEGAL-GUARDRAILS.md` before promoting the project

## Upkeep

- [ ] Fixes to shared code offered back to Tropic Video, and its fixes brought here
