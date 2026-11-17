# Status

Update this at the end of every working session. Newest first.

## 2026-11-17: project started (session 1, Andrew's Fedora VM)

Andrew asked for a version of Tropic Video for a second service, called
Steamboat, and for the repository and documents to be set up and work begun.

### Done

- The repository holds Tropic Video's code at v0.1.1, renamed, with the
  service-specific parts replaced (see `DECISIONS.md`): start address,
  one-domain allowlist, empty adapter, guard wording, notice, rule check.
- A new original icon.
- Documents written for this service: `CLAUDE.md`, the README, design,
  architecture, guardrails, roadmap, decisions, VM setup.
- Version is 0.0.1. Nothing is released.

### Verified, and how

| Claim | Evidence |
|---|---|
| Type-checks, unit tests pass, bundles build, rule check passes | `npm run check` on the VM |
| The real shell runs the layer on invented pages: navigation, pop-ups, player keys, on-screen keyboard, guard, notices | `npm run e2e` on the VM's Wayland desktop, all steps ok |
| The Widevine component installs in this app's own data folder | terminal log of a `--spike` run: version 4.10.3112.0 |
| The live site loads in the shell signed out, under `--automation` | DevTools: document on the service's host at `/en-ca`, `readyState` complete, about 4,400 elements, the layer's overlay present; viewport 962x541 |
| The user agent sent is the real Chromium on Linux with no app token | read from the page in that run |
| The site shows a privacy-choices pop-up first, and the remote works in it | screenshot looked at, then deleted; Down and Right moved focus between its links and three buttons and never left it. **No choice was made** (it is Andrew's) |
| Sign-in is on the same domain | `curl`: `/login` answers 302 to `/identity/login` on the same host |

### NOT verified

- **Protected playback. Nothing has been played.** Whether the service gives
  this shell a licence on Linux is unknown and is the first thing to find out.
- Sign-in in the shell, the profile picker, and everything signed in: home,
  title pages, search, the player, its keys, Back.
- Whether sign-in ever leaves the service's domain (the allowlist has only
  that one).
- The purchase guard's wording against the real site. It is guesswork.
- Packaging: no AppImage, tarball or Flatpak has been built from this
  repository. The workflows are Tropic Video's with the name changed and have
  not run here beyond CI.
- Everything Tropic Video lists as unverified about shared code (a physical
  game controller, X11 and gamescope sleep inhibition, a real 1080p TV).

### Next actions

1. **Andrew:** in the VM, run `npm run spike` in `~/Steamboat`, answer the
   privacy pop-up, sign in, pick a profile, start any title and let it run a
   minute, then quit with Ctrl+Q. Say whether picture and sound were right.
2. Agent: read `spike-report.json`; record the result in `DECISIONS.md`. If
   the service refuses, build the installed-Chromium fallback.
3. Agent, once signed in: walk home, a title page, search and the player with
   `--automation`; capture outlines; fix what the generic rules miss.
