# Roadmap

Tick items only when verified, and note how in `STATUS.md`. Items marked
(carried) arrived working in Tropic Video's code and are ticked only once
they have been checked on this service.

## Phase 0: playback spike (blocks everything else)

- [x] Shell loads the site signed out, with the layer on it
- [x] The sign-in page opens and its email field takes the on-screen keyboard
- [x] Andrew signs in by hand in the shell
- [x] A title plays (on castLabs Electron 42; 44 fails on audio)
- [x] Record the outcome in `DECISIONS.md`: this shell works on the 42 line

**Done when:** a title plays in the shell, or the fallback shell is chosen with evidence.

## Phase 1: navigable on the live site

- [x] Code, tests and end-to-end run pass on invented fixtures (carried)
- [ ] Privacy-choices pop-up from the remote (focus enters and stays in; a choice has not been made)
- [ ] Profile picker, including a profile PIN
- [x] Home: bar, banner, rows, sideways scrolling (row memory not looked at)
- [x] Title page: buttons, tabs, episode cards (season switching not tried)
- [x] Search with the on-screen keyboard
- [x] Outlines captured; first evidence-based adapter revision where the generic rules fail

**Done when:** home → title → play using only a remote, on the live site.

## Phase 2: player

- [x] Play and pause by key press
- [x] Seek by key press
- [x] The site's player controls revealed and walked; subtitles and audio lists (nothing chosen)
- [x] Next episode from the player's own button
- [ ] Skip intro and skip recap; the prompt at an episode's end
- [x] Back from the player
- [ ] Live or scheduled streams, if the account has any

**Done when:** an episode is watched and the next one started from the couch.

## Phase 3: HTPC and release

- [ ] Sign-in with only a remote (Andrew)
- [x] Packages built in CI; all three launched; the AppImage played
- [ ] First release, when Andrew asks for one
- [ ] Lawyer review of `LEGAL-GUARDRAILS.md` before promoting the project

## Upkeep

- [ ] Fixes to shared code offered back to Tropic Video, and its fixes brought here
